import prisma from "../prisma_client";
import { BadRequestError, UserNotFoundError } from "./types";

type DefaultPreferences = {
  [key: string]: {
    min: number;
    max: number;
  };
};

const defaultPreferences: DefaultPreferences = {
  Calories: { min: 1500, max: 2500 },
  Protein: { min: 120, max: 200 },
  Carbohydrates: { min: 100, max: 300 },
  Fat: { min: 10, max: 75 },
  Fiber: { min: 25, max: 40 },
  Sugar: { min: 0, max: 50 },
  Sodium: { min: 0, max: 2300 },
  Cholesterol: { min: 0, max: 300 },
  'Saturated Fat': { min: 0, max: 20 },
};

export const createUser = async (email: string, name?: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    console.log(`createUser: Normalized email for new user: '${normalizedEmail}'`);

    // Check if user already exists with this normalized email to prevent duplicates if this function is called inadvertently
    const existingUser = await prisma.user.findUnique({
        where: {
            email: normalizedEmail, // Prisma unique finds are case-sensitive by default on PostgreSQL
                                // We rely on the application logic to ensure emails are unique case-insensitively
                                // by always normalizing before create/query.
        }
    });

    if (existingUser) {
        console.warn(`createUser: User with normalized email '${normalizedEmail}' already exists with user_id: ${existingUser.user_id}. Returning existing user.`);
        // Fetch and return the existing user with preferences, similar to how it's done for a new user.
        const userWithPrefs = await prisma.user.findUnique({
            where: { user_id: existingUser.user_id },
            include: {
                macroPreferences: { include: { metric: true } },
            },
        });
        return { user: userWithPrefs, alreadyExisted: true };
    }

    // Create the user
    const user = await prisma.user.create({
        data: { 
            email: normalizedEmail, // Store normalized email
            name,
        },
    });
    console.log(`createUser: New user created with user_id: ${user.user_id} for email: '${normalizedEmail}'`);

    // Should create default preferences for the user

    const metrics = await prisma.nutritionalMetric.findMany({
        where: {
            name: {
                in: Object.keys(defaultPreferences),
            },
        },
    });

    const preferencesData = metrics.map(metric => ({
        user_id: user.user_id,
        metric_id: metric.id,
        min_value: defaultPreferences[metric.name].min,
        max_value: defaultPreferences[metric.name].max,
    }));
    
    await prisma.userPreference.createMany({
        data: preferencesData,
        skipDuplicates: true,
    });
     console.log(`createUser: Default preferences created for user_id: ${user.user_id}`);

    // Fetch the user again with preferences to return
    const userWithPreferences = await prisma.user.findUnique({
        where: { user_id: user.user_id },
        include: {
            macroPreferences: {
                include: {
                    metric: true,
                },
            },
        },
    });

    return { user: userWithPreferences, alreadyExisted: false };
};

export const getUser = async ({email, user_id}: {email?: string, user_id?: number}) => {
    if (!email && !user_id) {
        throw new BadRequestError('Email or User ID is required for getUser');
    }
    
    let user;
    if (email) {
        const normalizedEmail = email.toLowerCase().trim();
        console.log(`getUser: Searching for user with normalized email: '${normalizedEmail}' (case-insensitive)`);
        user = await prisma.user.findFirst({
            where: { 
                email: {
                    equals: normalizedEmail,
                    mode: 'insensitive'
                }
            },
            include: {
                macroPreferences: { include: { metric: true } },
            },
        });
    } else if (user_id) {
        console.log(`getUser: Searching for user with user_id: ${user_id}`);
        user = await prisma.user.findUnique({
            where: { user_id: user_id! }, // user_id is an INT, direct match
            include: {
                macroPreferences: { include: { metric: true } },
            },
        });
    } else {
        // This case should be caught by the initial check, but as a safeguard:
        throw new BadRequestError('Internal error: Insufficient parameters for getUser');
    }

    if (!user) {
        const criteria = email ? `email '${email.toLowerCase().trim()}'` : `user_id '${user_id}'`;
        console.warn(`getUser: User not found with ${criteria}`);
        throw new UserNotFoundError(`User not found with ${criteria}`);
    }
    
    console.log(`getUser: User found with user_id: ${user.user_id}`);
    return user;
};

export const getUserPreferences = async ({ user_id }: { user_id: number }) => {
    const preferences = await prisma.userPreference.findMany({
        where: { user_id },
        include: {
            metric: true,
        },
        orderBy: {
            id: 'asc'
        }
    });

    return preferences;
};

export const deleteUser = async ({ user_id }: { user_id: number }) => {
    const user = await prisma.user.delete({
        where: { user_id },
    });

    return user;
};

export const updateUserPreferences = async ({ 
    user_id, 
    preferences 
}: { 
    user_id: number; 
    preferences: Array<{
        metric_id: string;
        min_value: number | null;
        max_value: number | null;
    }>;
}) => {
    // First verify the user exists
    const user = await prisma.user.findUnique({
        where: { user_id },
    });

    if (!user) {
        throw new UserNotFoundError('User not found');
    }

    // Update or create preferences
    const updatedPreferences = await Promise.all(
        preferences.map((pref) =>
            prisma.userPreference.upsert({
                where: {
                    user_id_metric_id: {
                        user_id,
                        metric_id: pref.metric_id,
                    },
                },
                update: {
                    min_value: pref.min_value,
                    max_value: pref.max_value,
                },
                create: {
                    user_id,
                    metric_id: pref.metric_id,
                    min_value: pref.min_value,
                    max_value: pref.max_value,
                },
                include: {
                    metric: true,
                },
            })
        )
    );

    return updatedPreferences;
};

export const deleteUserPreference = async ({ user_id, metric_id }: { user_id: number, metric_id: string }) => {
    const preference = await prisma.userPreference.delete({
        where: { 
            user_id_metric_id: {
                user_id,
                metric_id
            }
        },
    });

    return preference;
};

