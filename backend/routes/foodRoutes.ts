import { Router, Request, Response } from 'express';
import prisma from '../prisma_client';
import { getNutritionixBrandedData, getNutritionixData, getNutritionixNames } from '../utils/Nutritionix/nutritionix';
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
                kitchens: {
                    include: {
                        kitchen: true
                    }
                },
                servingUnits: true,
                macros: {
                    include: {
                        metric: true
                    }
                }
            }
        });

        const transformedFoods: Food[] = toFoods(foods);

        // Add common foods to database if they don't exist
        if (query.length >= 3 && !writing) {
            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(async () => {
                writing = true;

                const {commonNames, brandedItems} = await getNutritionixNames(query);
                const brandedNames: string[] = brandedItems.map((item: any) => item.food_name);

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

                // retrieve all foods from database that match any of the common names or branded items
                let foods = await prisma.food.findMany({
                    where: {
                        OR: [...brandedNames, ...commonNames].map((name: string) => ({
                            name: {
                                contains: name,
                                mode: 'insensitive'
                            }
                        }))
                    },
                    include: {
                        kitchens: {
                            include: {
                                kitchen: true
                            }
                        },
                        servingUnits: true,
                        macros: {
                            include: {
                                metric: true
                            }
                        }
                    }
                });
                
                // filter out names that are already in the database under the common_foods kitchen
                const filteredCommonNames = commonNames.filter((name: string) => !foods.some((food) => (
                    food.name === name && 
                    food.kitchens.some(kf => kf.kitchen.id === commonFoodsKitchen.id)
                )))
                .slice(0, 1);

                const filteredBrandedItems = brandedItems.filter((item: any) => !foods.some((food) => (
                    food.name === item.food_name && 
                    food.brand === item.brand
                )))
                .slice(0, 1);

                console.log("Foods to Add:", filteredCommonNames, filteredBrandedItems);
                const nutritionixCommonData = await getNutritionixData(filteredCommonNames);
                const nutritionixBrandedData = await getNutritionixBrandedData(filteredBrandedItems);

                // console.log("nutritionixCommonData", nutritionixCommonData);
                // console.log("nutritionixBrandedData", nutritionixBrandedData);

                if (nutritionixBrandedData.length > 0) {
                    const food = nutritionixBrandedData[0];
                    if (food) {
                        let servingUnits = [{
                            id: uuidv4(),
                            name: food.serving_unit,
                            grams: food.serving_size
                        }];

                        if (food.serving_weight_grams) {
                            servingUnits.push({
                                id: uuidv4(),
                                name: 'grams',
                                grams: food.serving_weight_grams
                            });
                        }

                        console.log("Writing Food", food.name, "to database");
                        
                        await prisma.food.create({
                            data: {
                                id: uuidv4(),
                                name: food.name,
                                description: `${food.name} from ${food.brand}`,
                                brand: food.brand,
                                kitchens: {

                                },
                                macros: {
                                    create: food.macros.map((macro: any) => ({
                                        value: macro.value / food.serving_qty,
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
                        
                    }
                }

                if (nutritionixCommonData.length > 0) {
                    const food = nutritionixCommonData[0];
                    // console.log("commonfood", food);
                    if (food) {
                        try {
                            // write data to database  
                            let servingUnits = food.serving_units.map((unit: any) => ({
                                id: uuidv4(),
                                name: unit.name,
                                grams: unit.grams
                            }));

                            // only keep one of each unique serving unit name
                            servingUnits = servingUnits.reduce((acc: any, unit: any) => {
                                if (!acc.some((u: any) => u.name === unit.name)) {
                                    acc.push(unit);
                                }
                                return acc;
                            }, []);
                            
                            console.log(`Writing Food ${food.name} to database`);            
                            await prisma.food.create({
                                data: {
                                    id: uuidv4(),
                                    name: food.name,
                                    description: `${food.name} from Common Foods`,
                                    brand: "common-foods",
                                    kitchens: {
                                        create: {
                                            id: uuidv4(),
                                            kitchen_id: commonFoodsKitchen.id,
                                            active: false
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