import prisma from '@/prisma';

export const getCustomer = async (eventId: number[]) => {
  try {
    const findCust = await prisma.transaction.groupBy({
      by: ['user_id'],
      where: { event_id: { in: eventId } },
    });
    console.log(findCust.length);

    return {
      title: 'Customer',
      data: `+${findCust.length}`,
      desc: 'Customer with active transaction',
    };
  } catch (error) {
    throw error;
  }
};
