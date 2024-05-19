import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export class ReviewUserController {
  // get active ticket
  async getTicket(req: Request, res: Response) {
    try {
      const getTicket = await prisma.transaction.findMany({
        orderBy: [{ id: 'desc' }],
        where: {
          user_id: res.locals.decript.id,
          status_transaction: 'paid',
          event: {
            end_date: {
              gt: new Date(),
            },
          },
        },
        include: {
          event: true,
        },
      });

      return res.status(200).send(getTicket);
    } catch (error) {
      return res.status(400).send('not found');
    }
  }
  //get review cart
  async getReview(req: Request, res: Response) {
    try {
      const allReviews = await prisma.transaction.findMany({
        orderBy: [{ date_transaction: 'asc' }],
        where: {
          user_id: res.locals.decript.id,
          status_transaction: 'paid',
          event: {
            end_date: {
              lt: new Date().toISOString(),
            },
          },
        },
        include: {
          event: {
            include: {
              reviews_event: true,
            },
          },
        },
      });

      const uniqueReviews = [];
      const seenEventIds = new Set();

      for (const review of allReviews) {
        if (!seenEventIds.has(review.event.id)) {
          uniqueReviews.push(review);
          seenEventIds.add(review.event.id);
        }
      }

      return res.status(200).send(uniqueReviews);
    } catch (error) {
      return res.status(400).send('not found');
    }
  }

  async uploadReview(req: Request, res: Response) {
    try {
      console.log(req.body);
      const { rating, event_id, review } = req.body;
      const user_id = res.locals.decript.id;
      console.log(user_id);

      if (!review) {
        throw 'Please input review';
      }

      if (!rating) {
        throw 'Please input rating';
      }

      const upload = await prisma.reviews_event.create({
        data: {
          rating,
          review,
          event_id,
          user_id: res.locals.decript.id,
        },
      });
      return res.status(200).send('Adding review success');
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
