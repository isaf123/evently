import { countUpcomingEvents } from "@/services/EO/dashboard/eventService";
import { NextFunction, Request, Response } from "express";

export class DashboardEOController {
    async getUpcomingEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const countEvents = await countUpcomingEvents()
            console.log('hasil count', countEvents);
            return res.status(200).send({
                count: countEvents
            })
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}