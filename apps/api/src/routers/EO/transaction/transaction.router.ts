import { eventOrganizerMiddleware } from '@/middleware/authMiddleware';
import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';
import { TransactionEOController } from '@/controllers/EO/transaction/transaction.controller';

export class TransactionEORouter {
    private router: Router;
    private transactionEOController: TransactionEOController;

    constructor() {
        this.router = Router();
        this.transactionEOController = new TransactionEOController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            '/transaction',
            verifyToken,
            eventOrganizerMiddleware,
            this.transactionEOController.getTransactionEO,
        );
        this.router.get(
            '/transaction-img',
            verifyToken,
            eventOrganizerMiddleware,
            this.transactionEOController.getImgTransaction,
        );

        // Update Transaction for Paid
        this.router.patch('/transaction/:id', verifyToken, eventOrganizerMiddleware, this.transactionEOController.updateTransactionStatus)
    }

    getRouter(): Router {
        return this.router;
    }
}
