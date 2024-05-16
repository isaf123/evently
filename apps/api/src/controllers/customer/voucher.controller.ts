import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export class VoucherUserController {
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
