import prisma from "@/prisma";

export const getEvents = async (userId: number, query: string, page: number, pageSize: number) => {
    try {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const events = await prisma.masterEvent.findMany({
            where: {
                usersId: userId,
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                ],
            },
            include: {
                user_id: {
                    select: {
                        name: true,
                    },
                },
            },
            skip,
            take,
        });

        const totalEvents = await prisma.masterEvent.count({
            where: {
                usersId: userId,
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                ],
            },
        });

        const totalPages = Math.ceil(totalEvents / pageSize);

        return {
            result: events,
            totalPages,
            totalEvents,
        };
    } catch (error) {
        throw error;
    }
};
