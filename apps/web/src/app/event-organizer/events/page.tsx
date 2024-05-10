'use client'

import TableEventEO from '@/components/EO/Event-Table-EO/table'
import Header from '@/components/EO/SidebarEO/header'
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile'
import SideNav from '@/components/EO/SidebarEO/side-nav'
import React from 'react'
import { CreateEventButton } from '../../../components/EO/Button/ButtonCreateEvent/button';

const EventEOPage = ({ searchParams }: {
    searchParams?: {
        query?: string
        page?: string
    }
}) => {

    const query = searchParams?.query || ""
    const currentPage = Number(searchParams?.page) || 1
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1'>
                <Header />
                <HeaderMobile />
                <div className="max-w-screen-md mx-auto mt-5">
                    <div className="flex items-center justify-between gap-1 mb-5">
                        <CreateEventButton />
                    </div>
                    <TableEventEO query={query} currentPage={currentPage} />
                </div>
            </div>
        </div >
    )
}

export default EventEOPage