import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import prisma from '../prisma_client';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('POST /api/register', () => {
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

  it('creates a new user with default preferences', async () => {
    // First, create the nutritional metrics
    const metrics = await Promise.all([
      prisma.nutritionalMetric.create({
        data: { name: 'Calories', unit: 'kcal', description: 'Total energy content' },
      }),
      prisma.nutritionalMetric.create({
        data: { name: 'Protein', unit: 'g', description: 'Protein content' },
      }),
    ]);

    // Create the user
    const response = await request(app)
      .post('/api/register')
      .send({ name: 'Alice', email: 'alice@example.com' });

    expect(response.status).toBe(201);
    
    // Verify the user was created
    const user = await prisma.user.findUnique({
      where: { email: 'alice@example.com' },
    });
    expect(user).toBeDefined();
    expect(user?.name).toBe('Alice');

    // Verify the preferences were created
    const preferences = await prisma.userPreference.findMany({
      where: { user_id: user?.user_id },
      include: { metric: true },
    });

    expect(preferences).toHaveLength(2);
    expect(preferences[0].metric.name).toBe('Calories');
    expect(preferences[0].min_value).toBe(1500);
    expect(preferences[0].max_value).toBe(2500);
    expect(preferences[1].metric.name).toBe('Protein');
    expect(preferences[1].min_value).toBe(120);
    expect(preferences[1].max_value).toBe(200);
  });
});
