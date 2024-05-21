// interfaces/report.ts
export interface TransactionData {
    id: number;
    invoice_code: string;
    date_transaction: string;
    status_transaction: string;
    masterEvent: {
        id: number;
        title: string;
        user_id: {
            name: string;
        };
    };
}
