import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export class PromoEventController {
  async createPromo(req: Request, res: Response) {
    try {
      console.log('promo');
      const usersId = res.locals.decript.id;
      const { name_voucher, discount, start_date, end_date, event_id } =
        req.body;
      const createPromo = await prisma.voucher.create({
        data: {
          name_voucher,
          discount,
          start_date,
          end_date,
          event_id,
          user_id: null,
        },
      });
      return res.status(201).send({
        rc: 201,
        success: true,
        result: createPromo,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getPromo(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const findPromo = await prisma.masterEvent.findMany({
        where: { id, usersId: res.locals.decript.id },
        select: { Vouchers: true },
      });
      return res.status(200).send(findPromo);
    } catch (error) {
      console.log(error);
    }
  }
}
