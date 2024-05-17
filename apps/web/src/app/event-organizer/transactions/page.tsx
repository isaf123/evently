

import Header from '@/components/EO/SidebarEO/header'
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile'
import SideNav from '@/components/EO/SidebarEO/side-nav'
import TableTransactionEOPage from '@/components/EO/Transaction-EO/table'
import React from 'react'

const TransactionEOPage = () => {
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1'>
                <Header />
                <HeaderMobile />
                <div className="flex flex-col container px-[20px] md:px-[180px] my-[30px] mx-auto text-3xl text-center md:ml-[150px]">
                    Transaction EO
                </div>
                <div className="max-w-screen-md mx-auto mt-10">
                    <div className="flex items-center justify-between gap-1 mb-5">
                    </div>
                    <TableTransactionEOPage />
                </div >
            </div>
        </div >
    )
}

export default TransactionEOPage