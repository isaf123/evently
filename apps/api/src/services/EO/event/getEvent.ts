import prisma from "@/prisma"

export const getEvents = async () => {
    try {
        const events = await prisma.masterEvent.findMany({
            include: {
                user_id: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return events
    } catch (error) {
        throw error
    }
}