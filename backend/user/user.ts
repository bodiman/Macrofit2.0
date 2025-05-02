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
    // Create the user
    const user = await prisma.user.create({
        data: { 
            email,
            name,
        },
    });

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

    return { user };
};

export const getUser = async ({email, user_id}: {email?: string, user_id?: number}) => {
    if (!email && !user_id) {
        throw new BadRequestError('Email or id is required');
    }
    
    const user = await prisma.user.findUnique({
        where: email ? { email } : { user_id: user_id! },
        include: {
            macroPreferences: {
                include: {
                    metric: true,
                },
            },
        },
    });

    if (!user) {
        throw new UserNotFoundError('User not found');
    }
    
    return user;
};  

export const deleteUser = async ({ user_id }: { user_id: number }) => {
    const user = await prisma.user.delete({
        where: { user_id },
    });

    return user;
};

