'use client'
import { showMessage } from '@/components/Alert/Toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import * as React from 'react';
import { formatDate } from '../../../lib/EO/formatDate';
import { generateEventCode } from '@/lib/EO/generateEventCode';
import Cookies from 'js-cookie';
import { EditButton } from '../Button/ButtonEditEvent/button';
import { DeleteButton } from '../Button/ButtonDeleteEvent/button';
import { capitalizeLetter } from '@/utils/capitalizeLetter';
interface EventData {
    id: number;
    flyer_event: string | null;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    category: string;
    available_seat: number;
    event_type: string;
    price: number;
    location: string;
    usersId: number;
    address: string;
    user_id: {
        name: string;
    };
    eventCode: any
}

const TableEventEO = () => {
    const [dataEvent, setDataEvent] = React.useState<EventData[]>([])
    const [page, setPage] = React.useState(1); // State untuk nomor halaman
    const [pageSize, setPageSize] = React.useState(5); // State untuk ukuran halaman
    const [totalPages, setTotalPages] = React.useState(1); // State untuk menyimpan jumlah total halaman
    const getEvents = async (page: number, pageSize: number) => {
        try {
            const cookies = Cookies.get('Token EO')
            const offset = (page - 1) * pageSize;
            // console.log(cookies);

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/event`, {
                headers: {
                    Authorization: `Bearer ${cookies}`
                }, params: {
                    offset: offset,
                    limit: pageSize
                }
            })

            const totalItems = response.data.length;
            const totalPages = Math.ceil(totalItems / pageSize);
            console.log(response.data.length);

            setTotalPages(totalPages);
            const events = response.data.map((event: EventData, index: number) => ({
                ...event,
                eventCode: generateEventCode(index + 1) // Menambahkan properti eventCode ke setiap event
            }));
            // console.log(response.data.length);

            setDataEvent(events)
            // Mengupdate jumlah total halaman
        } catch (error: any) {
            if (error.response) {
                showMessage(error.response.data.error, 'error');
            } else {
                showMessage(error, 'error');
            }
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };
    React.useEffect(() => {
        getEvents(page, pageSize)
    }, [page, pageSize]);

    // Handler untuk memperbarui nilai query saat input berubah

    return (
        <div>
            <Table className='w-full text-sm text-left text-gray-500'>
                <TableHeader className='text-sm text-gray-700 uppercase bg-gray-50'>
                    <TableRow>
                        <TableHead className='px-6 py-3 hidden md:table-cell'>Event Code</TableHead>
                        <TableHead className='px-6 py-3'>Event Name</TableHead>
                        <TableHead className='px-6 py-3 hidden md:table-cell'>Creator</TableHead>
                        <TableHead className='px-6 py-3'>Start Date</TableHead>
                        <TableHead className='px-6 py-3 text-center'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataEvent.map((event) => (
                        <TableRow key={event.id} className='bg-white border-b'>
                            <TableCell className='px-6 py-3 hidden md:table-cell'>{event.eventCode}</TableCell>
                            <TableCell className='px-6 py-3'>{event.title}</TableCell>
                            <TableCell className='px-6 py-3 hidden md:table-cell'>{capitalizeLetter(event.user_id.name)}</TableCell>
                            <TableCell className='px-6 py-3'>{formatDate(event.start_date.toString())}</TableCell>
                            <TableCell className='flex justify-center items-center gap-[20px]'>
                                <EditButton />
                                <DeleteButton />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-center mt-4 gap-[20px]">
                <button
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-l ${page === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r ${page === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div >
    );
};

export default TableEventEO;
