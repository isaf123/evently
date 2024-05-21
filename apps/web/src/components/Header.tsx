'use client';
import { Button } from '@/components/ui/button';
import {
  setLogoutAction,
  selectUserRole,
  setSuccessLoginAction,
} from '@/lib/features/userSlice'; // Perhatikan bahwa saya mengubah ini untuk mengambil fungsi logout dan selector role
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Menu, MessageSquareDiff, Search } from 'lucide-react';
import Link from 'next/link';
import { showMessage } from './Alert/Toast';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  UserPlus,
  LogIn,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.userSlice.username); // Mengambil username dari Redux store

  const role = useAppSelector(selectUserRole); // Mengambil role pengguna dari Redux store

  const router = useRouter();

  const path = usePathname();

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

  return (
    <CustRouter>
      {path == '/your-ticket' ||
      path == '/checkout' ||
      path == '/review' ||
      path == '/profile-cust' ? (
        <></>
      ) : (
        <div className="text-white bg-[#333A73] w-full h-[80px] px-4 md:px-28">
          <div className="w-full h-full flex items-center justify-between ">
            <Link className=" font-extrabold text-[20px]" href={'/'}>
              EVENTLY
            </Link>
            {username ? (
              <div className="flex gap-4 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-gray-50 rounded-full border-none px-0 py-0 w-fit h-fit "
                    >
                      <CircleUser className=" text-gray-600 w-8 h-8"></CircleUser>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white ">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />

                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          router.push('/profile-cust');
                        }}
                      >
                        Profile
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          router.push('/checkout');
                        }}
                      >
                        Checkout
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Ticket className="mr-2 h-4 w-4 " />
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          router.push('/your-ticket');
                        }}
                      >
                        Your ticket
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <MessageSquareDiff className="mr-2 h-4 w-4 " />

                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          router.push('/review');
                        }}
                      >
                        Review
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          handleLogout();
                          router.push('/');
                        }}
                      >
                        Log out
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="  ">
                  <p className="text-xl font-bold">{username}</p>
                  <p className="text-xs">customer</p>
                </div>
              </div>
            ) : (
              <div>
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-gray-50 border-none px-2 py-2 w-fit h-fit block md:hidden"
                    >
                      <Menu className="text-black"></Menu>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-white ">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                    <DropdownMenuItem>
                      <UserPlus className="mr-2 h-4 w-4" />

                      <span
                        onClick={() => {
                          router.push('/signup');
                        }}
                      >
                        Sign up
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <LogIn className="mr-2 h-4 w-4" />
                      <Link className="w-fit h-fit" href={'/signin'}>
                        <span
                          onClick={() => {
                            router.push('/signin');
                          }}
                        >
                          Sign in
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      )}
    </CustRouter>
  );
};

export default Header;
