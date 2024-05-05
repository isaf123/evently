import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const TableEventEO = () => {
    return (
        <div className='bg-red-300 max-w-full text-justify md:ml-[100px]'>
            <Table>
                <TableHeader className=''>
                    <TableRow>
                        <TableHead className='text-center'>Event Code</TableHead>
                        <TableHead className='text-center'>Event Name</TableHead>
                        <TableHead className='text-center'>Creator</TableHead>
                        <TableHead className='text-center'>Status</TableHead>
                        <TableHead className='text-center'>Action</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </div>
    )
}

export default TableEventEO