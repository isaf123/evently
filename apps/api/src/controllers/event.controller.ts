import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export class EventController {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }
  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.masterEvent.findMany();
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

  async getLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await prisma.masterLocation.findMany();
      return res.status(200).send({
        message: event,
      });
    } catch (error) {
      next(error);
    }
  }
}
