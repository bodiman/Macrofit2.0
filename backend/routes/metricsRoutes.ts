import express from 'express';
import prisma from '../prisma_client';

const router = express.Router();

// GET /api/nutritional-metrics
router.get('/nutritional-metrics', async (req: express.Request, res: express.Response) => {
  try {
    const metrics = await prisma.nutritionalMetric.findMany();
    res.status(200).json(metrics);
  } catch (err) {
    console.error('Failed to fetch nutritional metrics:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/nutritional-metrics
router.post('/nutritional-metrics', async (req: express.Request, res: express.Response) => {
  try {
    const { name, description, unit } = req.body;
    if (!name || !unit) {
      res.status(400).json({ error: 'Name and unit are required' });
    }
    const newMetric = await prisma.nutritionalMetric.create({
      data: {
        id: name.toLowerCase().replace(/\s+/g, '-'), // Generate a unique ID based on the name
        name,
        description,
        unit
      }
    });
    res.status(201).json(newMetric);
  } catch (err) {
    console.error('Failed to add nutritional metric:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router; 