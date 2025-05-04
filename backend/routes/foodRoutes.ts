import { Router, Request, Response } from 'express';
import prisma from '../prisma_client';
import { Food } from '@shared/types/foodTypes';

const router = Router();

interface FoodWithMacros {
    id: string;
    name: string;
    macros: Array<{
        metric: {
            name: string;
        };
        value: number;
    }>;
}




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
        // Transform the database results to match the Food type
        const transformedFoods: Food[] = foods.map((food: FoodWithMacros) => ({
            id: food.id,
            name: food.name,
            macros: Object.fromEntries(
                food.macros.map(macro => [
                    macro.metric.name.toLowerCase(),
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

export default router; 