import prisma from "../prisma_client";

export const createUser = async (email: string) => {
    const user = await prisma.user.create({
        data: { email },
    });
};