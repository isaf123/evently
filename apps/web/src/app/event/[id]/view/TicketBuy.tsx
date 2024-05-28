import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Ticket } from 'lucide-react';
import { rupiah } from '@/lib/text';
import { convertDate } from '@/lib/text';
import { useAppDispatch } from '@/lib/hooks';
import { setTransactionAction } from '@/lib/features/transactionEventSlice';
interface IEventDetailsProps {
  price: number;
  maxTicket: number;
  buyTicket: number;
}

const TicketBuy: React.FunctionComponent<IEventDetailsProps> = (props) => {
  const [countTicket, setCountTicket] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);

  const dispatch = useAppDispatch();

  return (
    <Card x-chunk="dashboard-07-chunk-0 " className="w-full mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gray-900">Buy Ticket</CardTitle>
          <div className="flex gap-2">
            <Ticket className="text-gray-400"></Ticket>
            {props.price ? (
              <div className="font-medium text-gray-500">
                <span className=" font-bold text-gray-900">IDR </span>
                {props.price}
              </div>
            ) : (
              <div className="font-bold text-gray-700"> Free</div>
            )}
          </div>
        </div>
        <CardDescription>
          <div className="flex justify-between items-center">
            <span className="font-medium">
              Maximal ticket/users: {props.maxTicket}
            </span>
            {props.buyTicket ? (
              <span className="text-xs">
                {props.buyTicket}/{props.maxTicket}
              </span>
            ) : (
              <></>
            )}
          </div>
          {props.buyTicket ? (
            <div className="">
              available ticket : {props.maxTicket - props.buyTicket}
            </div>
          ) : (
            <></>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 text-gray-600">
          <div className="flex items-center  justify-end gap-20">
            {!price ? (
              <></>
            ) : (
              <span className="font-medium text-lg ">
                {rupiah(props.price * countTicket)}
              </span>
            )}

            <div className="flex gap-2 items-center">
              <button
                className="bg-color1 h-7 w-7 rounded-md text-white hover:bg-color2 ease-out"
                onClick={() => {
                  if (countTicket > 0) {
                    const newCount = countTicket - 1;
                    setCountTicket(newCount);
                    setPrice(props.price * newCount);
                    dispatch(
                      setTransactionAction({
                        total_price: props.price * newCount,
                        ticket_count: newCount,
                      }),
                    );
                  }
                }}
              >
                -
              </button>
              <div className="text-color1 w-7 text-center text-sm">
                {countTicket}
              </div>
              <button
                className="bg-color1 h-7 w-7 rounded-md text-white hover:bg-color2 ease-out"
                onClick={() => {
                  if (countTicket < props.maxTicket - props.buyTicket) {
                    const newCount = countTicket + 1;
                    setCountTicket(newCount);
                    setPrice(props.price * newCount);
                    dispatch(
                      setTransactionAction({
                        total_price: props.price * newCount,
                        ticket_count: newCount,
                      }),
                    );
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketBuy;
