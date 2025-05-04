import prisma from '../../../prisma_client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';


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

async function main() {
    try {
        // Read the CSV file
        const csvFilePath = path.join(__dirname, 'today_menu.csv');
        let fileContent = fs.readFileSync(csvFilePath, 'utf-8');

        const records = parse(fileContent, {
            columns: true,      // Use first row as headers
            skip_empty_lines: true,
            cast: (value, context) => {
                // Automatically cast numeric fields if the column name matches a known numeric field
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

        console.log(metricMap);

        // Process each food record
        for (const record of records) {
            const foodId = `${record.kitchen}-${record.meal}-${record.name}`
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');

            // Create or update the food entry
            await prisma.food.upsert({
                where: { id: foodId },
                update: {},
                create: {
                    id: foodId,
                    name: record.name,
                    description: `${record.name} from ${record.kitchen} (${record.meal})`,
                    macros: {
                        create: Object.entries(METRIC_NAME_MAP).map(([csvKey, metricName]) => {
                            const metric = metricMap.get(metricName);
                            if (!metric) {
                                throw new Error(`Metric ${metricName} not found`);
                            }
                            return {
                                metric_id: metric.id,
                                value: record[csvKey as keyof FoodRecord] as number
                            };
                        })
                    }
                }
            });

            console.log(`Processed: ${record.name}`);
        }

        console.log('🌱 Today\'s menu seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding today\'s menu:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();