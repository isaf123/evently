

import Header from '@/components/EO/SidebarEO/header'
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile'
import SideNav from '@/components/EO/SidebarEO/side-nav'
import React from 'react'

const CustomerEOPage = () => {
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1'>
                <Header />
                <HeaderMobile />
                <div className='flex flex-col container px-[20px] md:px-[300px] my-[10px] mx-auto '>Customer EO</div>
            </div>
        </div >
    )
}

export default CustomerEOPage