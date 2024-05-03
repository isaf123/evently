import Header from '@/components/SidebarEO/header'
import HeaderMobile from '@/components/SidebarEO/header-mobile'
import SideNav from '@/components/SidebarEO/side-nav'
import React from 'react'

const CustomerEOPage = () => {
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1'>
                <Header />
                <HeaderMobile />
                <div className='flex flex-col container px-[180px] my-[10px] mx-auto'>Customer EO</div>
            </div>
        </div >

    )
}

export default CustomerEOPage