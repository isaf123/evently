import prisma from '@/prisma';
import { addDay } from '@/utils/convertDate';

export const getTicketSold = async (
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
      where.date_transaction.gte = new Date(String(from));
      where.date_transaction.lte = new Date(addDay(String(from)));
    }

    const ticketSold = await prisma.transaction.aggregate({
      where,
      _sum: { ticket_count: true },
    });
    const date = await prisma.transaction.findFirst({
      orderBy: [{ date_transaction: 'asc' }],
      select: { date_transaction: true },
      where: { status_transaction: 'paid', event_id: { in: eventId } },
    });
    if (!date) {
      return 'not found';
    }
    const newDate = new Date(date.date_transaction).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return {
      title: 'Ticket Sold',
      data: `${ticketSold._sum.ticket_count}`,
      desc: `since : ${newDate}`,
    };
  } catch (error) {
    throw error;
  }
};
