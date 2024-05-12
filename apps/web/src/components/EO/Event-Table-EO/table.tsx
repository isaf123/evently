import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const TableEventEO = () => {
    return (
        <div className='bg-red-300 w-[950px] text-justify md: ml-[300px]'>
            <Table>
                <TableHeader className=''>
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
                            <TableCell className='px-6 py-3 hidden md:table-cell'>{event.user_id.name}</TableCell>
                            <TableCell className='px-6 py-3'>{formatDate(event.start_date.toString())}</TableCell>
                            <TableCell className='flex justify-center'></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableEventEO;
