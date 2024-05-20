'use client'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation';
import axios from 'axios';

const DetailTrans = () => {
    const path = usePathname()
    console.log('ini path;', path);

    // /event-organizer/transactions/RECEIPT1716171727152.png

    const pathName = path.split('/')[3]

    const getImage = async () => {
        try {
            const response = await axios.get
        } catch (error) {
            console.log(error);
        }
    }

    // console.log('path baru,', pathName);


    return (
        <div>
            <Image src={`${process.env.NEXT_PUBLIC_BASE_API_URL}receipt/${pathName}`} alt="alt" width={200} height={200} />
        </div>
    )
}

export default DetailTrans