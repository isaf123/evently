import prisma from '@/prisma';
import { Ievent } from '@/services/EO/event/type';
import { Response, Request, NextFunction } from 'express';
import fs from 'fs';
import { join } from 'path';
import { Users } from '.prisma/client';
import multer from 'multer';

export const validationEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      available_seat,
      event_type,
      price,
      start_date,
      end_date,
      max_ticket,
    } = req.body;
    const findEvent = await prisma.masterEvent.findFirst({
      where: { title },
    });

    if (findEvent) {
      throw 'event already exisst';
    }
    console.log('seat:', available_seat);
    console.log('CHEEEEEECKKKK:', Number.isInteger(available_seat));

    if (
      available_seat < 1 ||
      isNaN(available_seat) ||
      Number.isInteger(available_seat)
    ) {
      throw 'invalid max seat';
    }

    if (max_ticket < 1 || isNaN(max_ticket)) {
      throw 'invalid max ticket';
    }

    if (
      (event_type == 'paid' && price < 100) ||
      (event_type == 'free' && price > 0)
    ) {
      throw 'invalid price';
    }

    const start = new Date(start_date);
    const end = new Date(end_date);
    if (
      start.getTime() > end.getTime() ||
      start.getTime() < new Date().getTime()
    ) {
      throw 'invalid date';
    }

    const files = req.files as Express.Multer.File[];
    const pic = files[0].filename;
    if (pic) {
      const split = pic?.split('.');
      console.log(split[split.length - 1]);
      if (
        !(split[split.length - 1] == 'jpg' || split[split.length - 1] == 'png')
      ) {
        throw 'invalid picture';
      }
    }

    return next();
  } catch (error) {
    console.log(error);
    const files = req.files as Express.Multer.File[];
    fs.unlinkSync(
      join(__dirname, '../../public/eventpic', `/${files[0].filename}`),
    );
    return res.status(400).send(error);
  }
};
