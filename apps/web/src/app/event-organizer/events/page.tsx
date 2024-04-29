import Header from '@/components/SidebarEO/header'
import HeaderMobile from '@/components/SidebarEO/header-mobile'
import SideNav from '@/components/SidebarEO/side-nav'
import React from 'react'

const EventEOPage = () => {
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1'>
                <Header />
                <HeaderMobile />
                EventEOPage
            </div>
        </div >
    )
}

export default EventEOPage