import prisma from "@/prisma";
import { createEvent } from "@/services/EO/event/createEvent";
import { getEvents } from "@/services/EO/event/getEvent";
import { NextFunction, Request, Response } from "express";
export class EventEOController {
    async getEvents(req: Request, res: Response,) {
        try {
            const events = await getEvents(res.locals.decript.id);

            return res.status(200).send(events);
        } catch (error) {
            return res.status(500).send({ error });
        }
    }

    async createEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const userRole = res.locals.decript.role;
            const usersId = res.locals.decript.id;

            const {
                flyer_event,
                title,
                start_date,
                end_date,
                description,
                category,
                available_seat,
                event_type,
                price,
                location,
                address,
            } = req.body;

            const findEventName = await prisma.masterEvent.findFirst({
                where: { title: title },
            });

            if (findEventName) {
                return res.status(400).send('Event already exists')
            }

            const newevent = await createEvent({
                flyer_event,
                title,
                start_date,
                end_date,
                description,
                category,
                available_seat,
                event_type,
                price,
                location,
                address,
                usersId,
            });
            return res.status(201).send('Event Added Successfully');
            // console.log('oke');
        } catch (error) {
            return res.status(500).send({ error });
        }
    }
}