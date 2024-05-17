import prisma from "@/prisma"

export const getVoucherDiscount = async (userId: any) => {
    try {
        const getVoucherDiscountForCustomer = await prisma.voucher.findMany({
            where: {
                user_id: userId,
                end_date: {
                    gt: new Date
                }
            }
        })

        return getVoucherDiscountForCustomer
    } catch (error) {
        throw error
    }
}