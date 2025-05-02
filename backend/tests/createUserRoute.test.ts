import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import prisma from '../prisma_client';

// 👇 Mock prisma.user.create
jest.mock('../prisma_client', () => ({
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('POST /api/register', () => {
  it('creates a new user', async () => {
    const fakeUser = {
      user_id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    };

    // 👇 Mock the return value of prisma.user.create
    (prisma.user.create as jest.Mock).mockResolvedValue(fakeUser);

    const response = await request(app)
      .post('/api/register')
      .send({ name: 'Alice', email: 'alice@example.com' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(fakeUser);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { name: 'Alice', email: 'alice@example.com' },
    });
  });
});
