import prisma from '@/prisma';
import { Response, Request, NextFunction } from 'express';
import fs from 'fs';
import { join } from 'path';

export const validationReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const pic = files[0].filename;
    if (pic) {
      const split = pic?.split('.');
      console.log(split[split.length - 1]);
      if (
        !(split[split.length - 1] == 'jpg' || split[split.length - 1] == 'png')
      ) {
        throw 'invalid picture';
      }
    }

    return next();
  } catch (error) {
    console.log(error);
    const files = req.files as Express.Multer.File[];
    fs.unlinkSync(
      join(__dirname, '../../public/receipt', `/${files[0].filename}`),
    );
    return res.status(400).send(error);
  }
};
