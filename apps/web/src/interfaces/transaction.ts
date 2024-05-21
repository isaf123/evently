export interface ITransaction {
    id: number,
    invoice_code: string,
    event_title: string
    user_name: string,
    img_payment: string
    status_transaction: string,
    date_transaction: string
}

export enum status_transaction {
    "submitted",
    "pending",
    "paid"
}