import { useAppSelector } from '@/lib/hooks';
import React from 'react'

const ProfileEO = () => {
    const username = useAppSelector((state) => state.userSlice.username);
    const email = useAppSelector((state) => state.userSlice.email)
    const initials = username.slice(0, 2).toUpperCase();
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    const profileName = capitalizeFirstLetter(username);
    return (
        <div className='flex items-center justify-between gap-2 border rounded-[8px] p-2'>
            <div className='avatar rounded-full min-h-12 min-w-12 bg-emerald-500 text-white font-[700] flex items-center justify-center'>
                <p>{initials}</p>
            </div>
            <div className='grow'>
                <p className='text-[16px] font-bold'>{profileName}</p>
                <p className='text-[12px] text-neutral-500'>{email}</p>
            </div>
            <div>
                <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default ProfileEO