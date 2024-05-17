import prisma from "@/prisma"
import { Response } from "express";

export const createTransactionForCustomer = async (date_transaction: string, invoice_code: string, event_id: number, total_price: number, voucher_id: number, ticket_count: number, price_after_discount: number, userId: any, point_discount?: number, voucher_discount?: number,) => {
    try {
        const trans = await prisma.transaction.create({
            data: {
                date_transaction,
                invoice_code,
                event_id,
                total_price,
                status_transaction: 'submitted',
                voucherId: voucher_id || null, // Handle null for optional voucherId
                ticket_count,
                point_discount: point_discount || 0,
                price_after_discount,
                voucher_discount: voucher_discount || 0,
                user_id: userId,
            },
        });

        return trans;
    } catch (error) {
        throw error
    }
}