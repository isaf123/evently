import prisma from '@/prisma';
import { createEvent } from '@/services/EO/event/createEvent';
import { deleteEvent } from '@/services/EO/event/deleteEvent';
import { getEvents } from '@/services/EO/event/getEvent';
import { NextFunction, Request, Response } from 'express';

export class EventEOController {
  async getEvents(req: Request, res: Response) {
    try {
      const { page = 1, pageSize = 5, q = '' } = req.query;
      const user_id = res.locals.decript.id;

      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);
      const searchQuery = q.toString();

      // Fetch events with search and pagination
      const findEvents = await prisma.masterEvent.findMany({
        where: {
          usersId: user_id,
          OR: [
            { title: { contains: searchQuery } },
            { description: { contains: searchQuery } },
          ],
        },
        skip,
        take,
        include: {
          user_id: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!findEvents.length) {
        return res.status(404).send({ message: "No events found" });
      }


      const totalEvents = await prisma.masterEvent.count({
        where: {
          usersId: user_id,
          OR: [
            { title: { contains: searchQuery } },
            { description: { contains: searchQuery } },
          ],
        },
      });

      const totalPages = Math.ceil(totalEvents / Number(pageSize));

      return res.status(200).send({
        result: findEvents,
        totalPages,
        totalEvents,
      });
    } catch (error: any) {
      return res.status(500).send({ error: error.message });
    }
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
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

      console.log('ini event id ke', eventId);

      const userId = res.locals.decript.id

      const event = await prisma.masterEvent.findUnique({
        where: {
          id: eventId
        }
      })

      if (!event) {
        return res.status(404).send({ message: 'Event not found' });
      }

      if (event.usersId !== userId) {
        return res.status(403).send({ message: 'Forbidden' });
      }

      // Hapus entitas terkait di tabel lain, misalnya di tabel 'transactions'
      await prisma.transaction.deleteMany({
        where: { event_id: eventId },
      });

      // Delete the event
      await prisma.masterEvent.delete({
        where: { id: eventId },
      });

      return res.status(200).send({ message: 'Event deleted successfully!' });

    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}
