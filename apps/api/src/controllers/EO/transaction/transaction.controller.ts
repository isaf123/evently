
import prisma from "@/prisma";
import { findEvent } from "@/services/EO/transaction/findEvent";
import { getImgTransaction, getTransaction } from "@/services/EO/transaction/getTransaction";
import { Request, Response } from "express";

export class TransactionEOController {
    async getTransactionEO(req: Request, res: Response) {
        try {
            const { page = 1, pageSize = 5, q = '' } = req.query;
            const user_id = res.locals.decript.id;

            const skip = (Number(page) - 1) * Number(pageSize);
            const take = Number(pageSize);
            const searchQuery = q.toString();

            // Fetch events with pending transactions
            const findEvents = await findEvent(user_id)

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

            // Filter transactions based on the search query
            if (searchQuery) {
                allTransactions = allTransactions.filter(transaction =>
                    transaction.invoice_code.includes(searchQuery) ||
                    transaction.event_title.includes(searchQuery) ||
                    transaction.user_name.includes(searchQuery)
                );
            }

            // Apply pagination to the combined transactions
            const totalTransactions = allTransactions.length;
            const totalPages = Math.ceil(totalTransactions / Number(pageSize));
            allTransactions = allTransactions.slice(skip, skip + take);

            return res.status(200).send({
                result: allTransactions,
                totalPages,
                totalTransactions,
            });
        } catch (error) {
            return res.status(500).send(error);
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

    async updateTransactionStatus(req: Request, res: Response) {
        try {
            console.log('ini id ke:', req.params.id);
            const { status_transaction } = req.body;

            if (!status_transaction) {
                return res.status(400).json({ error: 'Status transaction is required' });
            }
            const updatedTransaction = await prisma.transaction.update({
                where: {
                    id: Number(req.params.id)
                },
                data: { status_transaction: "paid" }
            })

            return res.status(200).json({ success: true, data: updatedTransaction });
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}