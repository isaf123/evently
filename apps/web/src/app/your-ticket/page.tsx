'use client';
import * as React from 'react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { convertDate } from '@/lib/text';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import axios from 'axios';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import BarCustomerWeb from '@/components/BarCustomerWeb';
import BarCustomerMobile from '@/components/BarCustomerMobile';
import CartTicket from '@/components/CartTicket';

interface ICheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (props) => {
  const [data, setData] = React.useState<any[]>([]);
  const [page, SetPage] = React.useState<number>(1);
  const path = usePathname();
  React.useEffect(() => {
    getDataTrans();
  }, []);

  const getDataTrans = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}review-ticket`,
        { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );
      console.log('ini response :', response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const mapping = () => {
    return data.map((val: any, idx: number) => {
      return (
        <div key={idx}>
          <CartTicket
            image={val.event.flyer_event}
            startdate={convertDate(val.event.start_date)}
            enddate={convertDate(val.event.end_date)}
          >
            {val.event.title}
          </CartTicket>
        </div>
      );
    });
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <BarCustomerWeb></BarCustomerWeb>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <BarCustomerMobile></BarCustomerMobile>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">Your ticket</h1>
          </div>
        </header>

        <main className="flex flex-1 flex-col px-2 md:px-6 py-2 md:py-6">
          <div
            className="flex flex-1  rounded-lg border border-dashed shadow-md h-[600px] "
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="w-full h-full bg-green">
              <div className="md:w-[1180px] h-fit flex-wrap flex gap-4 m-auto py-6 overflow-y-auto ">
                {data ? (
                  mapping()
                ) : (
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-400">
                      Ticket not found
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CheckoutPage;
