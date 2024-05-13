import prisma from "@/prisma"

export const deleteEvent = async (userId: number) => {
    try {
        const event = await prisma.masterEvent.delete({
            where: { id: userId }
        })
        return event
    } catch (error) {
        throw error
    }
}