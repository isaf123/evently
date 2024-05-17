import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class EventController {
  async getEventDetails(req: Request, res: Response) {
    try {
      const currentDatePlus = new Date();
      const currentDateMin = new Date();
      currentDatePlus.setDate(currentDatePlus.getDate() + 1);
      currentDateMin.setDate(currentDateMin.getDate() - 1);
      const toISOStringplus = currentDatePlus.toISOString();
      const toISOStringMin = currentDateMin.toISOString();
      const title = req.params.title.split('-').join(' ');

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
        rc: 200,
        success: true,
        result: getEvent,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async getMaxBuy(req: Request, res: Response) {
    try {
      const title = req.params.title.split('-').join(' ');
      const getEvent = await prisma.masterEvent.findFirst({
        where: {
          title,
        },
      });

      const countTransaction = await prisma.transaction.aggregate({
        _sum: {
          ticket_count: true,
        },
        where: {
          event_id: getEvent?.id,
          user_id: res.locals.decript.id,
        },
      });

      return res.status(200).send(countTransaction);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async getAllEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, pageSize } = req.query;

      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(page) * Number(pageSize);
      const allEvent = await prisma.masterEvent.findMany({
        orderBy: [{ id: 'desc' }],
        skip,
        take,
        where: {
          end_date: { gt: new Date() },
        },
        select: {
          title: true,
          start_date: true,
          end_date: true,
          price: true,
          flyer_event: true,
        },
      });
      // console.log(allEvent);
      const totalEvent = await prisma.masterEvent.count();
      const totalPage = Math.ceil(totalEvent / Number(pageSize));
      console.log(totalPage);

      return res
        .status(200)
        .send({ rc: 200, success: true, result: allEvent, totalPage });
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
