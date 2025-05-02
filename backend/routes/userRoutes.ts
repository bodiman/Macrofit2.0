// backend/routes/userRoutes.ts
import express from 'express';
import prisma from '../prisma_client';
import { getUser, createUser } from '../user/user';
import { BadRequestError, UserNotFoundError } from '../user/types';

const router = express.Router();

type GetUserParams = {
    id?: number;
    email?: string;
};

type CreateUserParams = {
    email: string;
    name?: string;
};

router.get('/user', async (req: express.Request<GetUserParams>, res: express.Response) => {
  try {
    const email = req.query.email as string | undefined;
    const user_id = req.query.id ? parseInt(req.query.id as string) : undefined;

    const user = await getUser({ email, user_id });
    res.status(200).json(user);

  } catch (err) {
    if (err instanceof BadRequestError) {
        res.status(400).json({ error: err.message });
    } else if (err instanceof UserNotFoundError) {
        res.status(404).json({ error: err.message });
    } else {
        console.error('Failed to fetch user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

router.post('/register', async (req: express.Request<CreateUserParams>, res: express.Response) => {
    try {
        const { email, name } = req.body;
        const result = await createUser(email, name);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
