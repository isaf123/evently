import { DashboardEOController } from '@/controllers/EO/dashboard/dashboard.controller';
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
    }

    getRouter(): Router {
        return this.router;
    }
}
