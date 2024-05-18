import prisma from "@/prisma"

export const getPendingPayment = async () => {
    try {
        const pendingPayment = await prisma.transaction.count({
            where: {
                status_transaction: 'pending'
            }
        })
        return pendingPayment
    } catch (error) {
        throw error
    }
}