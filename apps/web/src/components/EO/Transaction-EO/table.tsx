'use client'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ITransaction } from '@/interfaces/transaction';
import React from 'react'
import { useState } from 'react';

const TableTransactionEOPage = () => {
    const [dataTransaction, setDataTransaction] = useState<ITransaction[]>([])

    const getTransaction = () => { }
    return (
        <div>
            <Table className='w-full text-sm text-left text-gray-500'>
                <TableHeader className='text-sm text-gray-700 uppercase bg-gray-50'>
                    <TableRow>
                        <TableHead className='px-6 py-3 hidden md:table-cell'>Invoice Code</TableHead>
                        <TableHead className='px-6 py-3'>Event Name</TableHead>
                        <TableHead className='px-6 py-3 hidden md:table-cell'>Creator</TableHead>
                        <TableHead className='px-6 py-3'>Start Date</TableHead>
                        <TableHead className='px-6 py-3 text-center'>Action</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </div>
    )
}

export default TableTransactionEOPage