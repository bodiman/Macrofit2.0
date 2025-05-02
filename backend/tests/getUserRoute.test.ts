import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import prisma from '../prisma_client';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('GET /api/user', () => {
  beforeEach(async () => {
    // Clean up the database before each test
    await prisma.userPreference.deleteMany();
    await prisma.user.deleteMany();
    await prisma.nutritionalMetric.deleteMany();
  });

  afterAll(async () => {
    // Clean up after all tests
    await prisma.userPreference.deleteMany();
    await prisma.user.deleteMany();
    await prisma.nutritionalMetric.deleteMany();
    await prisma.$disconnect();
  });

  it('should return a user with their preferences', async () => {
    // First, create the nutritional metrics
    const metrics = await Promise.all([
      prisma.nutritionalMetric.create({
        data: { name: 'Calories', unit: 'kcal', description: 'Total energy content' },
      }),
      prisma.nutritionalMetric.create({
        data: { name: 'Protein', unit: 'g', description: 'Protein content' },
      }),
    ]);

    // Create a user with preferences
    const user = await prisma.user.create({
      data: {
        email: 'alice@example.com',
        name: 'Alice',
        macroPreferences: {
          create: [
            {
              metric_id: metrics[0].id,
              min_value: 1500,
              max_value: 2500,
            },
            {
              metric_id: metrics[1].id,
              min_value: 120,
              max_value: 200,
            },
          ],
        },
      },
      include: {
        macroPreferences: {
          include: {
            metric: true,
          },
        },
      },
    });

    // Get the user
    const response = await request(app)
      .get('/api/user')
      .query({ email: 'alice@example.com' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });
});
