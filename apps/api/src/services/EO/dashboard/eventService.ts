import prisma from '@/prisma';

export const countUpcomingEvents = async (usersId: number) => {
  try {
    const today = new Date();
    const totalEvent = await prisma.masterEvent.count({
      where: { usersId },
    });

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

    console.log(upcomingEvents);
    console.log(endEvent);
    return {
      title: 'Your Events',
      data: `${totalEvent}`,
      desc: `Ongoing : ${upcomingEvents}, Finished : ${endEvent}`,
    };
  } catch (error) {
    throw error;
  }
};
