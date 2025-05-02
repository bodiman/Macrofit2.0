import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import prisma from '../prisma_client';

// Mock Prisma client
jest.mock('../prisma_client', () => ({
  user: {
    findMany: jest.fn().mockResolvedValue([
      { id: 1, name: 'Alice', email: 'alice@example.com' },
    ]),
  },
}));

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('GET /api/users', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: 'Alice', email: 'alice@example.com' },
    ]);
  });
});
