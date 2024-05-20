// import { AuthController } from '@/controllers/auth.controller';
import { ReviewUserController } from '@/controllers/customer/review.controller';
import { verifyToken } from '@/middleware/verifiedToken';
import { customerMiddleware } from '@/middleware/authMiddleware';
import { Router } from 'express';

export class ReviewUserRouter {
  private router: Router;
  private reviewUserController: ReviewUserController;

  constructor() {
    this.router = Router();
    this.reviewUserController = new ReviewUserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyToken,
      customerMiddleware,
      this.reviewUserController.getTicket,
    );
    this.router.get(
      '/rate',
      verifyToken,
      customerMiddleware,
      this.reviewUserController.getReview,
    );
    this.router.post(
      '/',
      verifyToken,
      customerMiddleware,
      this.reviewUserController.uploadReview,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
