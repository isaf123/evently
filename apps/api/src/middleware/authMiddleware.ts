import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./verifiedToken";

export enum UserRole {
    Customer = "customer",
    EventOrganizer = "event-organizer"
}

// Interface untuk data pengguna
export interface IUser {
    role: UserRole;
}
// Fungsi untuk memeriksa apakah pengguna memiliki akses ke rute tertentu
export const isAuthorized = (user: IUser | null, allowedRoles: UserRole[]): boolean => {
    if (!user) {
        return false;
    }
    return allowedRoles.includes(user.role);
};



// Middleware untuk melindungi rute tertentu
export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    // Dapatkan pengguna dari sesi atau autentikasi, bergantung pada implementasi aplikasi Anda
    const user: IUser | null = (req as any).user;

    // Jika pengguna memiliki akses, lanjutkan dengan verifikasi token
    if (isAuthorized(user, [UserRole.Customer, UserRole.EventOrganizer])) {
        // Lanjutkan dengan verifikasi token
        return verifyToken(req, res, next)
    }

    // Jika pengguna tidak diizinkan, arahkan ke halaman referer atau halaman utama jika tidak ada referer
    const referer = req.headers.referer || '/';
    res.redirect(referer);
};
