// backend/routes/userRoutes.ts
import express from 'express';
import prisma from '../prisma_client';

const router = express.Router();

type GetUserParams = {
    id?: number;
    email?: string;
};

type CreateUserParams = {
    email: string;
};

// GET /users - list all users
router.get('/users', async (req: express.Request<GetUserParams>, res: express.Response) => {
  try {
    const users = await prisma.user.findMany({ 
        where: { 
            user_id: req.params.id, 
            email: req.params.email 
        } 
    });
    res.json(users);

  } catch (err) {``
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/users', async (req: express.Request<CreateUserParams>, res: express.Response) => {
    try {
        const user = await prisma.user.create({ data: req.body });
        res.status(201).json(user);
    } catch (err) {
        console.error('Failed to create user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
