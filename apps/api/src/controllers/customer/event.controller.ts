import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { createEvent } from '@/services/EO/event/createEvent';

import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';

export class EventController {
  async getEventDetails(req: Request, res: Response) {
    const currentDatePlus = new Date();
    const currentDateMin = new Date();
    currentDatePlus.setDate(currentDatePlus.getDate() + 1);
    currentDateMin.setDate(currentDateMin.getDate() - 1);
    const toISOStringplus = currentDatePlus.toISOString();
    const toISOStringMin = currentDateMin.toISOString();
    try {
      const title = req.params.title.split('-').join(' ');
      console.log(new Date());

      const getEvent = await prisma.masterEvent.findFirst({
        where: {
          title,
        },
        include: {
          Vouchers: {
            where: {
              end_date: { gt: toISOStringMin },
              start_date: { lt: toISOStringplus },
            },
          },
        },
      });

      if (!getEvent) {
        throw 'event not exist';
      }

      return res.status(200).send({
        rc: 201,
        success: true,
        result: getEvent,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async getAllEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const allEvent = await prisma.masterEvent.findMany({
        select: {
          title: true,
          start_date: true,
          end_date: true,
          price: true,
          flyer_event: true,
        },
      });
      return res.status(200).send(allEvent);
    } catch (error) {
      next(error);
    }
  }

  async debounceSearch(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.params.title;
      const getdata = await prisma.masterEvent.findMany({
        where: { title: { contains: search } },
        select: {
          title: true,
          start_date: true,
          end_date: true,
          price: true,
          flyer_event: true,
        },
      });
      return res.status(200).send({
        rc: 200,
        success: true,
        result: getdata,
      });
    } catch (error) {
      next(error);
    }
  }
}
