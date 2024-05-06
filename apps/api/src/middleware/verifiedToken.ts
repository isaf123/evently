import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log("from header req", req.header("Authorization"));
        // console.log(res.locals.decript);

        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            throw new Error("Token not found!");
        }

        const checkToken = verify(token, process.env.TOKEN_KEY || "secret")

        // Meneruskan data hasil terjemahan token ke middleware berikutnya
        res.locals.decript = checkToken
        next();
    } catch (error) {
        next(error)
    }
}