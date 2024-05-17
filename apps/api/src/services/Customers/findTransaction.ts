import prisma from "@/prisma";

export const findTransactionFirst = async (date_transaction: string,
    invoice_code: string,
    event_id: number,
    total_price: number,
    voucher_id: number,
    ticket_count: number,
    price_after_discount: number,
    user_id: any,
) => {
    try {
        const existingTrans = await prisma.transaction.findFirst({
            where: {
                date_transaction,
                invoice_code,
                event_id,
                total_price,
                voucherId: voucher_id || undefined, // Handle optional voucherId
                ticket_count,
                price_after_discount,
                user_id,
            },
        });
        return existingTrans;
    } catch (error) {
        throw error
    }
}