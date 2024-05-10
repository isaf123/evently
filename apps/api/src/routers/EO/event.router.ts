import { EventEOController } from '@/controllers/EO/event.controller';
import { Router } from 'express';

export class EventEORouter {
    private router: Router;
    private eventController: EventEOController;

    constructor() {
        this.router = Router();
        this.eventController = new EventEOController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/event', this.eventController.getEvents);
    }

    getRouter(): Router {
        return this.router;
    }
}