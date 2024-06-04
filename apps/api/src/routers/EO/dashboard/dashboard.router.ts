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
    this.router.get('/', verifyToken, this.dashboardEOController.getStatInfo);
  }

  getRouter(): Router {
    return this.router;
  }
}
