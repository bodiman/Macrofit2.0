import express, { Request, Response, Router } from 'express';
import prisma from '../prisma_client';
import { Food } from '@shared/types/foodTypes';
import { toFoods } from '../dataTransferObjects';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';

const router: Router = express.Router();

interface CreateKitchenRequest {
    name: string;
    description?: string;
    foods: Food[];
}

// Create a new kitchen with foods
router.post('/', async (req: Request<{}, {}, CreateKitchenRequest>, res: Response) => {
    try {
        const { name, description, foods } = req.body;

        if (!name) {
            res.status(400).json({ error: 'Kitchen name is required' });
            return;
        }

        if (!foods || !Array.isArray(foods) || foods.length === 0) {
            res.status(400).json({ error: 'At least one food is required' });
            return;
        }

        // Create the kitchen and connect existing foods
        const kitchen = await prisma.kitchen.create({
            data: {
                id: uuidv4(),
                name,
                description: description || '',
                foods: {
                    create: foods.map(food => ({
                        id: uuidv4(),
                        food_id: food.id,
                        active: false
                    }))
                }
            },
            include: {
                foods: {
                    include: {
                        food: {
                            include: {
                                macros: {
                                    include: {
                                        metric: true
                                    }
                                },
                                servingUnits: true
                            }
                        }
                    }
                }
            }
        });

        // Transform the foods using toFoods
        const transformedKitchen = {
            ...kitchen,
            foods: toFoods(kitchen.foods.map(kf => kf.food))
        };

        res.status(201).json(transformedKitchen);
    } catch (error) {
        console.error('Error creating kitchen:', error);
        res.status(500).json({ error: 'Failed to create kitchen' });
    }
});

// Get all menus (kitchens)
router.get('/', async (req, res) => {
    try {
        const menus = await prisma.kitchen.findMany({
            include: {
                foods: {
                    include: {
                        food: {
                            include: {
                                macros: {
                                    include: {
                                        metric: true
                                    }
                                },
                                servingUnits: true
                            }
                        }
                    }
                }
            }
        });

        // Transform each kitchen's foods using toFoods
        const transformedMenus = menus.map(menu => ({
            ...menu,
            foods: toFoods(menu.foods.map(kf => kf.food))
        }));

        res.json(transformedMenus);
    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ error: 'Failed to fetch menus' });
    }
});

// Get foods from a specific menu with optional search
router.get('/:menuId/foods', async (req, res) => {
    try {
        const { menuId } = req.params;
        const { search } = req.query;

        const kitchenFoods = await prisma.kitchenFood.findMany({
            where: {
                kitchen_id: menuId,
                ...(search ? {
                    food: {
                        name: {
                            contains: search as string,
                            mode: 'insensitive'
                        }
                    }
                } : {})
            },
            include: {
                food: {
                    include: {
                        macros: {
                            include: {
                                metric: true
                            }
                        },
                        servingUnits: true
                    }
                }
            }
        });

        // Transform the foods using toFoods and include active state
        const foods = kitchenFoods.map(kitchenFood => ({
            ...toFoods([kitchenFood.food])[0],
            active: kitchenFood.active
        }));

        res.json(foods);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ error: 'Failed to fetch foods' });
    }
});

// Toggle food active state in a kitchen
router.put('/:menuId/foods/:foodId/active', async (req, res) => {
    try {
        const { menuId, foodId } = req.params;
        const { active } = req.body;

        if (typeof active !== 'boolean') {
            res.status(400).json({ error: 'Active state must be a boolean' });
            return;
        }

        const kitchenFood = await prisma.kitchenFood.update({
            where: {
                kitchen_id_food_id: {
                    kitchen_id: menuId,
                    food_id: foodId
                }
            },
            data: {
                active
            },
            include: {
                food: {
                    include: {
                        macros: {
                            include: {
                                metric: true
                            }
                        },
                        servingUnits: true
                    }
                }
            }
        });

        // Transform the food using toFoods and include active state
        const transformedFood = {
            ...toFoods([kitchenFood.food])[0],
            active: kitchenFood.active
        };

        res.json(transformedFood);
    } catch (error) {
        console.error('Error updating food active state:', error);
        res.status(500).json({ error: 'Failed to update food active state' });
    }
});

export default router; 