import prisma from "@/prisma"

export const getEvents = async (data: any, query: string) => {
    try {
        const events = await prisma.masterEvent.findMany({
            where: {
                usersId: data,
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                ],
            },

            include: {
                user_id: {
                    select: {
                        name: true
                    }
                }
            },
        })
        // console.log('data events', events);
        return events
    } catch (error) {
        throw error
    }
}