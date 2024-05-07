// import { AuthController } from '@/controllers/auth.controller';
import { EventController } from '@/controllers/event.controller';
import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.router = Router();
    this.eventController = new EventController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', verifyToken, this.eventController.tryEvent);
    this.router.get('/', this.eventController.getAllEvent);
    this.router.get('/search/:title', this.eventController.debounceSearch);
  }

  getRouter(): Router {
    return this.router;
  }
}
