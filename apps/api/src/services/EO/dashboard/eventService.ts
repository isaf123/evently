import prisma from '@/prisma';
import { addDay } from '@/utils/convertDate';

export const countUpcomingEvents = async (
  usersId: number,
  from?: string,
  to?: string,
) => {
  try {
    const today = new Date();

    const where: any = {
      usersId,
    };

    const totalEvent = await prisma.masterEvent.count({ where });

    const upcomingEvents = await prisma.masterEvent.count({
      where: {
        start_date: { gt: today },
        usersId,
      },
    });

    const endEvent = await prisma.masterEvent.count({
      where: {
        start_date: { lt: today },
        usersId,
      },
    });
    return {
      title: 'Your Events',
      data: `${totalEvent}`,
      desc: `Ongoing : ${upcomingEvents}, Finished : ${endEvent}`,
    };
  } catch (error) {
    throw error;
  }
};
