'use client'
import React from 'react'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSuccessLoginAction } from '@/lib/features/userSlice';
import { showMessage } from '@/components/Alert/Toast';
import Cookies from 'js-cookie';
import axios from 'axios';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

const Header = () => {
    const scrolled = useScroll(5);
    const selectedLayout = useSelectedLayoutSegment();
    const dispatch = useAppDispatch();

    const username = useAppSelector((state) => state.userSlice.username);

    const initials = username.slice(0, 2).toUpperCase();
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const profileName = capitalizeFirstLetter(username);

    React.useEffect(() => {
        keepLogin()
    }, []);

    const keepLogin = async () => {
        try {
            const tokenEO = Cookies.get('Token EO')
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/keeplogin`, {
                headers: { Authorization: `Bearer ${tokenEO}` }
            })
            dispatch(setSuccessLoginAction(response.data))
        } catch (error: any) {
            showMessage(error.response.data, "error")
        }
    }

    return (
        <div
            className={cn(
                `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
                {
                    'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
                    'border-b border-gray-200 bg-white': selectedLayout,
                },
            )}
        >
            <div className="flex h-[47px] items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/event-organizer/dashboard"
                        className="flex flex-row space-x-3 items-center justify-center md:hidden"
                    >
                        <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
                        <span className="font-bold text-xl flex ">Evently</span>
                    </Link>
                </div>

                <div className="hidden md:block">
                    <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center mr-[50px]">
                        <span className="font-semibold text-sm">
                            <DropdownMenu>
                                <DropdownMenuTrigger>{initials}</DropdownMenuTrigger>
                                <DropdownMenuContent className='bg-gray-300 p-4'>
                                    <DropdownMenuLabel>{profileName}</DropdownMenuLabel>
                                    <DropdownMenuSeparator className='bg-gray-100' />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header