export enum UserRole {
    Customer = "customer",
    EventOrganizer = "eo"
}

// Interface untuk data pengguna
export interface IUser {
    role: UserRole; // Properti 'role' dari tipe UserRole
}