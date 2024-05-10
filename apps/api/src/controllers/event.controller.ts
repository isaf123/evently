import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { createEvent } from '@/services/EO/event/createEvent';

export class EventController {
  async tryEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userRole = res.locals.decript.role;
      const usersId = res.locals.decript.id;

      console.log('INIIIIIII ::', typeof usersId);

      if (userRole !== 'eo') {
        throw {
          rc: 400,
          success: false,
          message: 'no valid user',
        };
      }
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
        throw {
          rc: 400,
          success: false,
          message: 'event already exist',
        };
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
      return res.status(201).send({
        rc: 201,
        success: true,
        message: 'Add new event success',
        result: newevent,
      });
      // console.log('oke');
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  async getAllEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const allEvent = await prisma.masterEvent.findMany({
        select: {
          title: true,
          start_date: true,
          end_date: true,
          price: true,
          flyer_event: true,
        },
      });
      return res.status(200).send({
        rc: 200,
        success: true,
        result: allEvent,
      });
    } catch (error) {
      next(error);
    }
  }

  async debounceSearch(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.params.title;
      const getdata = await prisma.masterEvent.findMany({
        where: { title: { contains: search } },
        select: {
          title: true,
          start_date: true,
          end_date: true,
          price: true,
          flyer_event: true,
        },
      });
      return res.status(200).send({
        rc: 200,
        success: true,
        result: getdata,
      });
    } catch (error) {
      next(error);
    }
  }
}
