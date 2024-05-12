import { getEvents } from '@/services/EO/event/getEvent';
import { Request, Response, NextFunction } from 'express';
import { createEvent, validationEvent } from '@/services/EO/event/createEvent';
import prisma from '@/prisma';

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
