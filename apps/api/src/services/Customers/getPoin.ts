import prisma from "@/prisma"

export const getPoint = async (userId: any) => {
    try {
        const getPoinCust = await prisma.poin.findMany({
            where: {
                usersId: userId,
                expiredAt: {
                    gt: new Date()
                }
            }
        })
        return getPoinCust
    } catch (error) {
        throw error
    }
}