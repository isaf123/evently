import prisma from "@/prisma"

export const deleteEvent = async (userId: number, data: any) => {
    try {
        const event = await prisma.masterEvent.delete({
            where: {
                id: userId,
                usersId: data
            }
        })
        return event
    } catch (error) {
        throw error
    }
}