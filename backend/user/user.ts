import prisma from "../prisma_client";

export const createUser = async (email: string) => {
    const user = await prisma.user.create({
        data: { email },
    });

    return user;
};

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    
    return user;
};  

export const deleteUser = async (id: number) => {
    const user = await prisma.user.delete({
        where: { user_id: id },
    });

    return user;
};

