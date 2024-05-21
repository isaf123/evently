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

import { convertDate, rupiah } from '@/lib/text';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import axios from 'axios';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import BarCustomerWeb from '@/components/BarCustomerWeb';
import BarCustomerMobile from '@/components/BarCustomerMobile';
import CartTicket from '@/components/CartTicket';

interface ICheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (props) => {
  const [page, SetPage] = React.useState<number>(1);
  const [ref, setRef] = React.useState<number>(0);
  const [disc, setDisc] = React.useState<number>(0);
  const [expPoint, setExpPoint] = React.useState<string>('');
  const [expDisc, setExpDisc] = React.useState<string>('');
  const [data, setData] = React.useState<{
    name: string;
    email: string;
    referral_code: string;
  }>({
    name: '',
    email: '',
    referral_code: '',
  });
  const path = usePathname();
  React.useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/profile-cust`,
        { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );

      const point = response.data.Poin;
      const voucher = response.data.vouchers;

      if (point.length) {
        setRef(point[0].amount);
        setExpPoint(point[0].expiredAt);
      }

      console.log(point);
      if (voucher.length) {
        setDisc(voucher[0].discount);
        setExpDisc(voucher[0].end_date);
      }

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
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
                <div className="flex flex-col md:flex-row gap-8 w-fit m-auto md:m-0">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="bg-gray-300 w-[340px] h-[340px] rounded-2xl"></div>
                    <Card className="w-full">
                      <CardHeader className="">
                        <CardTitle className="text-xl text-left text-md">
                          Referal code :
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="w-full h-[62px] bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="font-bold text-gray-800 text-lg ">
                            {data.referral_code}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <p className="w-[320px] break-words text-xs text-left mt-2">
                      \ * you will receive 10.000 poin for each user register
                      with your referral code
                    </p>
                  </div>

                  <div className="flex-col gap-4 md:w-[480px] w-[340px] h-fit border shadow-sm rounded-md px-8 py-8">
                    <div className=" text-sm font-semibold ">Name :</div>
                    <div className=" text-lg mb-4">{data.name}</div>
                    <div className=" text-sm font-semibold">Email :</div>
                    <div className=" text-lg mb-4">{data.email}</div>
                    <div className=" text-sm font-semibold ">Password :</div>
                    <div className=" text-lg mb-4">••••••</div>
                    <div className="w-full min-h-[98px] bg-gray-50 rounded-md flex items-center shadow-md justify-between px-6 mb-3">
                      <div>
                        <p>Point :</p>
                        {ref ? (
                          <p className="text-xs">
                            expired at : {convertDate(new Date(expPoint))}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="font-bold text-xl text-green-700 ">
                        {rupiah(ref)}
                      </div>
                    </div>
                    {disc ? (
                      <div className="w-full min-h-[98px] bg-gray-50 rounded-md flex items-center shadow-md justify-between px-6">
                        <div>
                          <p>Discount Register</p>
                          <p className="text-xs">
                            expired at : {convertDate(new Date(expDisc))}
                          </p>
                        </div>
                        <div className="font-bold text-xl text-green-700 ">
                          {disc * 100}%
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CheckoutPage;
