'use client';
import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Plus } from 'lucide-react';
import axios from 'axios';
import { Separator } from '@/components/ui/separator';
import { convertDate, rupiah } from '@/lib/text';
import { useAppSelector } from '@/lib/hooks';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { showMessage } from '@/components/Alert/Toast';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

interface IModalConfirmProps {
  active?: any;
  information?: any;
}

const ModalConfirm: React.FunctionComponent<IModalConfirmProps> = (props) => {
  const transaction = useAppSelector((state) => {
    return state.transactionEventSlice;
  });

  const router = useRouter();
  const role = Cookies.get('Token Cust');
  const creteTransaction = async () => {
    try {
      const makeTransaction = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}transaction-user`,
        {
          date_transaction: new Date().toISOString(),
          invoice_code: `TRANS${new Date().getTime()}`,
          event_id: props.information.id,
          total_price: transaction.total_price,
          status_transaction: 'submitted',
          voucher_id: transaction.voucher_id,
          ticket_count: transaction.ticket_count,
          point_discount: transaction.point,
          voucher_discount: transaction.discount,
          price_after_discount:
            transaction.total_price - transaction.discount - transaction.point,
        },
        { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );

      console.log(makeTransaction);
      console.log('ini transaksi', makeTransaction);
      showMessage(makeTransaction.data, 'success');

      setTimeout(() => {
        router.push('/checkout');
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <ToastContainer></ToastContainer>
      <CardHeader className="flex flex-row items-start bg-muted/50 bg-gray-100">
        <Plus
          className="absolute top-3 right-3 rotate-45 cursor-pointer"
          onClick={() => {
            props.active(false);
          }}
        ></Plus>
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order
            <span className="sr-only font-bold">Copy Order ID</span>
          </CardTitle>
          <CardDescription>Date: {convertDate(new Date())}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1"></div>
      </CardHeader>
      <CardContent className="p-6 text-sm bg-white">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-1">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Ticket x <span>{transaction.ticket_count}</span>
              </span>
              {props.information.event_type == 'free' ? (
                <span>Free</span>
              ) : (
                <span>{rupiah(transaction.total_price)}</span>
              )}
            </li>
            <span className="text-muted-foreground text-xs">
              IDR {props.information.price}
            </span>
          </ul>
          {props.information.event_type == 'free' ? (
            <></>
          ) : (
            <div>
              <Separator className="my-2 bg-gray-300" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span>- {rupiah(transaction.discount)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Point</span>
                  <span>- {rupiah(transaction.point)}</span>
                </li>

                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>
                    {rupiah(
                      transaction.total_price -
                        transaction.discount -
                        transaction.point,
                    )}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <Separator className="my-4 bg-gray-300" />
        <div className="grid gap-3">
          <div className="font-semibold">Event Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Title </dt>
              <dd>{props.information.title}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">location</dt>
              <dd>{props.information.location}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Date</dt>
              <dd>
                <a href="tel:">
                  {convertDate(props.information.start_date)} -
                  {convertDate(props.information.end_date)}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4 bg-gray-300" />
        <Button
          className="bg-color2 w-full text-white"
          onClick={() => {
            creteTransaction();
          }}
        >
          Create Payment
        </Button>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 bg-gray-100">
        <div className="text-xs text-muted-foreground">Evently.co</div>
      </CardFooter>
    </Card>
  );
};

export default ModalConfirm;
