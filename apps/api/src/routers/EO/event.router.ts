import { EventEOController } from '@/controllers/EO/event.controller';

import { eventOrganizerMiddleware } from '@/middleware/authMiddleware';

import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';
import { uploader } from '@/middleware/uploader';

export class EventEORouter {
  private router: Router;
  private eventController: EventEOController;

  constructor() {
    this.router = Router();
    this.eventController = new EventEOController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/event', verifyToken, eventOrganizerMiddleware, this.eventController.getEvents);
    this.router.post(
      '/',
      verifyToken, eventOrganizerMiddleware,
      uploader('/eventpic', 'EVENTPIC').array('flyer_event'),
      this.eventController.createEvent,
    );
  }


  getRouter(): Router {
    return this.router;
  }
}
