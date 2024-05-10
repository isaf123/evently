import { getEvents } from "@/services/EO/event/getEvent";
import { Request, Response } from "express";

export class EventEOController {
    async getEvents(req: Request, res: Response) {
        try {
            const events = await getEvents()

            return res.status(200).send(events)
        } catch (error) {
            return res.status(500).send({ error });
        }
    }
}