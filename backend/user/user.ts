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

    const existingUser = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        }
    });

    if (existingUser) {
        console.warn(`createUser: User with normalized email '${normalizedEmail}' already exists with user_id: ${existingUser.user_id}. Returning existing user.`);
        const userWithPrefs = await prisma.user.findUnique({
            where: { user_id: existingUser.user_id },
            include: {
                macroPreferences: { include: { metric: true } },
                userMealPreferences: { include: { macroGoals: {include: { metric: true } } } }, // Also include meal prefs
            },
        });
        return { user: userWithPrefs, alreadyExisted: true };
    }

    const user = await prisma.user.create({
        data: { 
            email: normalizedEmail,
            name,
        },
    });
    console.log(`createUser: New user created with user_id: ${user.user_id} for email: '${normalizedEmail}'`);

    // Create default general macro preferences
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
    console.log(`createUser: Default general macro preferences created for user_id: ${user.user_id}`);

    // Create default meal preferences (Breakfast, Lunch, Dinner)
    const defaultMealSlots = [
        { name: "Breakfast", default_time: "08:00" },
        { name: "Lunch", default_time: "13:00" },
        { name: "Dinner", default_time: "18:00" },
    ];

    const mealPreferenceData = defaultMealSlots.map(slot => ({
        user_id: user.user_id,
        name: slot.name,
        default_time: slot.default_time,
    }));

    await prisma.userMealPreference.createMany({
        data: mealPreferenceData,
        skipDuplicates: true, // In case this runs again, though `existingUser` check should prevent it for meal prefs
    });
    console.log(`createUser: Default meal preferences (Breakfast, Lunch, Dinner) created for user_id: ${user.user_id}`);

    // Fetch the user again with all preferences to return
    const userWithAllPreferences = await prisma.user.findUnique({
        where: { user_id: user.user_id },
        include: {
            macroPreferences: { include: { metric: true } },
            userMealPreferences: { 
                orderBy: { default_time: 'asc' }, // Ensure they are sorted by time
                include: { macroGoals: { include: { metric: true } } }
            },
        },
    });

    return { user: userWithAllPreferences, alreadyExisted: false };
};

export const getUser = async ({email, user_id}: {email?: string, user_id?: number}) => {
    if (!email && !user_id) {
        throw new BadRequestError('Email or User ID is required for getUser');
    }
    
    let user;
    const includeOptions = {
        macroPreferences: { include: { metric: true } },
        userMealPreferences: { 
            orderBy: { default_time: 'asc' as const },
            include: { macroGoals: { include: { metric: true } } }
        },
    };

    if (email) {
        const normalizedEmail = email.toLowerCase().trim();
        console.log(`getUser: Searching for user with normalized email: '${normalizedEmail}' (case-insensitive)`);
        user = await prisma.user.findFirst({
            where: { 
                email: {
                    equals: normalizedEmail,
                    mode: 'insensitive' as const
                }
            },
            include: includeOptions,
        });
    } else if (user_id) {
        console.log(`getUser: Searching for user with user_id: ${user_id}`);
        user = await prisma.user.findUnique({
            where: { user_id: user_id! },
            include: includeOptions,
        });
    } else {
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

