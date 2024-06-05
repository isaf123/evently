'use client';

import Header from '@/components/EO/SidebarEO/header';
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile';
import SideNav from '@/components/EO/SidebarEO/side-nav';
import { TicketSold } from './view/ChartTicket';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { protectPageEO } from '@/utils/protectPage';
import { Overview } from './view/ChartTransaction';
import StatBar from './view/Stats';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePickerTransaction } from './view/datePicker';

const DashboardEOPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (!protectPageEO()) {
      router.replace('/');
    }
  }, []);

  return (
    <div>
      <SideNav />
      <div className="flex-1">
        <Header />
        <HeaderMobile />
        <div className=" py-10 flex">
          <div className="w-[280px] h-full hidden sm:block"></div>
          <div className=" items-center w-full  mx-2 sm:mx-64">
            <h1 className="font-extrabold text-4xl mb-4">Dashboard</h1>
            <StatBar />

            <div className="flex gap-4 mt-4 flex-wrap">
              <Card className="flex-1 min-w-fit">
                <CardHeader>
                  <div className=" flex justify-between flex-wrap">
                    <div>
                      <CardTitle className="font-bold">Total Revenue</CardTitle>
                      <CardDescription>
                        Track your transaction and revenue
                      </CardDescription>
                    </div>
                    <DatePickerTransaction></DatePickerTransaction>
                  </div>
                </CardHeader>
                <CardContent>
                  <Overview />
                </CardContent>
              </Card>

              <Card className="flex-1 min-w-fit">
                <CardHeader>
                  <div className=" flex justify-between">
                    <div>
                      <CardTitle className="font-bold">Ticket Sold</CardTitle>
                      <CardDescription>
                        Track your transaction and revenue
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <TicketSold />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEOPage;
