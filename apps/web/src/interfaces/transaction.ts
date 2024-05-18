export interface ITransaction {
    invoice_code: string,
    event_id: {
        event_name: string
    },
    user_id: {
        name: string
    }
    status_transaction: status_transaction,
    date_transaction: Date
}

export enum status_transaction {
    "submitted",
    "pending",
    "paid"
}