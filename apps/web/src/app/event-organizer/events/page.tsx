

import TableEventEO from '@/components/EO/Event-Table-EO/table'
import Header from '@/components/EO/SidebarEO/header'
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile'
import SideNav from '@/components/EO/SidebarEO/side-nav'
import React from 'react'

const DashboardEOPage = () => {
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1'>
                <Header />
                <HeaderMobile />
                <div className='flex flex-col container px-[20px] md:px-[180px] my-[10px] mx-auto'>
                    <div className='flex flex-col items-center justify-center gap-1 mb-10 font-semibold md:ml-[100px]'>
                        List Event From EO
                    </div>
                    <TableEventEO />
                </div>
            </div>
        </div >
    )
}

export default DashboardEOPage