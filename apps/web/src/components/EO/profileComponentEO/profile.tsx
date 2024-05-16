import React from 'react'
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Iprofile {
    children: any
    onClick: () => void
}

const ProfileComponentEOPage: React.FC<Iprofile> = (props) => {

    const username = useAppSelector((state) => state.userSlice.username) || "";
    const initials = username.slice(0, 2).toUpperCase();
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const profileName = capitalizeFirstLetter(username);
    return (
        <div className="w-full h-fit flex flex-col items-center md:flex-row px-8 py-6 md:px-32 md:py-24 justify-start">
            <div className="w-[300px] md:w-[400px] border border-r-2 pt-10  md:ml-20">
                <div className="w-24 h-24 bg-gray-100 flex justify-center items-center m-auto text-center mb-5 rounded-full">
                    <p className="text-3xl">{initials}</p>
                </div>
                <p className="m-auto text-center px-4 mb-16 text-xl">
                    Welcome, <span className="font-bold">{profileName}</span>
                </p>
            </div>
            <div className="w-full md:ml-8 flex flex-col items-center md:items-start justify-center mt-[10px] md:mt-1">
                {props.children}
                <div className="mt-[30px] text-center md:text-left">
                    <Button className='hover:bg-purple-300 hover:text-white rounded-full bg-green-500 text-white'>Update</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponentEOPage