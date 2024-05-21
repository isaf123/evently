import { countUpcomingEvents } from "@/services/EO/dashboard/eventService";
import { getPendingPayment } from "@/services/EO/dashboard/getPendingPayment";
import { getTicketSold } from "@/services/EO/dashboard/ticketSold";
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
            return res.status(500).send(error);
        }
    }

    async getPendingPaymen(req: Request, res: Response) {
        try {
            const countPayment = await getPendingPayment()
            return res.status(200).send({
                count: countPayment
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    async getTicketSold(req: Request, res: Response) {
        try {
            const countTicketSold = await getTicketSold()
            return res.status(200).send({
                count: countTicketSold
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}