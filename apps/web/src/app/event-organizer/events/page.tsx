

import TableEventEO from '@/components/EO/Event-Table-EO/table'
import Header from '@/components/EO/SidebarEO/header'
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile'
import SideNav from '@/components/EO/SidebarEO/side-nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const DashboardEOPage = () => {
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1'>
                <Header />
                <HeaderMobile />
                <div className='flex flex-col md:flex-col container px-[10px] md:px-[180px] md:my-[30px]  mx-auto text-3xl text-center'>
                    List Event EO
                </div>
                <div className='flex md:justify-between gap-[60px] md:gap-4 md:ml-[300px]'>
                    <Button className='font-bold bg-blue-600 mb-5 text-white p-4'>Create an Event</Button>

                    <Input type='search' className='w-[180px] md:w-[300px] mr-[200px]' />
                </div>
                <div>
                    <TableEventEO />
                </div>
            </div>
        </div >
    )
}

export default DashboardEOPage