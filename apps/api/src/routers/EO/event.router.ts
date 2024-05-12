import { EventEOController } from '@/controllers/EO/event.controller';
import { eventOrganizerMiddleware } from '@/middleware/authMiddleware';
import { verifyToken } from '@/middleware/verifiedToken';
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
        this.router.get('/event', verifyToken, this.eventController.getEvents);
        this.router.post('/event/create', verifyToken, eventOrganizerMiddleware, this.eventController.createEvent);

    }

    getRouter(): Router {
        return this.router;
    }
}