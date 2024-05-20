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
    }

    getRouter(): Router {
        return this.router;
    }
}
