// import { AuthController } from '@/controllers/auth.controller';
import { EventController } from '@/controllers/customer/event.controller';
import { customerMiddleware } from '@/middleware/authMiddleware';
import { verifyToken } from '@/middleware/verifiedToken';

import { Router } from 'express';

export class EventCustRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.router = Router();
    this.eventController = new EventController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.eventController.getAllEvent);
    this.router.get('/detail/:title', this.eventController.getEventDetails);

    this.router.get(
      '/maxbuy/:title',
      verifyToken,
      this.eventController.getMaxBuy,
    );

    this.router.get('/filter', this.eventController.filterEvent);

    this.router.get('/:title', this.eventController.debounceSearch);
  }

  getRouter(): Router {
    return this.router;
  }
}
