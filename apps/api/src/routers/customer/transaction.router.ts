import { TransactionUserController } from '@/controllers/customer/transaction.controller';
import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';
import { uploader } from '@/middleware/uploader';
import { validationReceipt } from '@/middleware/receiptValidator';
import { customerMiddleware } from '@/middleware/authMiddleware';

export class TransactionUserRouter {
  private router: Router;
  private transactionUserController: TransactionUserController;

  constructor() {
    this.router = Router();
    this.transactionUserController = new TransactionUserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.patch(
      '/upload',
      verifyToken,
      customerMiddleware,
      uploader('/receipt', 'RECEIPT').array('imgTransaction'),
      validationReceipt,
      this.transactionUserController.uploadTransferPic,
    );

    this.router.patch(
      '/pending',
      verifyToken,
      this.transactionUserController.pendingPayment,
    );

    this.router.patch(
      '/update',
      verifyToken,
      this.transactionUserController.updateStatusTrans,
    );

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
    this.router.get(
      '/details',
      verifyToken,
      this.transactionUserController.transactionDetailsCust,
    );
    this.router.post(
      '/',
      verifyToken,
      customerMiddleware,
      this.transactionUserController.createTransaction,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
