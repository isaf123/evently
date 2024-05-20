export enum UserRole {
  Customer = 'customers',
  EventOrganizer = 'eo',
}

// Interface untuk data pengguna
export interface IUser {
  role: UserRole; // Properti 'role' dari tipe UserRole
}


export interface ITransaction {
  id: number;
  invoice_code: string;
  event: {
    title: string;
  };
  user: {
    name: string;
  };
  status_transaction: TransactionStatus;
  date_transaction: string;
}

export enum TransactionStatus {
  submitted = "submitted",
  pending = "pending",
  paid = "paid"
}