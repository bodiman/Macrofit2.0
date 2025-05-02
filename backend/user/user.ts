import prisma from "../prisma_client";
import { BadRequestError, UserNotFoundError } from "./types";

export const createUser = async (email: string) => {
    const user = await prisma.user.create({
        data: { email },
    });

    return user;
};

export const getUser = async ({email, user_id}: {email?: string, user_id?: number}) => {
    if (!email && !user_id) {
        throw new BadRequestError('Email or id is required');
    }
    
    const user = await prisma.user.findUnique({
        where: email ? { email } : { user_id: user_id! },
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

