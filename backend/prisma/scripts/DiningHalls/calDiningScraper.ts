import axios from 'axios';
import * as cheerio from 'cheerio';
import prisma from '../../../prisma_client';

interface DiningConfig {
    [diningHall: string]: {
        [meal: string]: {
            [food: string]: {
                action: string;
                menu_id: string;
                id: string;
                location: string;
            };
        };
    };
}

interface NutrientInfo {
    serving_size: string;
    [key: string]: string | number;
}

const CALDINING_MACRONUTRIENT_NAME_MAP: Record<string, string> = {
    'Calories (kcal):': 'calories',
    'Total Lipid/Fat (g):': 'fat',
    'Saturated fatty acid (g):': 'saturated_fat',
    'Trans Fat (g):': 'trans_fat',
    'Cholesterol (mg):': 'cholesterol',
    'Sodium (mg):': 'sodium',
    'Carbohydrate (g):': 'carbohydrates',
    'Total Dietary Fiber (g):': 'fiber',
    'Sugar (g):': 'sugar',
    'Protein (g):': 'protein',
    'Vitamin A (iu):': 'vitamin_a',
    'Vitamin C (mg):': 'vitamin_c',
    'Calcium (mg):': 'calcium',
    'Iron (mg):': 'iron',
    'Water (g):': 'water',
    'Potassium (mg):': 'potassium',
    'Vitamin D(iu):': 'vitamin_d'
};

async function retrieveDiningConfigs(): Promise<DiningConfig> {
    const configs: DiningConfig = {};
    
    const response = await axios.get('https://dining.berkeley.edu/menus/');
    const $ = cheerio.load(response.data);
    
    $('ul.cafe-location').each((_, location) => {
        const diningHallName = $(location).find('span.cafe-title').text().trim();
        console.log(diningHallName);
        configs[diningHallName] = {};
        
        $(location).find('ul.meal-period li').each((_, meal) => {
            const mealName = $(meal).attr('class')?.split(' ').pop() || '';
            configs[diningHallName][mealName] = {};
            
            $(meal).find('li').each((_, recipe) => {
                const recipeName = $(recipe).find('a').text().trim();
                configs[diningHallName][mealName][recipeName] = {
                    action: 'get_recipe_details',
                    menu_id: $(recipe).attr('data-menuid') || '',
                    id: $(recipe).attr('data-id') || '',
                    location: $(recipe).attr('data-location') || ''
                };
            });
        });
    });
    
    return configs;
}

async function retrieveNutrientInfo(payload: any): Promise<NutrientInfo> {
    const response = await axios.post('https://dining.berkeley.edu/wp-admin/admin-ajax.php', payload);
    const $ = cheerio.load(response.data);
    
    const servingSize = $('span.serving-size').text().replace('Serving Size: ', '');
    const nutrientInfo: NutrientInfo = { serving_size: servingSize };
    
    $('li').each((_, element) => {
        const nutrientName = $(element).find('span').first().text();
        const nutrientValue = $(element).find('span').last().text();
        
        if (nutrientName in CALDINING_MACRONUTRIENT_NAME_MAP) {
            const mappedName = CALDINING_MACRONUTRIENT_NAME_MAP[nutrientName];
            nutrientInfo[mappedName] = parseFloat(nutrientValue) || 0;
        }
    });
    
    return nutrientInfo;
}

function splitServingSize(servingSize: string): { amount: number; unit: string } {
    const [amount, unit] = servingSize.split(' ');
    return { amount: parseFloat(amount), unit };
}

async function standardizeNutrientInfo(nutrientInfo: NutrientInfo): Promise<Record<string, number>> {
    const { amount } = splitServingSize(nutrientInfo.serving_size);
    const standardized: Record<string, number> = {};
    
    for (const [key, value] of Object.entries(nutrientInfo)) {
        if (key !== 'serving_size' && typeof value === 'number') {
            standardized[key] = value / amount;
        }
    }
    
    return standardized;
}

async function seedDiningHallFoods() {
    try {
        const configs = await retrieveDiningConfigs();
        const metricMap = new Map(
            (await prisma.nutritionalMetric.findMany()).map(m => [m.name, m])
        );

        for (const [diningHall, meals] of Object.entries(configs)) {
            console.log(diningHall);
            for (const [meal, foods] of Object.entries(meals)) {
                for (const [foodName, payload] of Object.entries(foods)) {
                    console.log(`Processing ${diningHall} - ${meal} - ${foodName}`);
                    
                    console.log(payload);
                    const nutrientInfo = await retrieveNutrientInfo(payload);
                    const standardizedMacros = await standardizeNutrientInfo(nutrientInfo);
                    
                    // Create or update food in database
                    await prisma.food.upsert({
                        where: { 
                            id: `${diningHall}-${meal}-${foodName}`.toLowerCase().replace(/\s+/g, '-')
                        },
                        update: {},
                        create: {
                            id: `${diningHall}-${meal}-${foodName}`.toLowerCase().replace(/\s+/g, '-'),
                            name: foodName,
                            description: `${foodName} from ${diningHall} (${meal})`,
                            macros: {
                                create: Object.entries(standardizedMacros).map(([metricName, value]) => {
                                    const metric = metricMap.get(metricName);
                                    if (!metric) {
                                        throw new Error(`Metric ${metricName} not found`);
                                    }
                                    return {
                                        metric_id: metric.id,
                                        value
                                    };
                                })
                            }
                        }
                    });
                }
            }
        }
        
        console.log('🌱 Dining hall foods seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding dining hall foods:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

seedDiningHallFoods(); 