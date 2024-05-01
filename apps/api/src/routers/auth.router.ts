import { AuthController } from '@/controllers/auth.controller';
import { Router } from 'express';
export class AuthRouter {
    private router: Router;
    private authController: AuthController

    constructor() {
        this.router = Router()
        this.authController = new AuthController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/register', this.authController.registerUsers)
    }

    getRouter(): Router {
        return this.router
    }
}