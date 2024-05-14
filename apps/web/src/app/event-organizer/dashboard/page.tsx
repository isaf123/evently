import CardEO from '@/components/EO/DashboardEO/card';
import Header from '@/components/EO/SidebarEO/header';
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile';
import SideNav from '@/components/EO/SidebarEO/side-nav';
import React from 'react';

const DashboardEOPage = () => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1">
        <Header />
        <HeaderMobile />
        <div className="flex flex-col container px-[20px] md:px-[180px] my-[30px] mx-auto text-3xl text-center">
          Dashboard
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:pl-[300px] p-6">
          {' '}
          {/* Menggunakan grid untuk tata letak kartu */}
          <CardEO title="Upcoming Event" number={0} icon="events" />
          <CardEO title="Pending Payment" number={0} icon="transaction" />
          <CardEO title="Finished Event" number={0} icon="events" />
          <CardEO title="Ticket Sold" number={0} icon="ticket" />
        </div>
      </div>
    </div>
  );
};

export default DashboardEOPage;
