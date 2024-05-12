import { Router } from 'express';
import { EventPicController } from '@/controllers/EO/eventpic.controller';
import { uploader } from '@/middleware/uploader';

export class EventPicRouter {
  private router: Router;
  private eventPicController: EventPicController;

  constructor() {
    this.router = Router();
    this.eventPicController = new EventPicController();
    this.initializeRoute();
  }

  private initializeRoute(): void {
    this.router.patch(
      '/photo/:id',
      uploader('/eventpic', 'EVENTPIC').single('eventPic'),
      this.eventPicController.eventImg,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
