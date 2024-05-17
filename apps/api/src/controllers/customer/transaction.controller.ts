import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export class TransactionUserController {
  async createTransaction(req: Request, res: Response) {
    try {
      console.log('okeeeeeeee');
      console.log(res.locals.decript.id);
      console.log(req.body);

      const {
        date_transaction,
        invoice_code,
        price_after_discount,
        status_transaction,
        ticket_count,
        total_price,
        event_id,
        voucher_id,
        point_discount,
        voucher_discount,
      } = req.body;

      const user_id = res.locals.decript.id

      console.log('voucher', req.body);
      await prisma.$transaction(async (tx) => {
        const existsEvent = await tx.transaction.findMany({
          where: {
            event_id: event_id
          }
        })

        if (!existsEvent) {
          throw 'Event not exists'
        }

        const existTrans = await tx.transaction.aggregate({
          _sum: {
            ticket_count: true
          },
          where: {
            event_id: event_id,
            user_id: res.locals.decript.id
          }
        })

        if (existTrans === ticket_count) {
          console.log('dapat transaksi', existTrans);
          throw 'Reach Max Transaction'
        }

        if (voucher_id) {
          const existVoucher = await tx.voucher.findUnique({
            where: {
              id: voucher_id
            }
          })


          if (existVoucher?.user_id) {
            const findVoucherById = await tx.voucher.findFirst({
              where: {
                user_id: user_id
              }
            })
            console.log("dapaaaaaaaat :", findVoucherById?.id)

            const deleteVoucher = await tx.voucher.delete({
              where: {
                id: findVoucherById?.id
              }
            })
          }

        }

        if (point_discount) {
          const findPoint = await tx.poin.findFirst({
            where: {
              usersId: user_id
            }
          })

          console.log("dapat point :", findPoint?.usersId)
          if (findPoint) {
            const deletePoint = await tx.poin.update({
              where: { id: findPoint.id },
              data: { amount: findPoint.amount - point_discount }
            })
          }
        }
        console.log("jlaaaaaaan")

        const trans = await tx.transaction.create({
          data: {
            date_transaction,
            invoice_code,
            price_after_discount,
            status_transaction,
            ticket_count,
            total_price,
            voucherId: voucher_id,
            event_id,
            user_id: res.locals.decript.id,
            point_discount,
            voucher_discount,
          },
        });
      })

    } catch (error) {
      console.log(error);
    }
  }

  async getVoucherDiscount(req: Request, res: Response) {
    try {
      const user_id = res.locals.decript.id;
      const voucher = await prisma.voucher.findMany({
        where: {
          user_id,
          end_date: {
            gt: new Date(),
          },
        },
      });
      return res.status(200).send({ result: voucher });
    } catch (error) {
      console.log(error);
    }
  }

  async getPoin(req: Request, res: Response) {
    try {
      const usersId = res.locals.decript.id;
      const poin = await prisma.poin.findMany({
        where: {
          usersId,
          expiredAt: {
            gt: new Date(),
          },
        },
      });

      return res.status(200).send({ result: poin });
    } catch (error) {
      console.log(error);
    }
  }
}
