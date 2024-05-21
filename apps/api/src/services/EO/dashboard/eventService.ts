import prisma from "@/prisma"

export const countUpcomingEvents = async () => {
    try {
        const today = new Date()
        const countEvents = await prisma.masterEvent.count({
            where: {
                start_date: {
                    gt: today
                },
            }
        })
        return countEvents
    } catch (error) {
        throw error
    }
}