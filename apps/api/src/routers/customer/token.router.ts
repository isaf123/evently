import { MidtransController } from '@/controllers/customer/token.controller';
import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';

export class MidtransRouter {
  private router: Router;
  private midTransController: MidtransController;

  constructor() {
    this.router = Router();
    this.midTransController = new MidtransController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.midTransController.createToken);
  }

  getRouter(): Router {
    return this.router;
  }
}
