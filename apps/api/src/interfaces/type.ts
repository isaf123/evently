export enum UserRole {
  Customer = 'customers',
  EventOrganizer = 'eo',
}

// Interface untuk data pengguna
export interface IUser {
  role: UserRole; // Properti 'role' dari tipe UserRole
}
