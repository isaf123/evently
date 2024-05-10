'use client'

import SearchEventEO from '@/components/EO/Event-Search-EO/search'
import TableEventEO from '@/components/EO/Event-Table-EO/table'
import Header from '@/components/EO/SidebarEO/header'
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile'
import SideNav from '@/components/EO/SidebarEO/side-nav'
import React from 'react'
import { CreateEventButton } from '../../../components/EO/ButtonCreateEvent/button';
import axios from 'axios'

const EventEOPage = () => {
    const [currentPage, setCurrentPage] = React.useState(1); // State untuk menyimpan halaman saat ini
    const [totalPages, setTotalPages] = React.useState(1);

    const [data, setData] = React.useState([]); // State untuk menyimpan data acara
    const pageSize = 5; // Jumlah item per halaman

    const headers = ['Event Name', 'Start Date', 'End Date', 'Description', 'Category']; // Judul kolom untuk tabel

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    React.useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page: number) => {
        try {
            // Mengambil data dari API sesuai dengan halaman yang diminta
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/event?page=${page}`);
            setData(response.data.events); // Mengatur data dari respons API
            setTotalPages(Math.ceil(response.data.totalCount / pageSize)); // Mengatur total halaman
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1'>
                <Header />
                <HeaderMobile />
                <div className="max-w-screen-md mx-auto mt-5">
                    <div className="flex items-center justify-between gap-1 mb-5">
                        <SearchEventEO />
                        <CreateEventButton />
                    </div>
                    <TableEventEO
                        data={data} // Meneruskan data ke dalam TableEventEO
                        headers={headers} // Meneruskan headers ke dalam TableEventEO
                        currentPage={currentPage} // Meneruskan currentPage ke dalam TableEventEO
                        totalPages={totalPages} // Meneruskan totalPages ke dalam TableEventEO
                        onPageChange={handlePageChange} // Meneruskan handlePageChange ke dalam TableEventEO
                    />
                </div>
            </div>
        </div >
    )
}

export default EventEOPage