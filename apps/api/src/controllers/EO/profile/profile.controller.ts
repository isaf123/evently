import { NextFunction, Request, Response } from "express";

export class ProfileEOController {
    async updateProfileEO(req: Request, res: Response, next: NextFunction) {
        try {
            const id = res.locals.decript.id
            console.log('ini id ke', id);
            console.log('ini body dari update profile', req.body);
        } catch (error) {
            return res.status(500).send({ error });
        }
    }
}