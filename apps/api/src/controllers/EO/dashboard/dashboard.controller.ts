import { countUpcomingEvents } from '@/services/EO/dashboard/eventService';
import { getPendingPayment } from '@/services/EO/dashboard/getPendingPayment';
import { getTicketSold } from '@/services/EO/dashboard/ticketSold';
import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';

export class DashboardEOController {
  async getUpcomingEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const countEvents = await countUpcomingEvents();
      console.log('hasil count', countEvents);
      return res.status(200).send({
        count: countEvents,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async getTotalRevenue(req: Request, res: Response) {
    try {
      const { from, to } = req.query;
      console.log('check:', from);
      const usersId = res.locals.decript.id;
      const getEvent = await prisma.masterEvent.findMany({
        select: { id: true },
        where: { usersId },
      });

      const newArr = getEvent.map((val) => {
        return val.id;
      });

      const getTransaction = await prisma.transaction.findMany({
        orderBy: [{ date_transaction: 'asc' }],
        select: { price_after_discount: true, date_transaction: true },
        where: {
          event_id: {
            in: newArr,
          },
          date_transaction: {
            lte: new Date(String(to)),
            gte: new Date(String(from)),
          },
          status_transaction: 'paid',
        },
      });

      const newTrans = getTransaction.map((val) => {
        const date = new Date(val.date_transaction);
        return {
          price: val.price_after_discount,
          date: date.toISOString().split('T')[0],
        };
      });

      const detailTrans = newTrans.reduce((acc: any, { price, date }) => {
        if (!acc[date]) {
          acc[date] = { date, price: 0 };
        }
        acc[date].price += price;
        return acc;
      }, {});

      const arrTrans = Object.values(detailTrans);

      const totalTransaction = await prisma.transaction.aggregate({
        _sum: {
          price_after_discount: true,
        },
        where: {
          event_id: {
            in: newArr,
          },
          date_transaction: {
            lte: new Date(String(to)),
            gte: new Date(String(from)),
          },
          status_transaction: 'paid',
        },
      });

      return res
        .status(200)
        .send({ total: totalTransaction, detail: arrTrans });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async getPendingPaymen(req: Request, res: Response) {
    try {
      const countPayment = await getPendingPayment();
      return res.status(200).send({
        count: countPayment,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async getTicketSold(req: Request, res: Response) {
    try {
      const countTicketSold = await getTicketSold();
      return res.status(200).send({
        count: countTicketSold,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
