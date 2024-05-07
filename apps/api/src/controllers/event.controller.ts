import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { createEvent } from '@/services/event/createEvent';

export class EventController {
  async createNewEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userRole = res.locals.decript.role;
      const usersId = res.locals.decript.id;
      if (userRole != 'eo') {
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
        category_id,
        price,
        location,
        code_event,
        address,
      } = req.body;

      const newevent = await createEvent({
        flyer_event,
        title,
        start_date,
        end_date,
        description,
        category,
        available_seat,
        event_type,
        category_id,
        price,
        location,
        code_event,
        address,
        usersId,
      });
      return res.status(200).send({
        rc: 400,
        success: true,
        message: 'Add New Event Success',
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const allEvent = await prisma.masterEvent.findMany();
      if (allEvent) {
      }
    } catch (error) {
      console.log(error);
    }
  }
  async createLocation(req: Request, res: Response, next: NextFunction) {
    try {
      // const  = req.body;
      // await prisma.masterEvent.create();
      return res.status(200).send({ success: 'success' });
    } catch (error) {
      next(error);
    }
  }

  // async getLocation(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const event = await prisma.masterLocation.findMany();
  //     return res.status(200).send({
  //       message: event,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
