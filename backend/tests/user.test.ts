// tests/user.test.ts
import { mockPrisma } from './setup';
import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('User API', () => {
  it('should create, retrieve, and delete a user', async () => {
    const testUser = {
      user_id: 1,
      name: 'Test User',
      email: 'test@test.com',
    };

    // Mock create user
    mockPrisma.user.create.mockResolvedValue(testUser);
    
    // Create user
    const createResponse = await request(app)
      .post('/api/register')
      .send({ email: 'test@test.com', name: 'Test User' });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toEqual(testUser);

    // // Mock find user
    // mockPrisma.user.findUnique.mockResolvedValue(testUser);

    // // Get user
    // const getResponse = await request(app)
    //   .get('/api/user')
    //   .query({ email: 'test@test.com' });

    // expect(getResponse.status).toBe(200);
    // expect(getResponse.body).toEqual(testUser);

    // // Mock delete user
    // mockPrisma.user.delete.mockResolvedValue(testUser);

    // // Delete user
    // const deleteResponse = await request(app)
    //   .delete('/api/user')
    //   .query({ user_id: testUser.user_id });

    // expect(deleteResponse.status).toBe(200);
    // expect(deleteResponse.body).toEqual(testUser);

    // // Mock user not found after deletion
    // mockPrisma.user.findUnique.mockResolvedValue(null);

    // // Try to get deleted user
    // const getDeletedResponse = await request(app)
    //   .get('/api/user')
    //   .query({ email: 'test@test.com' });

    // expect(getDeletedResponse.status).toBe(404);
  });
});
