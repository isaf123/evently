import prisma from "@/prisma"

export const associateReferral = async (referrerCode: string, referredUserId: number) => {
    try {
        // Ambil data pengguna yang mereferensikan
        const referrer = await prisma.users.findFirst({
            where: {
                referral_code: {
                    equals: referrerCode,
                }
            }
        });

        console.log(referrer);

    } catch (error) {
        throw error
    }
}