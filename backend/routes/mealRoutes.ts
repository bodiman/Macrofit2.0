import crypto from 'crypto';
import express from 'express';
import prisma from '../prisma_client';
const router = express.Router();

const toDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const toTime = (date: Date) => {
    return new Date(0, 0, 0, date.getHours(), date.getMinutes(), date.getSeconds());
};

// Create a new meal for a user
router.post('/user/meals', async (req, res) => {
    try {
        const { user_id, name, date, time } = req.body;
        if (!user_id || !name || !date || !time) {
            res.status(400).json({ error: 'user_id, name, date, and time are required' });
        }
        const newMeal = await prisma.meal.create({
            data: {
                id: crypto.randomUUID(),
                user_id,
                name,
                date: toDate(date),
                time: toTime(time),
            },
        });
        res.status(201).json(newMeal);
    } catch (err) {
        console.error('Failed to create meal:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

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
        const { user_id, date, name } = req.body;

        const meals = await prisma.meal.findMany({ where: { user_id, date, name } });
        res.status(200).json(meals);
    } catch (err) {
        console.error('Failed to get meals:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a food serving to a meal
router.post('/user/food-serving', async (req, res) => {
    try {
        const { food_id, meal_id, quantity } = req.body;
        if (!food_id || !meal_id) {
            res.status(400).json({ error: 'food_id and meal_id are required' });
        }
        const newServing = await prisma.foodServing.create({
            data: {
                id: crypto.randomUUID(),
                food_id,
                meal_id,
                quantity,
            },
        });
        res.status(201).json(newServing);
    } catch (err) {
        console.error('Failed to add food serving:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a food serving by id
router.put('/user/food-serving/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { food_id, meal_id } = req.body;
        const updatedServing = await prisma.foodServing.update({
            where: { id },
            data: {
                ...(food_id && { food_id }),
                ...(meal_id && { meal_id }),
            },
        });
        res.status(200).json(updatedServing);
    } catch (err) {
        console.error('Failed to update food serving:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a food serving by id
router.delete('/user/food-serving/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.foodServing.delete({ where: { id } });
        res.status(204).send();
    } catch (err) {
        console.error('Failed to delete food serving:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;