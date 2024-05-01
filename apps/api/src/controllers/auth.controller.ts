import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class AuthController {
    // Task 1: Doing Register
    async registerUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password, role, referralCode } = req.body
            console.log('ini data register', req.body);

            // Validasi dari masing-masing field kosong
            if (!req.body) {
                return res.status(404)
            }


            const newUsers = await prisma.users.create({
                data: {
                    name: username,
                    email: email,
                    password: password,
                    avatar_users: null,
                    role: role,
                    referral_code: referralCode || null,
                }
            })

            return res.status(201).send(newUsers)
        } catch (error) {
            next(error)
        }
    }
}