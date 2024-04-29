

import Header from '@/components/SidebarEO/header'
import HeaderMobile from '@/components/SidebarEO/header-mobile'
import SideNav from '@/components/SidebarEO/side-nav'
import React from 'react'

const DashboardEOPage = () => {
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1'>
                <Header />
                <HeaderMobile />
                DashboardEOPage
            </div>
        </div >
    )
}

export default DashboardEOPage