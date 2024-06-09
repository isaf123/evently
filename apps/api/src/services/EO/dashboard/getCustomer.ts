import prisma from '@/prisma';
import { addDay } from '@/utils/convertDate';

export const getCustomer = async (
  eventId: number[],
  from: string,
  to: string,
) => {
  try {
    const where: any = {
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

    const findCust = await prisma.transaction.groupBy({
      by: ['user_id'],
      where,
    });

    return {
      title: 'Customer',
      data: `${findCust.length}`,
      desc: 'Customer with active transaction',
    };
  } catch (error) {
    throw error;
  }
};
