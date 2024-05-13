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

    const findPromo = await prisma.voucher.findFirst({
      where: { name_voucher },
    });

    if (findPromo) {
      throw 'promo already exist';
    }

    const findevent = await prisma.masterEvent.findUnique({
      where: { id: event_id },
    });

    if (!findevent) {
      throw 'event not found';
    }

    if (isNaN(discount) || discount > 99 || discount < 1) {
      throw 'invalid discount';
    }

    console.log(findevent);

    const startPromo = new Date(start_date).getTime();
    const endPromo = new Date(end_date).getTime();

    if (findevent) {
      const startEvent = new Date(findevent.start_date).getTime();
      const endtEvent = new Date(findevent.end_date).getTime();
      if (startPromo > startEvent || endPromo > startEvent) {
        console.log(startPromo > startEvent);
        throw 'invalid, cant exceed event date ';
      }
    }

    if (startPromo > endPromo || startPromo < new Date().getTime()) {
      throw 'invalid promo date';
    }

    return next();
  } catch (error) {
    return res.status(400).send(error);
  }
};
