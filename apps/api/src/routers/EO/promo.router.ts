import { PromoEventController } from '@/controllers/EO/promo.controller';
import { eventOrganizerMiddleware } from '@/middleware/authMiddleware';
import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';
import { uploader } from '@/middleware/uploader';

export class PromoEventRouter {
  private router: Router;
  private promoEventController: PromoEventController;

  constructor() {
    this.router = Router();
    this.promoEventController = new PromoEventController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      verifyToken,
      eventOrganizerMiddleware,
      this.promoEventController.createPromo,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
