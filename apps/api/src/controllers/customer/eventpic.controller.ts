import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma';
import fs from 'fs';
import { join } from 'path';

export class EventPicController {
  async eventImg(req: Request, res: Response, next: NextFunction) {
    console.log('File Uplaod Info : ', req.file);

    const findEvent = await prisma.masterEvent.findUnique({
      where: { id: Number(req.params.id) },
    });

    const update = await prisma.masterEvent.update({
      where: { id: Number(req.params.id) },
      data: { flyer_event: `event/${req.file?.filename}` },
    });

    fs.unlinkSync(
      join(__dirname, '../../public', `/${findEvent?.flyer_event}`),
    ); //delete img profile
    res.status(200).send({
      rc: 200,
      success: true,
      message: 'update event image success',
    });
  }
}
