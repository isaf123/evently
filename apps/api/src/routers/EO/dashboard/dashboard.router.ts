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
    this.router.get(
      '/total-revenue',
      verifyToken,
      this.dashboardEOController.RevenueChart,
    );
    this.router.get(
      '/ticket',
      verifyToken,
      this.dashboardEOController.ticketChart,
    );
    this.router.get('/', verifyToken, this.dashboardEOController.getStatInfo);
    this.router.get(
      '/recent-transaction',
      verifyToken,
      this.dashboardEOController.recentTransaction,
    );
    this.router.get(
      '/recent-event',
      verifyToken,
      this.dashboardEOController.recentEvent,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
