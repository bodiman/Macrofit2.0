import crypto from 'crypto';
import express, { Request, Response, NextFunction } from 'express';
import prisma from '../prisma_client';
import { Meal } from '@shared/types/foodTypes';
import { toMeals } from '../dataTransferObjects';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const toDate = (date: Date): Date => {
    date = new Date(date);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
};

const toTime = (date: Date): string => {
    date = new Date(date);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

// Create a new meal for a user
router.post('/user/meals', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user_id, meals } = req.body;
        
        if (!meals) {
            const { name, date, time } = req.body;
            if (!user_id || !name || !date || !time) {
                res.status(400).json({ error: 'user_id, name, date, and time are required' });
                return;
            }
            const newMeal = await prisma.meal.create({
                data: {
                    id: crypto.randomUUID(),
                    user_id: Number(user_id),
                    name,
                    date: toDate(new Date(date)),
                    time: typeof time === 'string' ? time : toTime(new Date(time)),
                },
                include: {
                    servings: {
                        include: {
                            food: {
                                include: {
                                    macros: { include: { metric: true } },
                                    servingUnits: true,
                                }
                            },
                            unit: true
                        }
                    }
                }
            });
            res.status(201).json(toMeals([newMeal])[0]);
            return;
        }

        if (!user_id || !Array.isArray(meals)) {
            res.status(400).json({ error: 'user_id and meals array are required' });
            return;
        }

        for (const meal of meals) {
            if (!meal.name || !meal.date || !meal.time) {
                res.status(400).json({ 
                    error: 'Each meal must have name, date, and time',
                    invalidMeal: meal
                });
                return;
            }
        }

        const createdDbMeals = await Promise.all(
            meals.map(meal => 
                prisma.meal.create({
                    data: {
                        id: crypto.randomUUID(),
                        user_id: Number(user_id),
                        name: meal.name,
                        date: toDate(new Date(meal.date)),
                        time: typeof meal.time === 'string' ? meal.time : toTime(new Date(meal.time)),
                    },
                    include: {
                        servings: {
                            include: {
                                food: {
                                    include: {
                                        macros: { include: { metric: true } },
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

        res.status(201).json(toMeals(createdDbMeals));
        return;
    } catch (err) {
        console.error('Failed to create meals:', err);
        next(err);
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
router.delete('/user/meals/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.meal.delete({ where: { id } });
        res.status(204).send();
        return;
    } catch (err) {
        console.error('Failed to delete meal:', err);
        next(err);
    }
});

router.get('/user/meals', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user_id_query = req.query.user_id as string;
        const dateString = req.query.date as string;

        if (!user_id_query) {
            res.status(400).json({ error: 'user_id is required' });
            return;
        }
        if (!dateString) {
            res.status(400).json({ error: 'date query parameter is required.' });
            return;
        }

        const userId = Number(user_id_query);
        if (isNaN(userId)) {
            res.status(400).json({ error: 'Invalid user_id format.' });
            return;
        }

        const targetDate = toDate(new Date(dateString));
        const userMealPreferences = await prisma.userMealPreference.findMany({
            where: { user_id: userId },
            orderBy: { default_time: 'asc' },
        });

        if (userMealPreferences.length > 0) {
            const mealUpsertPromises = userMealPreferences.map(preference => {
                return prisma.meal.upsert({
                    where: {
                        user_id_date_name: {
                            user_id: userId,
                            date: targetDate,
                            name: preference.name,
                        }
                    },
                    update: { 
                        time: preference.default_time,
                    },
                    create: {
                        id: uuidv4(),
                        user_id: userId,
                        name: preference.name,
                        date: targetDate,
                        time: preference.default_time,
                    }
                });
            });
            await prisma.$transaction(mealUpsertPromises);
        }

        let dbMealsForDayWithIncludes = await prisma.meal.findMany({
            where: {
                user_id: userId,
                date: targetDate,
            },
            include: {
                servings: {
                    include: {
                        food: {
                            include: {
                                macros: { include: { metric: true } },
                                servingUnits: true,
                            }
                        },
                        unit: true
                    }
                }
            }
        });

        if (dbMealsForDayWithIncludes.length > 0) {
            const mealsToDeleteIds = dbMealsForDayWithIncludes
                .filter(dbMeal => {
                    const isPreferred = userMealPreferences.some(p => p.name === dbMeal.name);
                    const isEmpty = dbMeal.servings.length === 0;
                    return !isPreferred && isEmpty;
                })
                .map(meal => meal.id);

            if (mealsToDeleteIds.length > 0) {
                await prisma.meal.deleteMany({
                    where: {
                        id: { in: mealsToDeleteIds },
                        user_id: userId 
                    }
                });
                dbMealsForDayWithIncludes = dbMealsForDayWithIncludes.filter(meal => !mealsToDeleteIds.includes(meal.id));
            }
        }
        
        const orderedMealsFromPreferences = userMealPreferences.map(preference => {
            return dbMealsForDayWithIncludes.find(dbMeal => dbMeal.name === preference.name);
        }).filter(meal => meal !== undefined) as typeof dbMealsForDayWithIncludes;

        const adHocMeals = dbMealsForDayWithIncludes.filter(dbMeal => 
            !userMealPreferences.some(p => p.name === dbMeal.name)
        );
        
        const allMealsForDaySorted = [...orderedMealsFromPreferences, ...adHocMeals].sort((a, b) => {
            return a.time.localeCompare(b.time);
        });

        const finalMealsDto = toMeals(allMealsForDaySorted);

        res.status(200).json(finalMealsDto);
        return;
    } catch (err) {
        console.error('Failed to get meals (with preferences logic):', err);
        next(err);
    }
});

// Add a food serving to a meal
router.post('/user/meals/:mealId/servings', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mealId } = req.params;
        const { foodServings } = req.body;

        if (!foodServings || !Array.isArray(foodServings) || foodServings.length === 0) {
            res.status(400).json({ error: 'foodServings array is required and cannot be empty'});
            return;
        }

        const meal = await prisma.meal.findUnique({
            where: { id: mealId }
        });

        if (!meal) {
            res.status(404).json({ error: 'Meal not found' });
            return;
        }
        
        const newServingsData = foodServings.map(serving => {
            const { food, quantity, unit, id } = serving;
            const food_id = food?.id;
            const unit_id = unit?.id;

            if (!id || !food_id || !unit_id || quantity === undefined ) {
                throw new Error('Each serving must have id, food.id, unit.id, and quantity');
            }
            return {
                id: serving.id, 
                unit_id: unit_id,
                food_id: food_id,
                meal_id: mealId,
                quantity: Number(quantity)
            };
        });

        const createdServings = await prisma.foodServing.createManyAndReturn({
            data: newServingsData,
        });
        res.status(201).json(createdServings);
        return;

    } catch (err: any) {
        console.error('Failed to add food serving:', err);
        if (err.message.includes('Each serving must have id')) {
            res.status(400).json({ error: err.message });
        } else {
            next(err);
        }
        return; // Added to ensure all paths return
    }
});

// Update a food serving
router.put('/user/meals/servings/:servingId', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { servingId } = req.params;
        const { quantity, unit } = req.body;

        if (quantity === undefined || !unit || !unit.id) {
            res.status(400).json({ error: 'quantity and unit (with id) are required' });
            return;
        }

        const updatedServing = await prisma.foodServing.update({
            where: { id: servingId },
            data: {
                quantity: Number(quantity),
                unit_id: unit.id
            },
            include: {
                food: { include: { macros: { include: { metric: true }}, servingUnits: true }},
                unit: true
            } 
        });
        res.status(200).json(updatedServing);
        return;
    } catch (err) {
        console.error('Failed to update food serving:', err);
        next(err);
    }
});

// Delete a food serving
router.delete('/user/meals/servings/:servingId', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { servingId } = req.params;
        await prisma.foodServing.delete({
            where: { id: servingId }
        });
        res.status(204).send();
        return;
    } catch (err) {
        console.error('Failed to delete food serving:', err);
        next(err);
    }
});

// Get all servings for a meal
router.get('/user/meals/:mealId/servings', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mealId } = req.params;
        const servings = await prisma.foodServing.findMany({
            where: { meal_id: mealId },
            include: {
                food: { include: { macros: { include: { metric: true }}, servingUnits: true }},
                unit: true
            }
        });
        res.status(200).json(servings);
        return;
    } catch (err) {
        console.error('Failed to get food servings:', err);
        next(err);
    }
});

export default router;