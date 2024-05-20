import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { EventEORouter } from './routers/EO/event.router';
import { EventCustRouter } from './routers/customer/event.router';
import { PromoEventRouter } from './routers/EO/promo.router';
import { TransactionUserRouter } from './routers/customer/transaction.router';
import { DashboardEORouter } from './routers/EO/dashboard/dashboard.router';
import { TransactionEORouter } from './routers/EO/transaction/transaction.router';
import { ReviewUserRouter } from './routers/customer/review.router';
export default class App {
  readonly app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter();
    const eventEORouter = new EventEORouter();
    const eventCustRouter = new EventCustRouter();
    const transactionUserRouter = new TransactionUserRouter();
    const promoEventRouter = new PromoEventRouter();
    const reviewUserRouter = new ReviewUserRouter();

    // Dashboard EO
    const dashboardEORouter = new DashboardEORouter();

    // Transaction EO
    const transactionEORouter = new TransactionEORouter()

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/auth', authRouter.getRouter());
    this.app.use('/event-organizer', eventEORouter.getRouter());
    this.app.use('/event', eventCustRouter.getRouter());
    this.app.use('/promo', promoEventRouter.getRouter());
    this.app.use('/transaction-user', transactionUserRouter.getRouter());
    this.app.use('/review-ticket', reviewUserRouter.getRouter());
    this.app.use('/eventpic', express.static('public/eventpic'));
    // Dashboard EO
    this.app.use('/EO', dashboardEORouter.getRouter());

    // Transaction EO
    this.app.use('/event-organizer', transactionEORouter.getRouter())
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local: http://localhost:${PORT}`);
    });
  }
}
