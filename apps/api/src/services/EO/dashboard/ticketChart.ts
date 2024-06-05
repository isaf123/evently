import prisma from '@/prisma';

export const getTicketChart = async (eventId: number[]) => {
  try {
    const trans = await prisma.transaction.findMany({
      orderBy: [{ date_transaction: 'asc' }],
      where: { status_transaction: 'paid', event_id: { in: eventId } },
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
