'use client'
import { showMessage } from '@/components/Alert/Toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '../../../lib/EO/formatDate';
import { generateEventCode } from '@/lib/EO/generateEventCode';
import { EditButton } from '../Button/ButtonEditEvent/button';
import { DeleteButton } from '../Button/ButtonDeleteEvent/button';
import { deleteEvent } from '@/api/EO/eo';
import { getEvent } from '@/lib/data';
import { capitalizeFirstLetter } from '@/utils/capitalizeFiestLetter';
import { EventData } from '@/interfaces/event';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import SearchEventEO from '../Event-Search-EO/search';
import { CreateEventButton } from '../Button/ButtonCreateEvent/button';
const TableEventEO = () => {
    const [dataEvent, setDataEvent] = useState<EventData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleSearch = (term: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('q', term);
        router.push(`${pathname}?${searchParams.toString()}`);
        setCurrentPage(1);
    };

    const fetchData = async () => {
        try {
            const query = searchParams.get('q') || '';
            const events = await getEvent(currentPage, pageSize, query);

            if (Array.isArray(events.result)) {
                const eventDataWithCodes = events.result.map((event: EventData, index: number) => ({
                    ...event,
                    eventCode: generateEventCode(index + 1 + (currentPage - 1) * pageSize) // Adjusting for current page
                }));

                setDataEvent(eventDataWithCodes);
                const totalItems = events.totalEvents || 0;
                const totalPagesCount = Math.ceil(totalItems / pageSize);
                setTotalPages(totalPagesCount);
            } else {
                throw new Error("Data received is not in expected format.");
            }
        } catch (error: any) {
            showMessage(error.message, 'error');
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize, searchParams]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleEventClick = (id: number) => {
        router.push(`/event-organizer/events/${id}`);
    };

    const handleDeleteEvent = async (eventID: number) => {
        await deleteEvent(eventID);
        await fetchData();
    };
    return (
        <div>
            <div className='mb-[20px] flex items-center'>
                <SearchEventEO />
                <CreateEventButton />
            </div>
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
                    {dataEvent.length > 0 ? (
                        dataEvent.map((event) => (
                            <TableRow key={event.id} className='bg-white border-b'>
                                <TableCell className='px-6 py-3 hidden md:table-cell'>{event.eventCode}</TableCell>
                                <TableCell className='px-6 py-3'>{event.title}</TableCell>
                                <TableCell className='px-6 py-3 hidden md:table-cell'>{capitalizeFirstLetter(event.user_id.name)}</TableCell>
                                <TableCell className='px-6 py-3'>{formatDate(event.start_date.toString())}</TableCell>
                                <TableCell className='flex justify-center items-center gap-[20px]'>
                                    <EditButton />
                                    <DeleteButton onDelete={() => handleDeleteEvent(event.id)} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className='text-center py-3'>No events found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {totalPages > 0 ? currentPage : 0} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div >
    );
};

export default TableEventEO;
