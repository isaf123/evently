'use client';
import { Button } from '@/components/ui/button';
import {
  setLogoutAction,
  selectUserRole,
  setSuccessLoginAction,
} from '@/lib/features/userSlice'; // Perhatikan bahwa saya mengubah ini untuk mengambil fungsi logout dan selector role
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { showMessage } from './Alert/Toast';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import { useRouter } from 'next/navigation';
import { keepLogin } from '@/services/authService';
import CustRouter from './Router/CustRouter';
import {
  Github,
  LifeBuoy,
  LogOut,
  ShoppingBag,
  Ticket,
  Users,
  CircleUser,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.userSlice.username); // Mengambil username dari Redux store

  const role = useAppSelector(selectUserRole); // Mengambil role pengguna dari Redux store

  const router = useRouter();

  const handleLogout = () => {
    // Dispatch action logout
    dispatch(setLogoutAction());
  };
  React.useEffect(() => {
    searchToken();
  }, []);

  if (role === 'eo') {
    return null; // Jika role pengguna adalah "eo", kembalikan null untuk menyembunyikan header
  }
  // Keep Login for customer
  const searchToken = async () => {
    try {
      const data = await keepLogin();
      if (data) {
        dispatch(setSuccessLoginAction(data));
      } else {
        // Jika tidak ada token, arahkan ke halaman sign-in
      }
    } catch (error: any) {
      if (error.response) {
        showMessage(error.response.data, 'error');
      } else {
        showMessage(error, 'error');
      }
    }
  };

  console.log('username :', username);
  return (
    <CustRouter>
      <div className="text-white bg-[#333A73] w-full h-[80px] px-4 md:px-20">
        <div className="w-full h-full flex items-center justify-between ">
          <Link className=" font-extrabold text-[20px]" href={'/'}>
            EVENTLY
          </Link>
          {username ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gray-50 rounded-full border-none px-0 py-0 w-fit h-fit "
                >
                  <CircleUser className=" text-gray-600 w-8 h-8"></CircleUser>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Ticket className="mr-2 h-4 w-4" />
                  <span>My event</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Transaction</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Log out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:block">
              <div className="flex gap-5 items-center">
                <Link className="w-fit h-fit" href={'/signup'}>
                  <Button className="bg-white text-[#333A73] font-bold">
                    Sign Up
                  </Button>
                </Link>
                <Link className="w-fit h-fit" href={'/signin'}>
                  <Button className=" border border-lg border-white">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </CustRouter>
  );
};

export default Header;
