import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export class TransactionUserController {
  async createTransaction(req: Request, res: Response) {
    try {
      console.log('okeeeeeeee');
      console.log(res.locals.decript.id);
      console.log(req.body);

      // const {
      //   date_transaction,
      //   invoice_code,
      //   price_after_discount,
      //   status_transaction,
      //   ticket_count,
      //   total_price,
      //   event_id,
      //   user_id,
      //   voucherId,
      //   point_discount,
      //   voucher_discount,
      // } = req.body;

      // const trans = await prisma.transaction.create({
      //   data: {
      //     date_transaction,
      //     invoice_code,
      //     price_after_discount,
      //     status_transaction,
      //     ticket_count,
      //     total_price,
      //     event_id,
      //     user_id: res.locals.decript.id,
      //     voucherId,
      //     point_discount,
      //     voucher_discount,
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
  }

  async getVoucherDiscount(req: Request, res: Response) {
    try {
      const user_id = res.locals.decript.id;
      const voucher = await prisma.voucher.findMany({
        where: {
          user_id,
          end_date: {
            gt: new Date(),
          },
        },
      });
      return res.status(200).send({ result: voucher });
    } catch (error) {
      console.log(error);
    }
  }

  async getPoin(req: Request, res: Response) {
    try {
      const usersId = res.locals.decript.id;
      const poin = await prisma.poin.findMany({
        where: {
          usersId,
          expiredAt: {
            gt: new Date(),
          },
        },
      });

      return res.status(200).send({ result: poin });
    } catch (error) {
      console.log(error);
    }
  }
}
