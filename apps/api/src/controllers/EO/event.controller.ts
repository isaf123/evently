import { getEvents } from "@/services/EO/event/getEvent";
import { Request, Response } from "express";

export class EventEOController {
    async getEvents(req: Request, res: Response,) {
        try {
            // Panggil fungsi getEvents dengan query, page, dan pageSize yang diterima
            const query = req.query.q as string;
            console.log('hasil query', req.query);

            const events = await getEvents(query); // Jumlah item per halaman disetel menjadi 10

            return res.status(200).send(events);
        } catch (error) {
            return res.status(500).send({ error });
        }
    }
}