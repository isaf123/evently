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
  console.log('props', props.buyTicket);
  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-0 " className="w-full mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-900">Buy Ticket</CardTitle>
            <div className="flex gap-2">
              <Ticket className="text-gray-400"></Ticket>
              {props.price ? (
                <p className="font-medium text-gray-500">
                  <span className=" font-bold text-gray-900">IDR </span>
                  {props.price}
                </p>
              ) : (
                <p className="font-bold text-gray-700"> Free</p>
              )}
            </div>
          </div>
          <CardDescription>
            <div className="flex justify-between items-center">
              <p className="font-medium">
                Maximal ticket/users: {props.maxTicket}
              </p>
              {props.buyTicket ? (
                <p className="text-xs">
                  {props.buyTicket}/{props.maxTicket}
                </p>
              ) : (
                <></>
              )}
            </div>
            {props.buyTicket ? (
              <p className="">
                available ticket : {props.maxTicket - props.buyTicket}
              </p>
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
                <p className="font-medium text-lg ">
                  {rupiah(props.price * countTicket)}
                </p>
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
                <p className="text-color1 w-7 text-center text-sm">
                  {countTicket}
                </p>
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
    </div>
  );
};

export default TicketBuy;
