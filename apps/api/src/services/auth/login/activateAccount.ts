import prisma from "@/prisma"

export const activateAccount = async (userId: number) => {
    try {
        const user = await prisma.users.update({
            where: { id: userId },
            data: { isActive: true }
        })
        return user
    } catch (error) {
        throw error
    }
}