'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { showMessage } from '@/components/Alert/Toast';

const DetailTrans = () => {
    const [imgPayment, setImgPayment] = useState<string | null>(null);

    const path = usePathname()

    console.log('ini path sekarang', path);

    const newPath = path.split('/')[3].split('-')[1]
    console.log('ini path baru', newPath);


    useEffect(() => {
        const fetchData = async () => {
            const tokenEO = Cookies.get('Token EO');

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/transaction`, {
                    headers: {
                        Authorization: `Bearer ${tokenEO}`
                    }
                });

                console.log('data transaction:', response.data.result);


            } catch (error: any) {
                showMessage(error.message, 'error');
            }
        };

        fetchData()
    }, []);

    return (
        <div>
            <div></div>
            <Image src={`${process.env.NEXT_PUBLIC_BASE_API_URL}receipt/${newPath}`} alt="Receipt Image" width={200} height={200} />
        </div >
    );
};

export default DetailTrans;
