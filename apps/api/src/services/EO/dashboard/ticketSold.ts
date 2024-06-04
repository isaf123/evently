import prisma from '@/prisma';

export const getTicketSold = async (eventId: number[]) => {
  try {
    const ticketSold = await prisma.transaction.count({
      where: { status_transaction: 'paid', event_id: { in: eventId } },
    });

    const date = await prisma.transaction.findFirst({
      orderBy: [{ date_transaction: 'desc' }],
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
      data: `+${ticketSold}`,
      desc: `since : ${newDate}`,
    };
  } catch (error) {
    throw error;
  }
};
