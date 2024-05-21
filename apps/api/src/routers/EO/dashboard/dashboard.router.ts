import { DashboardEOController } from '@/controllers/EO/dashboard/dashboard.controller';
import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';


export class DashboardEORouter {
    private router: Router;
    private dashboardEOController: DashboardEOController;

    constructor() {
        this.router = Router();
        this.dashboardEOController = new DashboardEOController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/dashboard/upcoming-event', this.dashboardEOController.getUpcomingEvent)
        this.router.get('/dashboard/pending-payment', this.dashboardEOController.getPendingPaymen)
        this.router.get('/dashboard/ticket-sold', this.dashboardEOController.getTicketSold)
    }

    getRouter(): Router {
        return this.router;
    }
}
