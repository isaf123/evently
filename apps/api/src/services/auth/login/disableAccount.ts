import prisma from "@/prisma"

export const disableAccount = async (userId: number) => {
    try {
        const user = await prisma.users.update({
            where: { id: userId },
            data: {
                isActive: false
            }
        })
        return user
    } catch (error) {
        throw error
    }
}