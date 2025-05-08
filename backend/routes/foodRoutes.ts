import { Router, Request, Response } from 'express';
import prisma from '../prisma_client';
import { getNutritionixData } from '../utils/Nutritionix/nutritionix';

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
                active: true
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
        
        // add on to the search, no caching for now
        if (query.length >= 3) {
            const nutritionixData = await getNutritionixData(query);
            foods = [...foods, ...nutritionixData];
        }

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

        res.json(transformedFoods);
    } catch (error) {
        console.error('Error searching all foods:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; 