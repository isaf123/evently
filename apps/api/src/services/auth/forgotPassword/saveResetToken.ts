import prisma from "@/prisma"

export const saveResetToken = async (userId: number, token: string) => {
    try {
        const updateToken = await prisma.users.update({
            where: { id: userId },
            data: { token: token }
        })
    } catch (error) {
        throw error
    }
}