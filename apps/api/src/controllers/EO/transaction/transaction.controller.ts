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
      const { page, pageSize, q = '', find, order, status, search } = req.query;
      const user_id = res.locals.decript.id;

      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);
      const searchQuery = q.toString();

      // Fetch events with pending transactions for a specific user

      const event = await prisma.masterEvent.findMany({
        where: {
          usersId: user_id,
        },
        select: {
          id: true,
        },
      });

      const newArr = event.map((val) => {
        return val.id;
      });

      const where: any = {
        event_id: {
          in: newArr,
        },
      };
      console.log('ini search :', search);
      if (status) {
        where.status_transaction = status;
      }

      if (search) {
        where.OR = [
          { event: { title: { contains: search } } },
          { user: { name: { contains: search } } },
        ];
      }

      const [key, value] = String(order).split('-');
      const newOrder = { [key]: value };

      const trans = await prisma.transaction.findMany({
        skip,
        take,
        orderBy: [newOrder],
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          event: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      const maxpage = await prisma.transaction.count({
        where: {
          event_id: {
            in: newArr,
          },
        },
      });

      const totalPages = Math.ceil(maxpage / Number(pageSize));

      return res.status(200).send({
        result: trans,
        totalPages,
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

      return res.status(200).json({
        success: true,
        data: updatedTransaction,
        message: 'Payment verified',
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
