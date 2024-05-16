'use client'
import { getUpcomingEventsEO } from '@/api/EO/eo';
import CardEO from '@/components/EO/DashboardEO/card';
import Header from '@/components/EO/SidebarEO/header';
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile';
import SideNav from '@/components/EO/SidebarEO/side-nav';
import React from 'react';

const DashboardEOPage = () => {
  const [numEvent, setNumEvent] = React.useState<number>(0)
  const getUpcomingEvents = async () => {
    try {

      const data = await getUpcomingEventsEO()
      setNumEvent(data.count)

    } catch (error) {
      console.log(error);

    }
  }

  React.useEffect(() => {
    getUpcomingEvents()
  }, []);
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1">
        <Header />
        <HeaderMobile />
        <div className="flex flex-col container px-[20px] md:px-[180px] my-[30px] mx-auto text-3xl text-center md:ml-[150px]">
          Dashboard
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:pl-[300px] p-6">
          {' '}
          {/* Menggunakan grid untuk tata letak kartu */}
          <CardEO title="Upcoming Event" number={numEvent} icon="events" link='events' />
          <CardEO title="Pending Payment" number={0} icon="transaction" link='transactions' />
          <CardEO title="Ticket Sold" number={0} icon="ticket" link='transactions' />
        </div>
      </div>
    </div>
  );
};

export default DashboardEOPage;
