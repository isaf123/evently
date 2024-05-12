import { IUser, UserRole } from "@/interfaces/type";
import { NextFunction, Request, Response } from "express";

export const eventOrganizerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser | null = (req as any).user;

        // Jika pengguna adalah event organizer, lanjutkan
        if (res.locals.decript.role === UserRole.EventOrganizer) {
            return next();
        }

        // Jika pengguna bukan event organizer, kembalikan status tidak diizinkan
        return res.status(403).send('Not Allowed');
    } catch (error) {
        throw error
    }
}
export const customerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser | null = (req as any).user;
        console.log(res.locals.decript);


        // Jika pengguna adalah  customer, lanjutkan
        if (res.locals.decript.role === UserRole.Customer) {
            return next();
        }

        // Jika pengguna bukan customer, kembalikan status tidak diizinkan
        return res.status(403).send('Not Allowed');
    } catch (error) {
        throw error
    }
}

