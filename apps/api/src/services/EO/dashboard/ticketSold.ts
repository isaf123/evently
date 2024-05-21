import prisma from "@/prisma"

export const getTicketSold = async () => {
    try {
        const ticketSold = await prisma.transaction.count({
            where: {
                status_transaction: "paid"
            }
        })

        return ticketSold
    } catch (error) {
        throw error
    }
}