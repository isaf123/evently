import { ProfileEOController } from '@/controllers/EO/profile/profile.controller';
import { uploader } from '@/middleware/uploader';
import { verifyToken } from '@/middleware/verifiedToken';
import { Router } from 'express';
export class ProfileEORouter {
    private router: Router;
    private profileEOController: ProfileEOController

    constructor() {
        this.router = Router();
        this.profileEOController = new ProfileEOController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.patch('/profile', verifyToken, this.profileEOController.updateProfileEO)
    }

    getRouter(): Router {
        return this.router;
    }
}