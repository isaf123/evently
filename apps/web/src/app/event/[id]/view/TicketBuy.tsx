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
interface IEventDetailsProps {
  price: number;
}

const TicketBuy: React.FunctionComponent<IEventDetailsProps> = (props) => {
  const [countTicket, setCountTicket] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(props.price);

  console.log('ini pricce :', price);

  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-0 " className="w-full mb-8">
        <CardHeader>
          <div className="flex items-center gap-6">
            <CardTitle className="text-xl">Buy Ticket</CardTitle>
            <Ticket className="text-gray-400"></Ticket>
          </div>
          <CardDescription>Maximal ticket/users: 5</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-gray-600">
            <div className="flex items-center  justify-between">
              <p className="font-bold text-lg ">
                {rupiah(props.price * countTicket)}
              </p>

              <div className="flex gap-2 items-center">
                <button
                  className="bg-color1 h-7 w-7 rounded-md text-white hover:bg-color2 ease-out"
                  onClick={() => {
                    if (countTicket > 0) {
                      const newCount = countTicket - 1;
                      setCountTicket(newCount);
                      setPrice(props.price * newCount);
                    }
                  }}
                >
                  -
                </button>
                <p className="text-color1 w-7 text-center">{countTicket}</p>
                <button
                  className="bg-color1 h-7 w-7 rounded-md text-white hover:bg-color2 ease-out"
                  onClick={() => {
                    if (countTicket < 5) {
                      const newCount = countTicket + 1;
                      setCountTicket(newCount);
                      setPrice(props.price * newCount);
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
