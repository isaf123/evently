import { MidtransClient } from 'midtrans-node-client';
import { NextFunction, Request, Response } from 'express';
import { log } from 'handlebars';

export class MidtransController {
  async createToken(req: Request, res: Response) {
    try {
      const snap = new MidtransClient.Snap({
        isProduction: process.env.DEVELOPMENT,
        serverKey: process.env.SECRET,
        clientKey: process.env.NEXT_PUBLIC_CLIENT,
      });
      const { id, productName, price, quantity } = req.body;
      let parameter = {
        transaction_details: {
          order_id: id,
          gross_amount: price * quantity,
        },
      };
      const token = await snap.createTransactionToken(parameter);

      return res.status(200).send(token);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
