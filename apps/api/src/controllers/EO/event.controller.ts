import prisma from '@/prisma';
import { createEvent, validationEvent } from '@/services/EO/event/createEvent';
import { getEvents } from '@/services/EO/event/getEvent';
import { NextFunction, Request, Response } from 'express';
export class EventEOController {
  async getEvents(req: Request, res: Response) {
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

      const files = req.files as Express.Multer.File[];
      const validation = await validationEvent(
        req.body,
        files[0].filename,
        usersId,
      );

      if (validation) {
        throw validation;
      }

      const newEvent = await createEvent(req.body, files[0].filename, usersId);

      return res.status(201).send({
        rc: 201,
        success: true,
        message: 'Add new event success',
        result: newEvent,
      });

      // console.log('oke');
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
