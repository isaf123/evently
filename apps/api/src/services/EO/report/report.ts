
import prisma from "@/prisma";

export const getTransactionsByDateRange = async (startDate: Date, endDate: Date) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                date_transaction: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                event: true,
                user: true
            },
        });
        return transactions;
    } catch (error: any) {
        throw new Error(`Error fetching transactions: ${error.message}`);
    }
};

export const getTransactionsChartByDateRange = async (startDate: Date, endDate: Date) => {
    try {
        const transactions = await prisma.transaction.groupBy({
            by: ['date_transaction'],
            _count: {
                id: true,
            },
            where: {
                date_transaction: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
        return transactions;
    } catch (error: any) {
        throw new Error(`Error fetching transactions chart data: ${error.message}`);
    }
};