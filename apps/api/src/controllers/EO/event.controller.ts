import prisma from '@/prisma';
import { createEvent } from '@/services/EO/event/createEvent';
import { deleteEvent } from '@/services/EO/event/deleteEvent';
import { getEvents } from '@/services/EO/event/getEvent';
import { NextFunction, Request, Response } from 'express';
export class EventEOController {
  async getEvents(req: Request, res: Response) {
    try {
      const { query = '' } = req.query;

      const events = await getEvents(res.locals.decript.id, query as string);

      return res.status(200).send(events);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userRole = res.locals.decript.role;
      const usersId = res.locals.decript.id;

      const files = req.files as Express.Multer.File[];
      if (files.length === 0) {
        return res.status(400).send({ message: 'No file uploaded' });
      }
      const newEvent = await createEvent(req.body, files[0].filename, usersId);

      return res.status(201).send({
        rc: 201,
        success: true,
        message: 'Add new event success',
        result: newEvent,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = Number(req.params.id);

      // Hapus data utama di masterEvent
      const deleteEvent = await prisma.masterEvent.delete({
        where: {
          id: eventId,
        },
      });

      console.log('data event yang dihapus: ', deleteEvent);
      return res.status(200).send('Event Deleted Successfully!');

    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}
