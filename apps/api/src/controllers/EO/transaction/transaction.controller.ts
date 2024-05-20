
import prisma from "@/prisma";
import { getImgTransaction, getTransaction } from "@/services/EO/transaction/getTransaction";
import { Request, Response } from "express";

export class TransactionEOController {
    async getTransactionEO(req: Request, res: Response) {
        try {
            const { page = 1, pageSize = 5 } = req.query;
            const user_id = res.locals.decript.id;

            const skip = (Number(page) - 1) * Number(pageSize);
            const take = Number(pageSize);

            const findEvents = await prisma.masterEvent.findMany({
                where: {
                    usersId: user_id,
                },
                include: {
                    transactions: {
                        where: {
                            status_transaction: "pending"
                        }
                    },
                    user_id: {
                        select: {
                            name: true
                        }
                    }
                },
            });

            if (!findEvents.length) {
                return res.status(404).send({ message: "No events found" });
            }

            // Combine transactions from all events
            let allTransactions = findEvents.flatMap(event =>
                event.transactions.map(transaction => ({
                    ...transaction,
                    event_title: event.title,
                    user_name: event.user_id.name
                }))
            );

            // Apply pagination to the combined transactions
            const totalTransactions = allTransactions.length;
            const totalPages = Math.ceil(totalTransactions / Number(pageSize));

            allTransactions = allTransactions.slice(skip, skip + take);

            // console.log('Combined transactions', allTransactions);

            return res.status(200).send({
                result: allTransactions,
                totalPages,
                totalTransactions,
            });
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    async getImgTransaction(req: Request, res: Response) {
        try {
            const imgTransaction = await getImgTransaction()
            return res.status(200).send(imgTransaction)
        } catch (error) {
            return res.status(500).send(error)

        }
    }
}