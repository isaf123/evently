import { VoucherUserController } from '@/controllers/customer/voucher.controller';
import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';

export class VoucherUserRouter {
  private router: Router;
  private voucherUserController: VoucherUserController;

  constructor() {
    this.router = Router();
    this.voucherUserController = new VoucherUserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyToken,
      this.voucherUserController.getVoucherDiscount,
    );
    this.router.get('/point', verifyToken, this.voucherUserController.getPoin);
  }

  getRouter(): Router {
    return this.router;
  }
}
