import { TransactionUserController } from '@/controllers/customer/transaction.controller';
import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';

export class TransactionUserRouter {
  private router: Router;
  private transactionUserController: TransactionUserController;

  constructor() {
    this.router = Router();
    this.transactionUserController = new TransactionUserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyToken,
      this.transactionUserController.getVoucherDiscount,
    );
    this.router.get(
      '/point',
      verifyToken,
      this.transactionUserController.getPoin,
    );
    this.router.post(
      '/',
      verifyToken,
      this.transactionUserController.createTransaction,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
