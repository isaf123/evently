'use client'
import { getUpcomingEventsEO } from '@/api/EO/eo';
import CardEO from '@/components/EO/DashboardEO/card';
import Header from '@/components/EO/SidebarEO/header';
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile';
import SideNav from '@/components/EO/SidebarEO/side-nav';
import { useAppSelector } from '@/lib/hooks';
import React from 'react';
import EORouter from '../../../components/Router/EORouter';

const DashboardEOPage = () => {
  const username = useAppSelector((state) => state?.userSlice?.username)
  const capitalizeFirstLetter = (string: string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };
  const profileName = capitalizeFirstLetter(username)
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
    <EORouter>
      <div className="flex">
        <SideNav />
        <div className="flex-1">
          <Header />
          <HeaderMobile />
          <div className="flex items-center gap-[5px] container px-[20px] md:px-[180px] my-[30px] mx-auto text-2xl  md:ml-[125px]">
            Welcome, <span className='text-blue-600 font-semibold text-3xl'>{profileName}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:pl-[400px] p-6">
            {' '}
            {/* Menggunakan grid untuk tata letak kartu */}
            <CardEO title="Upcoming Event" number={numEvent} icon="events" link='events' />
            <CardEO title="Pending Payment" number={0} icon="transaction" link='transactions' />
            <CardEO title="Ticket Sold" number={0} icon="ticket" link='transactions' />
          </div>
        </div>
      </div>
    </EORouter>
  );
};

export default DashboardEOPage;
