import prisma from '../../../../prisma_client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { v4 as uuidv4 } from 'uuid';

interface FoodRecord {
    name: string;
    kitchen: string;
    meal: string;
    calories: number;
    total_fat: number;
    saturated_fat: number;
    trans_fat: number;
    cholesterol: number;
    sodium: number;
    carbohydrates: number;
    fiber: number;
    sugar: number;
    protein: number;
    vitamin_a: number;
    vitamin_c: number;
    calcium: number;
    iron: number;
    water: number;
    potassium: number;
    vitamin_d: number;
    serving_size: number;
    serving_unit: string;
}

const METRIC_NAME_MAP: Record<string, string> = {
    'calories': 'calories',
    'total_fat': 'fat',
    'saturated_fat': 'saturated_fat',
    'trans_fat': 'trans_fat',
    'cholesterol': 'cholesterol',
    'sodium': 'sodium',
    'carbohydrates': 'carbohydrates',
    'fiber': 'fiber',
    'sugar': 'sugar',
    'protein': 'protein',
    'vitamin_a': 'vitamin_a',
    'vitamin_c': 'vitamin_c',
    'calcium': 'calcium',
    'iron': 'iron',
    'water': 'water',
    'potassium': 'potassium',
    'vitamin_d': 'vitamin_d'
};

// for weekdays
// if it is before 10am, it is breakfast
// if it is between 10am and 4:30pm, it is lunch
// if it is after 4:30pm and 9:30pm, it is dinner
// if it is after 9:30pm, it is breakfast tomorrow
// for weekends
// if it is before 3:30pm, it is brunch
// if it is between 10am and 4:30pm, it is lunch
// if it is after 4:30pm and 9:30pm, it is dinner
// if it is after 9:30pm, it is brunch tomorrow

async function main() {
    const now = new Date();
    let meal;

    if (now.getDay() === 0 || now.getDay() === 6) {
        if (now.getHours() < 15.5) {
            meal = 'Brunch';
        } else {
            meal = 'Dinner';
        }
    } else {
        if (now.getHours() >= 10 && now.getHours() < 16.5) {
            meal = 'Lunch';
        } else if (now.getHours() >= 16.5 && now.getHours() < 21.5) {
            meal = 'Dinner';
        } else {
            // meal = 'Breakfast';
            meal = 'Lunch'; // I don't eat breakfast. 
            
            // The fact that I'm doing this probably indicates I should
            // track all published menus, and allow users to select which one they want to use.
            // Concievably, I could have menus be a table separate from kitchens, and each menu
            // would have an associated kitchen and date / time range. Then, users could select
            // both a kitchen and a menu for their meal plan.
        }
    }

    try {
        // Read the CSV file
        const csvFilePath = path.join(__dirname, 'scraped_menu.csv');
        let fileContent = fs.readFileSync(csvFilePath, 'utf-8');

        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            cast: (value, context) => {
                const numericFields: (keyof FoodRecord)[] = [
                    'calories', 'total_fat', 'saturated_fat', 'trans_fat',
                    'cholesterol', 'sodium', 'carbohydrates', 'fiber', 'sugar',
                    'protein', 'vitamin_a', 'vitamin_c', 'calcium', 'iron',
                    'water', 'potassium', 'vitamin_d', 'serving_size'
                ];
            
                if (context.column && numericFields.includes(context.column as keyof FoodRecord)) {
                    const parsed = parseFloat(value) / 28.35; // Convert ounces to grams
                    return isNaN(parsed) ? 0 : parsed;
                }
                return value;
            }
        }) as FoodRecord[];

        // Get all nutritional metrics
        const metrics = await prisma.nutritionalMetric.findMany();
        const metricMap = new Map(metrics.map(m => [m.id, m]));

        // Create a map of kitchen names to their IDs
        const kitchenMap = new Map<string, string>();
        
        // Get unique kitchen names from records
        const uniqueKitchens = [...new Set(records.map(r => r.kitchen))];
        
        // Create or get existing kitchens
        for (const kitchenName of uniqueKitchens) {
            const kitchenId = uuidv4();
            const kitchen = await prisma.kitchen.upsert({
                where: { name: kitchenName },
                update: {},
                create: {
                    id: kitchenId,
                    name: kitchenName,
                    description: `Dining hall at ${kitchenName}`
                }
            });
            kitchenMap.set(kitchenName, kitchen.id);
        }

        // Process each food record
        for (const record of records) {
            const foodId = `${record.kitchen}-${record.name}`
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');

            const kitchenId = kitchenMap.get(record.kitchen);
            if (!kitchenId) {
                throw new Error(`Kitchen ID not found for ${record.kitchen}`);
            }

            try {
                // Create or update the food entry
                await prisma.food.upsert({
                    where: { id: foodId },
                    update: {
                        active: true,
                        updated: new Date()
                    },
                    create: {
                        id: foodId,
                        name: record.name,
                        kitchen_id: kitchenId,
                        active: record.meal === meal,
                        description: `${record.name} from ${record.kitchen} (${record.meal})`,
                        macros: {
                            create: Object.entries(METRIC_NAME_MAP).map(([csvKey, metricName]) => {
                                const metric = metricMap.get(metricName);
                                if (!metric) {
                                    throw new Error(`Metric ${metricName} not found`);
                                }
                                return {
                                    metric_id: metric.id,
                                    value: (record[csvKey as keyof FoodRecord] as number)
                                };
                            })
                        }
                    }
                });

                console.log(`Processed: ${record.name} from ${record.kitchen}`);
            } catch (error: any) {
                if (error?.code === 'P2002') { // Prisma unique constraint violation
                    console.log(`Skipping duplicate food: ${record.name} from ${record.kitchen}`);
                    continue;
                }
                throw error; // Re-throw other errors
            }
        }

        // Set foods as inactive if they haven't been updated in the last 14 hours
        const fourteenHoursAgo = new Date(now.getTime() - (14 * 60 * 60 * 1000));
        await prisma.food.updateMany({
            where: {
                updated: {
                    // more than 14 hours ago
                    lt: fourteenHoursAgo
                },
                active: true
            },
            data: {
                active: false
            }
        });

        console.log('🌱 Today\'s menu seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding today\'s menu:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();