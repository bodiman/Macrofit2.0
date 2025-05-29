import { Router, Request, Response } from 'express';
import prisma from '../prisma_client';
import { getNutritionixData, getNutritionixCommonNames } from '../utils/Nutritionix/nutritionix';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { toFoods } from '../dataTransferObjects';

interface Food {
    id: string;
    name: string;
    macros: Record<string, number>;
}

interface FoodWithMacros {
    id: string;
    name: string;
    description: string;
    kitchen_id: string;
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

        // Transform the database results into flat object type
        const transformedFoods = foods.map((food) => {
            return {
                id: food.id,
                name: food.name,
                macros: food.macros,
            }
        });


        res.json(transformedFoods);
    } catch (error) {
        console.error('Error searching foods:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



let timeout: NodeJS.Timeout | null = null;
let writing = false;

router.get('/search-all', async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        
        if (!query || typeof query !== 'string') {
            res.status(400).json({ error: 'Query parameter is required' });
            return;
        }

        // retrieve all foods from database
        let foods = await prisma.food.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                },
            },
            include: {
                kitchens: true,
                servingUnits: true,
                macros: {
                    include: {
                        metric: true
                    }
                }
            }
        });

        const transformedFoods: Food[] = toFoods(foods);

        // // convert foods from database into Food type
        // const transformedFoods: Food[] = foods.map((food) => ({
        //     id: food.id,
        //     name: food.name,
        //     description: food.description,
        //     kitchen_id: food.kitchen_id,
        //     active: false,
        //     updated_at: new Date(),
        //     macros: Object.fromEntries(
        //         food.macros.map(macro => [
        //             macro.metric.id,
        //             macro.value
        //         ])
        //     )
        // }));

        // Add common foods to database if they don't exist
        if (query.length >= 3 && !writing) {
            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(async () => {
                writing = true;

                const names = await getNutritionixCommonNames(query);
                console.log("names", names);

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

                // retrieve all foods from database
                let foods = await prisma.food.findMany({
                    where: {
                        name: {
                            contains: query,
                            mode: 'insensitive'
                        },
                    },
                    include: {
                        kitchens: true,
                        servingUnits: true,
                        macros: {
                            include: {
                                metric: true
                            }
                        }
                    }
                });
                
                // filter out names that are already in the database under the common_foods kitchen
                const newNames = names.filter((name: string) => !foods.some((food) => (
                    food.name === name && 
                    food.kitchens.some(kitchen => kitchen.id === commonFoodsKitchen.id)
                )))
                    .slice(0, 1);

                console.log("Foods to Add:", newNames);
                const nutritionixData = await getNutritionixData(newNames);

                if (nutritionixData.length > 0) {
                    const food = nutritionixData[0];
                    if (food) {

                        try {
                            // write data to database  
                            let servingUnits = food.serving_units.map((unit: any) => ({
                                id: uuidv4(),
                                name: unit.name,
                                grams: unit.grams
                            }))

                            // only keep one of each unique serving unit name
                            servingUnits = servingUnits.reduce((acc: any, unit: any) => {
                                if (!acc.some((u: any) => u.name === unit.name)) {
                                    acc.push(unit);
                                }
                                return acc;
                            }, []);
                            
                            console.log("servingUnits", servingUnits);
                            console.log(`Writing Food ${food.name} to database`);            
                            await prisma.food.create({
                                data: {
                                    id: uuidv4(),
                                    name: food.name,
                                    description: `${food.name} from Common Foods`,
                                    active: false,
                                    kitchens: {
                                        connect: {
                                            id: commonFoodsKitchen.id
                                        }
                                    },
                                    macros: {
                                        create: food.macros.map((macro: any) => ({
                                            value: macro.value,
                                            metric: {
                                                connect: { id: macro.metric_id }
                                            }
                                        }))
                                    },
                                    servingUnits: {
                                        create: servingUnits
                                    }
                                }
                            });
                        } catch (error) {
                            console.error('Error writing food to database:', error);
                        }
                    }
                }

                console.log("writing set to false");
                writing = false;

            }, 1000);
        }

        res.json(transformedFoods);
    } catch (error: any) {
        console.error('Error writing food to database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; 