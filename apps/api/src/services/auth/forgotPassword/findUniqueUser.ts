import prisma from "@/prisma";
import { Users } from ".prisma/client";

export const findUniqueUsers = async (email: string): Promise<Users | null> => {
    try {
        // Cek apakah pengguna dengan email tersebut sudah ada
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        return user;
    } catch (error) {
        throw error;
    }
};