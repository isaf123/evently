import prisma from "@/prisma"

export const updateLoginAttempt = async (userId: number, newAttemp: number) => {
    try {
        const user = await prisma.users.update({
            where: { id: userId },
            data: {
                tryLogin: newAttemp
            }
        })
        return user
    } catch (error) {
        throw error
    }
}