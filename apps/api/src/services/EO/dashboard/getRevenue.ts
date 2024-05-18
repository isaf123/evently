import prisma from "@/prisma"

export const getRevenueEvent = async () => {
    try {
        const totalRevenue = await prisma.transaction.aggregate({
            _sum: {
                price_after_discount: true
            },
            where: {
                status_transaction: 'paid'
            }
        })
        return totalRevenue
    } catch (error) {
        throw error
    }
}