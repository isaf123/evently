import prisma from "@/prisma"

export const findEvent = async (user_id: any) => {
    try {
        const transactions = await prisma.masterEvent.findMany({
            where: {
                user_id: user_id
            }, include: {
                transactions: {
                    where: {
                        status_transaction: "pending"
                    }
                }, user_id: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return transactions
    } catch (error) {
        throw error
    }
}