import prisma from "@/prisma"

export const getEvents = async (q: string) => {
    try {
        const events = await prisma.masterEvent.findMany({
            where: {

                OR: [
                    {
                        title: {
                            contains: q,
                        }
                    },
                    {
                        user_id: {
                            name: {
                                contains: q
                            }
                        }
                    }
                ]
            },
            include: {
                user_id: {
                    select: {
                        name: true
                    }
                }
            },
        })
        return events
    } catch (error) {
        throw error
    }
}