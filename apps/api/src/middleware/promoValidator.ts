import prisma from '@/prisma';
import { Ievent } from '@/services/EO/event/type';
import { Response, Request, NextFunction } from 'express';
import fs from 'fs';
import { join } from 'path';
import { Users } from '.prisma/client';
import multer from 'multer';

export const validationPromo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.body);
    const { name_voucher, discount, start_date, end_date, event_id } = req.body;

    const findevent = await prisma.masterEvent.findUnique({
      where: { id: event_id },
    });

    const startPromo = new Date(start_date).getTime();
    const endPromo = new Date(end_date).getTime();

    if (startPromo > endPromo || startPromo < new Date().getTime()) {
      throw 'invalid promo date';
    }

    if (findevent) {
      const startEvent = new Date(findevent.start_date).getTime();
      const endtEvent = new Date(findevent.end_date).getTime();
      if (startPromo > startEvent || endtEvent) {
        throw 'invalid ';
      }
    }

    console.log(findevent);
    if (isNaN(discount) || discount > 100 || discount < 1) {
      throw 'invalid discount';
    }

    return next();
  } catch (error) {
    return res.status(400).send(error);
  }
};
