import express, { Request, Response, NextFunction } from 'express';
import prisma from '../prisma_client'; 
// import { requireAuth } from '../middleware/auth'; // No longer needed here

const router = express.Router();

// Middleware for debugging req.auth and req.user
router.use((req, res, next) => {
  console.log('Auth Debug Middleware in mealPreferences.ts:');
  console.log('req.auth:', JSON.stringify((req as any).auth, null, 2));
  console.log('req.user:', JSON.stringify((req as any).user, null, 2));
  next();
});

const getUserIdFromRequest = async (req: Request): Promise<number | null> => {
    if ((req as any).auth?.userId) {
        const clerkUserId = (req as any).auth.userId;
        console.log(`getUserIdFromRequest: Clerk User ID from req.auth: ${clerkUserId}`);

        const reqUser = (req as any).user;
        if (reqUser) {
            // console.log('getUserIdFromRequest: req.user object for debugging:', JSON.stringify(reqUser, null, 2));

            let emailToQuery: string | undefined = undefined;

            if (reqUser.primaryEmailAddress && typeof reqUser.primaryEmailAddress.emailAddress === 'string') {
                emailToQuery = reqUser.primaryEmailAddress.emailAddress;
                console.log(`getUserIdFromRequest: Email from primaryEmailAddress: '${emailToQuery}'`);
            } 
            else if (Array.isArray(reqUser.emailAddresses) && reqUser.emailAddresses.length > 0 && reqUser.emailAddresses[0] && typeof reqUser.emailAddresses[0].emailAddress === 'string') {
                emailToQuery = reqUser.emailAddresses[0].emailAddress;
                console.warn(`getUserIdFromRequest: Using first email from emailAddresses array: '${emailToQuery}' (Primary email might be missing, not a string, or different)`);
            }

            if (emailToQuery) {
                const normalizedEmail = emailToQuery.toLowerCase().trim();
                console.log(`getUserIdFromRequest: Normalized email for Prisma query: '${normalizedEmail}'`);

                try {
                    const appUser = await prisma.user.findFirst({
                        where: { 
                            email: {
                                equals: normalizedEmail,
                                mode: 'insensitive'
                            }
                        }
                    });

                    if (appUser) {
                        console.log(`getUserIdFromRequest: Found appUser.user_id: ${appUser.user_id} for email: '${normalizedEmail}' (using case-insensitive search)`);
                        return appUser.user_id;
                    } else {
                        console.warn(`getUserIdFromRequest: No appUser found for NORMALIZED email: '${normalizedEmail}' (Clerk User ID: ${clerkUserId}). Case-insensitive search failed.`);
                    }
                } catch (prismaError) {
                    console.error(`getUserIdFromRequest: Prisma query failed for email '${normalizedEmail}':`, prismaError);
                }
            } else {
                 console.warn(`getUserIdFromRequest: Could not extract a valid email address from req.user object. primaryEmailAddress: ${JSON.stringify(reqUser.primaryEmailAddress)}, emailAddresses: ${JSON.stringify(reqUser.emailAddresses)}`);
            }
        } else {
            console.warn("getUserIdFromRequest: req.user object is missing.");
        }
        console.warn("getUserIdFromRequest: Could not reliably determine app_user_id. Check previous logs for reasons (e.g., email extraction, DB lookup failure).");
        return null;
    }
    // Fallback for existing req.appUser or query param (less secure, review usage)
     if ((req as any).appUser && (req as any).appUser.user_id) { 
        console.log(`getUserIdFromRequest: Using pre-set req.appUser.user_id: ${(req as any).appUser.user_id}`);
        return (req as any).appUser.user_id;
    }
    if (req.method === 'GET' && req.query.user_id && !isNaN(parseInt(req.query.user_id as string))) { 
        console.warn("getUserIdFromRequest: Attempting to use user_id from query param - THIS IS INSECURE for mutations.");
        return parseInt(req.query.user_id as string);
    }
    console.warn("getUserIdFromRequest: User ID could not be determined from token, appUser object, or query param.");
    return null;
};


