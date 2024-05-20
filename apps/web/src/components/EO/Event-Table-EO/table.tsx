'use client'
import { showMessage } from '@/components/Alert/Toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as React from 'react';
import { formatDate } from '../../../lib/EO/formatDate';
import { generateEventCode } from '@/lib/EO/generateEventCode';
import { EditButton } from '../Button/ButtonEditEvent/button';
import { DeleteButton } from '../Button/ButtonDeleteEvent/button';
import { deleteEvent } from '@/api/EO/eo';
import { getEvent } from '@/lib/data';
import { capitalizeFirstLetter } from '@/utils/capitalizeFiestLetter';
import { EventData } from '@/interfaces/event';
const TableEventEO = ({ query, currentPage }: {
    query: string
    currentPage: number
}) => {
    const [dataEvent, setDataEvent] = React.useState<EventData[]>([])
    const getEvents = async () => {
        try {
            const events = await getEvent(query, currentPage)
            const event = events.map((event: EventData, index: number) => ({
                ...event,
                eventCode: generateEventCode(index + 1)
            }))
            setDataEvent(event)
        } catch (error: any) {
            if (error.response) {
                showMessage(error.response.data, 'error');
            }
            showMessage(error, 'error');
        }
    }

    React.useEffect(() => {
        getEvents()
    }, []);
    const handleDeleteEvent = async (eventID: number) => {
        await deleteEvent(eventID)
        await getEvents()
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
                            <TableCell className='px-6 py-3 hidden md:table-cell'>{capitalizeFirstLetter(event.user_id.name)}</TableCell>
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
