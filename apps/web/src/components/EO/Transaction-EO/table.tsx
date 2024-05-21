'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { showMessage } from '@/components/Alert/Toast';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ITransaction } from '@/interfaces/transaction';
import { getTransactionEO } from '@/lib/data';
import { formatDate } from '@/lib/EO/formatDate';
import { getStatusStyles } from '@/utils/EO/getStatusStyle';
import SearchEventEO from '../Event-Search-EO/search';
import SearchTransactionEO from '../Transaction-Search-EO/search';

const TableTransactionEOPage = () => {
    const [dataTransaction, setDataTransaction] = useState<ITransaction[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = searchParams.get('q') || '';
                const transaction = await getTransactionEO(currentPage, pageSize, query);

                console.log('data transaction', transaction);

                if (Array.isArray(transaction.result)) {
                    setDataTransaction(transaction.result);
                    const totalItems = transaction.totalTransactions || 0;
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

    const handleInvoiceClick = (id: number, img_payment: string) => {
        console.log('invoice id: ', id);
        router.push(`/event-organizer/transactions/${id}-${img_payment}`);
    };

    return (
        <div>
            <div className='mb-[20px]'>
                <SearchTransactionEO />
            </div>
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
                    {
                        dataTransaction.length > 0 ? (
                            dataTransaction.map((transaction, index) => (
                                <TableRow key={transaction.id} className='bg-white border-b'>
                                    <TableCell className='px-6 py-3 hidden md:table-cell'>{index + 1}.</TableCell>
                                    <TableCell className='px-6 py-3'>
                                        <Button className='text-blue-500 hover:underline' onClick={() => handleInvoiceClick(transaction.id, transaction.img_payment)}>
                                            {transaction.invoice_code.replace(/^TRANS/, '')}
                                        </Button>
                                    </TableCell>
                                    <TableCell className='px-6 py-3 hidden md:table-cell'>{transaction.event_title}</TableCell>
                                    <TableCell className='px-6 py-3 hidden md:table-cell'>{transaction.user_name}</TableCell>
                                    <TableCell className='px-6 py-3 hidden md:table-cell'>{formatDate(transaction.date_transaction)}</TableCell>
                                    <TableCell className={`px-6 py-3 ${getStatusStyles(transaction.status_transaction)}`}>
                                        {transaction.status_transaction}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className='text-center py-3'>No transactions found</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody >
            </Table >
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
                </span >
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div >
        </div >
    );
};

export default TableTransactionEOPage;
