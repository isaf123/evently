export interface ITransaction {
    id: number,
    invoice_code: string,
    event: {
        title: string
    },
    user: {
        name: string
    }
    status_transaction: string,
    date_transaction: string
}

export enum status_transaction {
    "submitted",
    "pending",
    "paid"
}