// == UserMealPreference Endpoints ==
// requireAuth is removed from these route definitions as it's handled by a parent router in server.ts

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = await getUserIdFromRequest(req);
        if (!userId) {
            res.status(403).json({ error: 'User ID is required or could not be determined from token.' });
            return; 
        }

        const preferences = await prisma.userMealPreference.findMany({
            where: { user_id: userId },
            orderBy: { default_time: 'asc' },
            include: { macroGoals: { include: { metric: true } } }, 
        });
        res.json(preferences);
        return;
    } catch (error) {
        console.error('Failed to fetch meal preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = await getUserIdFromRequest(req); 
        if (!userId) {
            res.status(403).json({ error: 'User ID cannot be determined for creation. Ensure token is valid.' });
            return; 
        }
        const { name, default_time } = req.body;

        if (!name || !default_time) {
            res.status(400).json({ error: 'Name and default_time are required' });
            return; 
        }

        const newPreference = await prisma.userMealPreference.create({
            data: {
                user_id: userId,
                name,
                default_time,
            },
             include: { macroGoals: { include: { metric: true } } }, 
        });
        res.status(201).json(newPreference);
        return;
    } catch (error: any) {
        console.error('Failed to create meal preference:', error);
        if (error.code === 'P2002') { 
             res.status(409).json({ error: 'A meal preference with this name already exists for this user.' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
        return;
    }
});

router.put('/:preferenceId', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = await getUserIdFromRequest(req); 
        const { preferenceId } = req.params;
        const { name, default_time } = req.body;

        if (!userId) {
            res.status(403).json({ error: 'User not authenticated for this action.' });
            return; 
        }

        const existingPreference = await prisma.userMealPreference.findFirst({
            where: { id: preferenceId, user_id: userId }
        });

        if (!existingPreference) {
            res.status(404).json({ error: 'Meal preference not found or user not authorized' });
            return; 
        }

        const updatedPreference = await prisma.userMealPreference.update({
            where: {
                id: preferenceId,
            },
            data: {
                name,
                default_time,
            },
            include: { macroGoals: { include: { metric: true } } }
        });
        res.json(updatedPreference);
        return;
    } catch (error: any) {
        console.error('Failed to update meal preference:', error);
         if (error.code === 'P2002') {
            res.status(409).json({ error: 'Update would violate a unique constraint (name).' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
        return;
    }
});

router.delete('/:preferenceId', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = await getUserIdFromRequest(req);
        const { preferenceId } = req.params;

        if (!userId) {
            res.status(403).json({ error: 'User not authenticated for this action.' });
            return; 
        }
        
        const existingPreference = await prisma.userMealPreference.findFirst({
            where: { id: preferenceId, user_id: userId }
        });

        if (!existingPreference) {
            res.status(404).json({ error: 'Meal preference not found or user not authorized' });
            return; 
        }

        await prisma.userMealPreference.delete({
            where: {
                id: preferenceId,
            },
        });
        res.status(204).send(); 
        return;
    } catch (error) {
        console.error('Failed to delete meal preference:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
});


// == MealMacroGoal Endpoints ==

router.post('/:preferenceId/goals', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = await getUserIdFromRequest(req);
        const { preferenceId } = req.params;
        const goals: { metric_id: string; min_value?: number | null; max_value?: number | null }[] = req.body.goals;

        if (!userId) {
            res.status(403).json({ error: 'User not authenticated for this action.' });
            return; 
        }
        if (!Array.isArray(goals)) {
            res.status(400).json({ error: 'Goals must be an array.' });
            return; 
        }

        const preference = await prisma.userMealPreference.findFirst({
            where: { id: preferenceId, user_id: userId }
        });

        if (!preference) {
            res.status(404).json({ error: 'Meal preference not found or user not authorized.' });
            return; 
        }

        const transactionPayload = goals.map(goal => 
            prisma.mealMacroGoal.upsert({
                where: {
                    user_meal_preference_id_metric_id: { 
                        user_meal_preference_id: preferenceId,
                        metric_id: goal.metric_id,
                    },
                },
                update: {
                    min_value: goal.min_value,
                    max_value: goal.max_value,
                },
                create: {
                    user_meal_preference_id: preferenceId,
                    metric_id: goal.metric_id,
                    min_value: goal.min_value,
                    max_value: goal.max_value,
                },
            })
        );
        
        await prisma.$transaction(transactionPayload);
        
        const resultPreference = await prisma.userMealPreference.findUnique({
            where: { id: preferenceId },
            include: { macroGoals: { include: { metric: true } } }
        });
        res.json(resultPreference);
        return;
    } catch (error: any) {
        console.error('Failed to set/update meal macro goals:', error);
        if (error.code === 'P2003') { 
            res.status(400).json({ error: 'Invalid metric_id provided for one or more goals.' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
        return;
    }
});

router.get('/:preferenceId/goals', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = await getUserIdFromRequest(req);
        const { preferenceId } = req.params;

        if (!userId) {
            res.status(403).json({ error: 'User not authenticated for this action.' });
            return; 
        }

        const goals = await prisma.mealMacroGoal.findMany({
            where: {
                user_meal_preference_id: preferenceId,
                userMealPreference: {
                    user_id: userId, 
                }
            },
            include: { metric: true } 
        });

        res.json(goals);
        return;
    } catch (error) {
        console.error('Failed to fetch meal macro goals:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
});

router.delete('/:preferenceId/goals/:metricId', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = await getUserIdFromRequest(req);
        const { preferenceId, metricId } = req.params;

        if (!userId) {
            res.status(403).json({ error: 'User not authenticated for this action.' });
            return; 
        }

        const parentPreference = await prisma.userMealPreference.findFirst({
            where: { id: preferenceId, user_id: userId }
        });

        if (!parentPreference) {
            res.status(404).json({ error: 'Parent meal preference not found or user not authorized.'});
            return; 
        }

        await prisma.mealMacroGoal.deleteMany({
             where: {
                user_meal_preference_id: preferenceId,
                metric_id: metricId,
            }
        });
        res.status(204).send();
        return;

    } catch (error) {
        console.error('Failed to delete meal macro goal:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
});


export default router; 