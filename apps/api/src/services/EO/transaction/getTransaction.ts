import { TransactionStatus } from "@/interfaces/type";
import prisma from "@/prisma";

export const getTransaction = async (page: number, pageSize: number) => {
    try {
        const skip = (Number(page) - 1) * Number(pageSize);
        const take = Number(pageSize); // Corrected to take the pageSize number of records

        const transaction = await prisma.transaction.findMany({
            skip: skip,
            take: take,
            include: {
                user: {
                    select: {
                        name: true
                    }
                },
                event: {
                    select: {
                        title: true
                    }
                }
            },
            where: {
                status_transaction: "pending"
            }
        });

        return transaction;
    } catch (error) {
        throw error;
    }
}
