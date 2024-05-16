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
import { deleteEvent } from '@/api/EO/eo';
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
    React.useEffect(() => {
        getEvents(page, pageSize)
    }, [page, pageSize]);

    const handleDeleteEvent = async (eventID: number) => {
        await deleteEvent(eventID)
        await getEvents(page, pageSize)
    }
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
                                <DeleteButton onDelete={() => handleDeleteEvent(event.id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    );
};

export default TableEventEO;
