import prisma from '@/prisma';
import { addDay } from '@/utils/convertDate';

export const getTotalRevenue = async (
  eventId: number[],
  from: string,
  to: string,
) => {
  try {
    const where: any = {
      event_id: { in: eventId },
      status_transaction: 'paid',
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

    const getRevenue = await prisma.transaction.aggregate({
      _sum: { price_after_discount: true },
      where,
    });

    if (!getRevenue._sum.price_after_discount) {
      return {
        title: 'Total Revenue',
        data: null,
        desc: 'Revenue from your all events',
      };
    }
    const rupiah = getRevenue._sum.price_after_discount.toLocaleString(
      'id-ID',
      {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      },
    );

    return {
      title: 'Total Revenue',
      data: rupiah,
      desc: 'Revenue from your all events',
    };
  } catch (error) {
    throw error;
  }
};
