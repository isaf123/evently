import prisma from '@/prisma';

export const getTotalRevenue = async (eventId: number[]) => {
  try {
    const getRevenue = await prisma.transaction.aggregate({
      _sum: {
        price_after_discount: true,
      },
      where: {
        event_id: { in: eventId },
        status_transaction: 'paid',
      },
    });

    if (!getRevenue._sum.price_after_discount) {
      return 'error';
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
