import prisma from "../prisma_client";
import { BadRequestError, UserNotFoundError } from "./types";

export const createUser = async (email: string) => {
    const user = await prisma.users.create({
        data: { email },
    });

    return user;
};

export const getUser = async ({email, user_id}: {email?: string, user_id?: number}) => {

    if (!email && !user_id) {
        throw new BadRequestError('Email or id is required');
    }
    
    const user = await prisma.users.findUnique({
        where: { email, user_id },
    });

    if (!user) {
        throw new UserNotFoundError('User not found');
    }
    
    return user;
};  

export const deleteUser = async (id: number) => {
    const user = await prisma.users.delete({
        where: { user_id: id },
    });

    return user;
};

