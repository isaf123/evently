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
        },
      });
      console.log(usersId);
      return res.status(201).send({
        rc: 201,
        success: true,
        result: createPromo,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
