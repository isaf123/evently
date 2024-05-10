import prisma from "@/prisma"

export const getEvents = async (query: string, page: number, pageSize: number) => {
    try {
        const skip = (page - 1) * pageSize
        const events = await prisma.masterEvent.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query
                        }
                    },
                    {
                        user_id: {
                            name: {
                                contains: query
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
            skip, take: pageSize
        })
        return events
    } catch (error) {
        throw error
    }
}