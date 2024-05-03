import prisma from "@/prisma";
import { Role as PrismaRole } from ".prisma/client";
import { Users } from ".prisma/client";

export const createUsers = async (userData: {
    name: string;
    email: string;
    password: string;
    role: PrismaRole;
    avatar_users?: string;
    referral_code: string;
}): Promise<Users> => {
    try {
        const newUser = await prisma.users.create({
            data: userData
        });
        return newUser;
    } catch (error) {
        throw error;
    }
};
