import prisma from '@/prisma';
import { addDay } from '@/utils/convertDate';

export const getTicketChart = async (
  eventId: number[],
  from?: string,
  to?: string,
) => {
  try {
    const where: any = {
      status_transaction: 'paid',
      event_id: { in: eventId },
    };

    if (to && from) {
      where.date_transaction = {};
      if (from) {
        where.date_transaction.gte = new Date(from);
      }
      if (to) {
        where.date_transaction.lte = new Date(addDay(to));
      }
    }

    if (from && !to) {
      where.date_transaction = {};
      where.date_transaction.gte = new Date(from);
      where.date_transaction.lte = new Date(addDay(from));
    }

    const trans = await prisma.transaction.findMany({
      orderBy: [{ date_transaction: 'asc' }],
      where,
      select: { ticket_count: true, date_transaction: true },
    });

    const newTrans = trans.map((val) => {
      const date = new Date(val.date_transaction);
      return {
        ticket: val.ticket_count,
        date: date.toISOString().split('T')[0],
      };
    });

    const detailTrans = newTrans.reduce((acc: any, { ticket, date }) => {
      if (!acc[date]) {
        acc[date] = { date, ticket: 0 };
      }
      acc[date].ticket += ticket;
      return acc;
    }, {});
    const arrTrans = Object.values(detailTrans);

    return arrTrans;
  } catch (error) {
    throw error;
  }
};
