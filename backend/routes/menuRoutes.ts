import express from 'express';
import prisma from '../prisma_client';
import { Food } from '@shared/types/foodTypes';
import { toFoods } from '../dataTransferObjects';


const router = express.Router();

// Get all menus (kitchens)
router.get('/', async (req, res) => {
    try {
        const menus = await prisma.kitchen.findMany({
            include: {
                foods: {
                    where: {
                        active: true
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
                kitchen_id: menuId,
                active: true,
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