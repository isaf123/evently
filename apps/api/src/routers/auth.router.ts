import { AuthController } from '@/controllers/auth.controller';
import { verifyToken } from '@/middleware/verifiedToken';
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
        this.router.post('/login', this.authController.loginUsers)
      
        // Untuk Keep Login
        this.router.get('/keeplogin', verifyToken, this.authController.keepLogin)
      
        // Untuk Forgot Password
        this.router.post('/forgotPassword', this.authController.forgotPassword)
    }

    getRouter(): Router {
        return this.router
    }
}