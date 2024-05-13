import prisma from "@/prisma"

export const getEvents = async (data: any, offset: number, limit: number) => {
    try {
        const events = await prisma.masterEvent.findMany({
            where: { usersId: data },
            include: {
                user_id: {
                    select: {
                        name: true
                    }
                }
            },
            skip: offset,
            take: limit
        })
        console.log('data events', events);
        return events
    } catch (error) {
        throw error
    }
}