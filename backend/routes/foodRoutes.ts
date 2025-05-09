import { Router, Request, Response } from 'express';
import prisma from '../prisma_client';
import { getNutritionixData, getNutritionixCommonNames } from '../utils/Nutritionix/nutritionix';
import { v4 as uuidv4 } from 'uuid';

interface Food {
    id: string;
    name: string;
    macros: Record<string, number>;
}

interface FoodWithMacros {
    id: string;
    name: string;
    macros: Array<{
        metric: {
            id: string;
        };
        value: number;
    }>;
}

const router = Router();

router.get('/search', async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        
        if (!query || typeof query !== 'string') {
            res.status(400).json({ error: 'Query parameter is required' });
            return;
        }

        const foods = await prisma.food.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
            include: {
                macros: {
                    include: {
                        metric: true
                    }
                }
            }
        });

        // Transform the database results to match the Food type using the toMacros function
        const transformedFoods: Food[] = foods.map((food: FoodWithMacros) => ({
            id: food.id,
            name: food.name,
            macros: Object.fromEntries(
                food.macros.map(macro => [
                    macro.metric.id,
                    macro.value
                ])
            )
        }));

        res.json(transformedFoods);
    } catch (error) {
        console.error('Error searching foods:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

let timeout: NodeJS.Timeout | null = null;
router.get('/search-all', async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        
        if (!query || typeof query !== 'string') {
            res.status(400).json({ error: 'Query parameter is required' });
            return;
        }

        let foods = await prisma.food.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                },
            },
            include: {
                macros: {
                    include: {
                        metric: true
                    }
                }
            }
        });

        const transformedFoods: Food[] = foods.map((food: FoodWithMacros) => ({
            id: food.id,
            name: food.name,
            description: `${food.name} from Common Foods`,
            kitchen_id: "common_foods",
            active: false,
            updated_at: new Date(),
            macros: Object.fromEntries(
                food.macros.map(macro => [
                    macro.metric.id,
                    macro.value
                ])
            )
        }));

        // add on to the search, no caching for now
        if (query.length >= 3) {
            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(async () => {
                const names = await getNutritionixCommonNames(query);
                // get common foods kitchen id, create if it doesn't exist
                let commonFoodsKitchen = await prisma.kitchen.findFirst({
                    where: {
                        name: "Common Foods"
                    }
                });
                if (!commonFoodsKitchen) {
                    commonFoodsKitchen = await prisma.kitchen.create({
                        data: {
                            id: uuidv4(),
                            name: "Common Foods"
                        }
                    });
                }

                
                // filter out names that are already in the database under the common_foods kitchen
                const newNames = names.filter((name: string) => !foods.some((food) => (food.name === name && food.kitchen_id === commonFoodsKitchen.id)))
                    .slice(0, 1);
                const nutritionixData = await getNutritionixData(newNames);

                // console.log(nutritionixData[0].macros);

            //    console.log(nutritionixData[0].macros);
               const food = nutritionixData[0];

                // write data to database
                // assert that every metric_id exists in the database
                // const metricIds = food.macros.map((macro: any) => macro.metric.id);
                const metrics = await prisma.nutritionalMetric.findMany({

                });
                const metricIds = metrics.map((metric) => metric.id);
                const existingMetricIds = food.macros.map((macro: any) => macro.metric_id);

                for (const metricId of existingMetricIds) {
                    if (!metricIds.includes(metricId)) {
                        console.log(`Metric ${metricId} does not exist in the database`);
                    }
                }

                // console.log(food.macros.map((macro: any) => ({
                //     value: macro.value,
                //     metric: macro.metric_id
                // })));

                // console.log("creating food", food.name);
                // const allMacros = food.macros.map((food: any) => food.metric_id);
                // //print duplicates
                // const duplicates = allMacros.filter((macro: string, index: number) => allMacros.indexOf(macro) !== index);
                // console.log(duplicates);
                
                await prisma.food.create({
                    data: {
                        id: food.id,
                        name: food.name,
                        description: `${food.name} from Common Foods`,
                        active: false,
                        kitchen_id: commonFoodsKitchen.id,
                        serving_size: food.serving_size,
                        macros: {
                            create: food.macros.map((macro: any) => ({
                                value: macro.value,
                                metric: {
                                    connect: { id: macro.metric_id }
                                }
                            }))
                        }
                    }
                });
                
            }, 1000);
        }

        res.json(transformedFoods);
    } catch (error) {
        console.error('Error searching all foods:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; 