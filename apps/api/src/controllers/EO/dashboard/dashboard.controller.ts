import { countUpcomingEvents } from '@/services/EO/dashboard/eventService';
import { getTotalRevenue } from '@/services/EO/dashboard/totalRevenue';
import { getTicketSold } from '@/services/EO/dashboard/ticketSold';
import { getCustomer } from '@/services/EO/dashboard/getCustomer';
import { getTicketChart } from '@/services/EO/dashboard/ticketChart';
import { Request, Response } from 'express';
import prisma from '@/prisma';

export class DashboardEOController {
  async ticketChart(req: Request, res: Response) {
    try {
      const usersId = res.locals.decript.id;
      const eventId = await prisma.masterEvent.findMany({
        select: { id: true },
        where: { usersId },
      });

      const newArr = eventId.map((val) => {
        return val.id;
      });

      const data = await getTicketChart(newArr);

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async getStatInfo(req: Request, res: Response) {
    try {
      const usersId = res.locals.decript.id;
      const event = await prisma.masterEvent.findMany({
        select: { id: true },
        where: { usersId },
      });

      const newArr = event.map((val) => {
        return val.id;
      });
      const soldTicket = await getTicketSold(newArr);
      const upcomingEvent = await countUpcomingEvents(usersId);
      const totalRevenue = await getTotalRevenue(newArr);
      const customer = await getCustomer(newArr);

      return res
        .status(200)
        .send([totalRevenue, soldTicket, upcomingEvent, customer]);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async RevenueChart(req: Request, res: Response) {
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
}
