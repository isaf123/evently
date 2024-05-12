import prisma from "@/prisma"

export const getEvents = async (data: any) => {
    try {
        const events = await prisma.masterEvent.findMany({
            where: { usersId: data },
            include: {
                user_id: {
                    select: {
                        name: true
                    }
                }

            }
        })
        console.log('data events', events);
        return events
    } catch (error) {
        throw error
    }
}