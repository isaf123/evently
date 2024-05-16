import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { EventEORouter } from './routers/EO/event.router';
import { EventCustRouter } from './routers/customer/event.router';
import { EventPicRouter } from './routers/EO/eventpic.router';
import { PromoEventRouter } from './routers/EO/promo.router';
import { VoucherUserRouter } from './routers/customer/voucher.router';
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
    const voucherUserRouter = new VoucherUserRouter();
    const eventPicRouter = new EventPicRouter();
    const promoEventRouter = new PromoEventRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/auth', authRouter.getRouter());
    this.app.use('/event-organizer', eventEORouter.getRouter());
    this.app.use('/event', eventCustRouter.getRouter());
    this.app.use('/promo', promoEventRouter.getRouter());
    this.app.use('/voucher-user', voucherUserRouter.getRouter());
    this.app.use('/eventpic', express.static('public/eventpic'));
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local: http://localhost:${PORT}`);
    });
  }
}
