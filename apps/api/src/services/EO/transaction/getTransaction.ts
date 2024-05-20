import { TransactionStatus } from "@/interfaces/type";
import prisma from "@/prisma";

export const getTransaction = async (page: number, pageSize: number, data: any) => {
    try {
        const skip = (Number(page) - 1) * Number(pageSize);
        const take = Number(pageSize); // Corrected to take the pageSize number of records




        // return transaction;
    } catch (error) {
        throw error;
    }
}

export const getImgTransaction = async () => {
    try {
        const transaction = await prisma.transaction.findMany({
            where: {
                status_transaction: "pending",
            },
            select: {
                img_payment: true
            }
        })
        return transaction
    } catch (error) {
        throw error
    }
}