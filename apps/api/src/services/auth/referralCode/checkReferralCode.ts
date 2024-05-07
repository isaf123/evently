import prisma from "@/prisma";
import { Users } from "@prisma/client";

export const checkReferralCode = async (referralCode: string): Promise<Users | null> => {
    try {
        const userWithReferralCode = await prisma.users.findFirst({
            where: { referral_code: referralCode }
        });

        console.log('user dengan referral code', userWithReferralCode);

        return userWithReferralCode;
    } catch (error) {
        throw error
    }
}