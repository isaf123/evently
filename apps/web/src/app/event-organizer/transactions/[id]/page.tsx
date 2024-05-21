'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { showMessage } from '@/components/Alert/Toast';
import { Button } from '@/components/ui/button';

const DetailTrans = () => {

    const path = usePathname()
    const newPath = path.split('/')[3].split('-')[1]
    const transactionId = path.split('/')[3].split('-')[0]
    const tokenEO = Cookies.get('Token EO');
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/transaction`, {
                    headers: {
                        Authorization: `Bearer ${tokenEO}`
                    }
                });

                console.log('data transaction:', response.data.result);


            } catch (error: any) {
                console.log(error);
                if (error.response) {
                    showMessage(error.response.data, 'error');
                } else {
                    showMessage(error, 'error');
                }
            }
        };

        fetchData()
    }, []);

    const updateTransaction = async () => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/transaction/${transactionId}`, {
                status_transaction: "paid"
            }, {
                headers: {
                    Authorization: `Bearer ${tokenEO}`
                }
            })

            showMessage('Transaction updated successfully', 'success');
            router.back(); // Kembali ke halaman sebelumnya
        } catch (error: any) {
            console.log(error);
            if (error.response) {
                showMessage(error.response.data, 'error');
            } else {
                showMessage(error, 'error');
            }
        }
    }

    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <Image src={`${process.env.NEXT_PUBLIC_BASE_API_URL}receipt/${newPath}`} alt="Receipt Image" width={700} height={200} />
            </div>
            <div className='flex justify-center gap-[20px] flex-row mt-[20px]'>
                <Button className='bg-[#28a745] text-white' onClick={updateTransaction}>Accept</Button>
            </div>
        </div >
    );
};

export default DetailTrans;
