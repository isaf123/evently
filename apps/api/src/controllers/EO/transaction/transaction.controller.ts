
import prisma from "@/prisma";
import { getTransaction } from "@/services/EO/transaction/getTransaction";
import { Request, Response } from "express";

export class TransactionEOController {
    async getTransactionEO(req: Request, res: Response) {
        try {
            const { page, pageSize } = req.query;

            const transactionDetails = await getTransaction(Number(page), Number(pageSize))

            const totalTransaction = await prisma.transaction.count({
                where: {
                    status_transaction: "pending"
                }
            });
            const totalPage = Math.ceil(totalTransaction / Number(pageSize));
            return res
                .status(200)
                .send({ rc: 200, success: true, result: transactionDetails, totalPage, totalTransaction });
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}