import { getEvents } from "@/services/EO/event/getEvent";
import { Request, Response } from "express";

export class EventEOController {
    async getEvents(req: Request, res: Response) {
        try {
            const { query = '', page = 1 } = req.query; // Mengambil query dan page dari request

            // Panggil fungsi getEvents dengan query, page, dan pageSize yang diterima
            const events = await getEvents(String(query), Number(page), 10); // Jumlah item per halaman disetel menjadi 10

            return res.status(200).send(events);
        } catch (error) {
            return res.status(500).send({ error });
        }
    }
}