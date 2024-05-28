import prisma from '@/prisma';
import { findEvent } from '@/services/EO/transaction/findEvent';
import {
  getImgTransaction,
  getTransaction,
} from '@/services/EO/transaction/getTransaction';
import { Request, Response } from 'express';

export class TransactionEOController {
  async getTransactionEO(req: Request, res: Response) {
    try {
      const { page, pageSize, q = '', find, order } = req.query;
      const user_id = res.locals.decript.id;

      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);
      const searchQuery = q.toString();

      // Fetch events with pending transactions for a specific user
      const events = await prisma.masterEvent.findMany({
        where: {
          usersId: Number(user_id),
        },
        include: {
          transactions: {
            orderBy: {
              date_transaction: 'desc', // Order transactions by date_transaction
            },
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          }, // Include related transactions
          user_id: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      console.log('ini event:', events.length);

      if (!events.length) {
        return res.status(404).send({ message: 'No events found' });
      }

      // Combine transactions from all events
      let allTransactions = events.flatMap((event) =>
        event.transactions.map((transaction) => ({
          ...transaction,
          event_title: event.title,
          user_name: event.user_id.name,
        })),
      );

      // Filter transactions based on the search query
      if (searchQuery) {
        allTransactions = allTransactions.filter(
          (transaction) =>
            transaction.invoice_code.includes(searchQuery) ||
            transaction.event_title.includes(searchQuery) ||
            transaction.user_name.includes(searchQuery),
        );
      }
      allTransactions.sort(
        (a, b) =>
          new Date(b.date_transaction).getTime() -
          new Date(a.date_transaction).getTime(),
      );
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
      const imgTransaction = await getImgTransaction();
      return res.status(200).send(imgTransaction);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async updateTransactionStatus(req: Request, res: Response) {
    try {
      console.log('ini id ke:', req.params.id);
      const { status_transaction } = req.body;

      if (!status_transaction) {
        return res
          .status(400)
          .json({ error: 'Status transaction is required' });
      }
      const updatedTransaction = await prisma.transaction.update({
        where: {
          id: Number(req.params.id),
        },
        data: { status_transaction: 'paid' },
      });

      return res
        .status(200)
        .json({
          success: true,
          data: updatedTransaction,
          message: 'Payment verified',
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
