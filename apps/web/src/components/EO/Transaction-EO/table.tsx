'use client'
import { showMessage } from '@/components/Alert/Toast';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ITransaction } from '@/interfaces/transaction';
import { getTransactionEO } from '@/lib/data';
import { formatDate } from '@/lib/EO/formatDate';
import { getStatusStyles } from '@/utils/EO/getStatusStyle';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TableTransactionEOPage = () => {
    const [dataTransaction, setDataTransaction] = useState<ITransaction[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transaction = await getTransactionEO(currentPage, pageSize);

                console.log('data transaction', transaction);


                if (Array.isArray(transaction.result)) {
                    setDataTransaction(transaction.result);
                    const totalItems = transaction.totalPage; // Ensure your API returns the total count of items
                    const totalPagesCount = Math.ceil(totalItems / pageSize);
                    setTotalPages(totalPagesCount);
                } else {
                    throw new Error("Data received is not in expected format.");
                }
            } catch (error: any) {
                showMessage(error.message, 'error');
            }
        };
        fetchData();
    }, [currentPage, pageSize]);

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

    const handleInvoiceClick = (id: number) => {
        console.log('invoice id: ', id);
        router.push(`/event-organizer/transactions/${id}`);
    }

    return (
        <div>
            <Table className='w-full text-sm text-left text-gray-500'>
                <TableHeader className='text-sm text-gray-700 capitalize bg-gray-50'>
                    <TableRow>
                        <TableHead className='px-6 py-3 hidden md:table-cell'>No</TableHead>
                        <TableHead className='px-6 py-3'>Invoice Code</TableHead>
                        <TableHead className='px-6 py-3 hidden md:table-cell'>Event Name</TableHead>
                        <TableHead className='px-6 py-3 hidden md:table-cell'>Creator</TableHead>
                        <TableHead className='px-6 py-3 hidden md:table-cell'>Start Date</TableHead>
                        <TableHead className='px-6 py-3 text-center'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataTransaction.map((transaction, index) => (
                        <TableRow key={transaction.id} className='bg-white border-b'>
                            <TableCell className='px-6 py-3 hidden md:table-cell'>{index + 1}.</TableCell>
                            <TableCell className='px-6 py-3'>
                                <Button className='text-blue-500 hover:underline' onClick={() => { handleInvoiceClick(transaction.id) }}>
                                    {transaction.invoice_code.replace(/^TRANS/, '')}
                                </Button>
                            </TableCell>
                            <TableCell className='px-6 py-3 hidden md:table-cell'>{transaction.event?.title}</TableCell>
                            <TableCell className='px-6 py-3 hidden md:table-cell'>{transaction.user?.name}</TableCell>
                            <TableCell className='px-6 py-3 hidden md:table-cell'>{formatDate(transaction.date_transaction)}</TableCell>
                            <TableCell className={`px-6 py-3  ${getStatusStyles(transaction?.status_transaction)}`}>
                                {transaction.status_transaction}
                            </TableCell>
                        </TableRow>
                    ))}
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
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default TableTransactionEOPage;
