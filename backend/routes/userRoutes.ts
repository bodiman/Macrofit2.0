// backend/routes/userRoutes.ts
import express from 'express';
import prisma from '../prisma_client';
import { getUser, createUser, updateUserPreferences, getUserPreferences, deleteUserPreference } from '../user/user';
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

type UpdatePreferencesParams = {
    user_id: number;
    preferences: Array<{
        metric_id: number;
        min_value: number | null;
        max_value: number | null;
    }>;
};

type GetPreferencesParams = {
    user_id: number;
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

router.get('/user/preferences', async (req: express.Request<GetPreferencesParams>, res: express.Response) => {
  try {
    const user_id = req.query.user_id ? parseInt(req.query.user_id as string) : undefined;

    if (!user_id) {
      throw new BadRequestError('User ID is required');
    }

    const preferences = await getUserPreferences({ user_id });
    res.status(200).json(preferences);

  } catch (err) {
    if (err instanceof BadRequestError) {
      res.status(400).json({ error: err.message });
    } else if (err instanceof UserNotFoundError) {
      res.status(404).json({ error: err.message });
    } else {
      console.error('Failed to fetch preferences:', err);
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

router.put('/user/preferences', async (req: express.Request<UpdatePreferencesParams>, res: express.Response) => {
    try {
        const { user_id, preferences } = req.body;
        
        if (!user_id || !preferences) {
            throw new BadRequestError('User ID and preferences are required');
        }

        const updatedPreferences = await updateUserPreferences({ user_id, preferences });
        res.status(200).json(updatedPreferences);
    } catch (err) {
        if (err instanceof BadRequestError) {
            res.status(400).json({ error: err.message });
        } else if (err instanceof UserNotFoundError) {
            res.status(404).json({ error: err.message });
        } else {
            console.error('Failed to update preferences:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.delete('/user/preferences', async (req: express.Request, res: express.Response) => {
    try {
        // get metric id from params 
        const metric_id = req.query.metric_id as string;
        const user_id = req.query.user_id ? parseInt(req.query.user_id as string) : undefined;

        if (!metric_id || !user_id) {
            throw new BadRequestError('Metric ID is required');
        }

        const deletedPreference = await deleteUserPreference({ user_id, metric_id });
        res.status(200).json(deletedPreference);
        
    } catch (err) {
        if (err instanceof BadRequestError) {
            res.status(400).json({ error: err.message });
        }
    }
});

export default router;
