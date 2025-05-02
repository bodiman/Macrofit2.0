import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import prisma from '../prisma_client';

// Mock Prisma client
jest.mock('../prisma_client', () => ({
  user: {
    findUnique: jest.fn().mockResolvedValue(
      { user_id: 1, name: 'Alice', email: 'alice@example.com' },
    ),
  },
}));

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('GET /api/user', () => {
  it('should return a user', async () => {
    const params = new URLSearchParams({email: "alice@example.com"})
    console.log("params", params.toString());
    const response = await request(app).get(`/api/user?${params.toString()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      { user_id: 1, name: 'Alice', email: 'alice@example.com' },
    );
  });
});
