import prisma from "@/prisma"

export const findUsers = async (email: string, data: any) => {
    try {
        const user = await prisma.users.findFirst({
            where: { OR: [{ email: email }, { name: data }] }
        });
        return user
    } catch (error) {
        throw error
    }
}