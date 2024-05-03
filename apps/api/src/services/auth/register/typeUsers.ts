export interface IUser {
    id?: number
    name: string
    email: string
    password: string
    role: "eo" | "customers"
    referral_code?: string
    avatar_users?: string
}

export enum Role {
    EO = "eo",
    CUSTOMER = "customers"
}
