import crypto from 'crypto';
import express from 'express';
import prisma from '../prisma_client';
import { Meal } from '@shared/types/foodTypes';
import { toMeals } from '../dataTransferObjects';
const router = express.Router();

const toDate = (date: Date) => {
    date = new Date(date)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const toTime = (date: Date) => {
    date = new Date(date)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

// Create a new meal for a user
router.post('/user/meals', async (req, res) => {
    try {
        const { user_id, meals } = req.body;
        
        // Handle single meal creation
        if (!meals) {
            const { name, date, time } = req.body;
            if (!user_id || !name || !date || !time) {
                res.status(400).json({ error: 'user_id, name, date, and time are required' });
                return;
            }
            const newMeal = await prisma.meal.create({
                data: {
                    id: crypto.randomUUID(),
                    user_id,
                    name,
                    date: toDate(date),
                    time: toTime(time),
                },
                include: {
                    servings: {
                        include: {
                            food: true,
                            unit: true
                        }
                    }
                }
            });

            console.log("newMeal", newMeal)
            res.status(201).json(newMeal);
            return;
        }

        // Handle multiple meals creation
        if (!user_id || !Array.isArray(meals)) {
            res.status(400).json({ error: 'user_id and meals array are required' });
            return;
        }

        // Validate each meal in the array
        for (const meal of meals) {
            if (!meal.name || !meal.date || !meal.time) {
                res.status(400).json({ 
                    error: 'Each meal must have name, date, and time',
                    invalidMeal: meal
                });
                return;
            }
        }

        const createdMeals = await Promise.all(
            meals.map(meal => 
                prisma.meal.create({
                    data: {
                        id: crypto.randomUUID(),
                        user_id,
                        name: meal.name,
                        date: toDate(meal.date),
                        time: toTime(meal.time),
                    },
                    include: {
                        servings: {
                            include: {
                                food: {
                                    include: {
                                        macros: true,
                                        servingUnits: true,
                                    }
                                },
                                unit: true
                            }
                        }
                    }
                })
            )
        );

        res.status(201).json(createdMeals);
    } catch (err) {
        console.error('Failed to create meals:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a meal
// router.put('/user/meals/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, date, time } = req.body;
        
//         const updatedMeal = await prisma.meal.update({
//             where: { id },
//             data: {
//                 ...(name && { name }),
//                 ...(date && { date: toDate(date) }),
//                 ...(time && { time: toTime(time) }),
//             },
//             include: {
//                 servings: {
//                     include: {
//                         food: true,
//                         unit: true
//                     }
//                 }
//             }
//         });
//         res.status(200).json(updatedMeal);
//     } catch (err) {
//         console.error('Failed to update meal:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// Delete a meal by id
router.delete('/user/meals/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.meal.delete({ where: { id } });
        res.status(204).send();
    } catch (err) {
        console.error('Failed to delete meal:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/user/meals', async (req, res) => {
    try {
        const { user_id, date } = req.query;

        if (!user_id) {
            res.status(400).json({ error: 'user_id is required' });
            return;
        }

        const dbMeals = await prisma.meal.findMany({ 
            where: { 
                user_id: Number(user_id),
                date: toDate(new Date(date as string))
            },
            include: {
                servings: {
                    include: {
                        food: {
                            include: {
                                macros: {
                                    include: {
                                        metric: true
                                    }
                                },
                                servingUnits: true,
                            }
                        },
                        unit: true
                    }
                }
            }
        });

        const meals: Meal[] = toMeals(dbMeals);
        res.status(200).json(meals);
    } catch (err) {
        console.error('Failed to get meals:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a food serving to a meal
router.post('/user/meals/:mealId/servings', async (req, res) => {
    try {
        const { mealId } = req.params;
        const { foodServings } = req.body;
        const newServings = [];

        for (const serving of foodServings) {
            const { food, quantity, unit } = serving;
            const food_id = food.id;

            if (!food_id || !unit || !quantity) {
                res.status(400).json({ error: 'food_id, unit, and quantity are required' });
                return;
            }

            // Verify the meal exists
            const meal = await prisma.meal.findUnique({
                where: { id: mealId }
            });

            if (!meal) {
                res.status(404).json({ error: 'Meal not found' });
                return;
            }

            const newServing = await prisma.foodServing.create({
                data: {
                    id: crypto.randomUUID(),
                    unit_id: unit.id,
                    food_id,
                    meal_id: mealId,
                    quantity: Number(quantity)
                },
                include: {
                    food: true
                }
            });
            newServings.push(newServing);
        }
        res.status(201).json(newServings);
    } catch (err) {
        console.error('Failed to add food serving:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a food serving
router.put('/user/meals/servings/:servingId', async (req, res) => {
    try {
        const { servingId } = req.params;
        const { quantity } = req.body;

        console.log("quantity", quantity)

        if (quantity === undefined) {
            res.status(400).json({ error: 'quantity is required' });
            return;
        }

        const updatedServing = await prisma.foodServing.update({
            where: { id: servingId },
            data: {
                quantity: Number(quantity)
            },
            include: {
                food: true
            }
        });

        res.status(200).json(updatedServing);
    } catch (err) {
        console.error('Failed to update food serving:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a food serving
router.delete('/user/meals/servings/:servingId', async (req, res) => {
    try {
        const { servingId } = req.params;

        await prisma.foodServing.delete({
            where: { id: servingId }
        });

        res.status(204).send();
    } catch (err) {
        console.error('Failed to delete food serving:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all servings for a meal
router.get('/user/meals/:mealId/servings', async (req, res) => {
    try {
        const { mealId } = req.params;

        const servings = await prisma.foodServing.findMany({
            where: { meal_id: mealId },
            include: {
                food: true
            }
        });

        res.status(200).json(servings);
    } catch (err) {
        console.error('Failed to get food servings:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;