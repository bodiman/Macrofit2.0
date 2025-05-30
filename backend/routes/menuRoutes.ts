import express, { Request, Response, Router } from 'express';
import prisma from '../prisma_client';
import { Food } from '@shared/types/foodTypes';
import { toFoods } from '../dataTransferObjects';
import { v4 as uuidv4 } from 'uuid';

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
                    connect: foods.map(food => ({ id: food.id }))
                }
            },
            include: {
                foods: {
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

        res.status(201).json(kitchen);
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
        res.json(menus);
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

        const dbFoods = await prisma.food.findMany({
            where: {
                kitchens: {
                    some: {
                        id: menuId
                    }
                },
                ...(search ? {
                    name: {
                        contains: search as string,
                        mode: 'insensitive'
                    }
                } : {})
            },
            include: {
                macros: {
                    include: {
                        metric: true
                    }
                },
                servingUnits: true
            }
        });

        const foods: Food[] = toFoods(dbFoods);
        res.json(foods);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ error: 'Failed to fetch foods' });
    }
});

export default router; 