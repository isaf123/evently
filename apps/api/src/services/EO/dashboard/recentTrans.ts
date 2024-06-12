import prisma from '@/prisma';

export const getRecentTrans = async (usersId: number) => {
  try {
    const recentTrans = await prisma.masterEvent.findMany({
      select: { id: true },
      where: { usersId },
    });

    const newArr = recentTrans.map((val) => {
      return val.id;
    });

    const data = await prisma.transaction.findMany({
      skip: 0,
      take: 5,
      where: { event_id: { in: newArr } },
      select: {
        date_transaction: true,
        user: { select: { name: true } },
        price_after_discount: true,
      },
      orderBy: [{ date_transaction: 'desc' }],
    });

    return data;
  } catch (error) {
    throw error;
  }
};
