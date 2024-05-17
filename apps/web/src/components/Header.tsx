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

  return (
    <CustRouter>
      <div className="text-white bg-[#333A73] w-full h-[80px]">
        <div className="w-full h-full flex items-center justify-between mr-10">
          <Link className="ml-20 font-extrabold text-[20px]" href={'/'}>
            EVENTLY
          </Link>

          <div className="flex gap-5 mr-20 items-center">
            <Link className="mr-5 font-medium capitalize" href={'/explore'}>
              {' '}
              explore{' '}
            </Link>
            {username ? (
              <div className="flex gap-4 items-center justify-center">
                <Button
                  onClick={handleLogout}
                  className="border border-lg border-white"
                >
                  Sign Out
                </Button>
                <span className="mr-5 font-medium capitalize">{username}</span>
              </div> // Jika ada username, tampilkan username
            ) : (
              <Link className="w-fit h-fit" href={'/signup'}>
                <Button className="bg-white text-[#333A73] font-bold">
                  Sign Up
                </Button>
              </Link>
            )}
            {!username && ( // Jika tidak ada username, tampilkan tombol Sign In
              <Link className="w-fit h-fit" href={'/signin'}>
                <Button className=" border border-lg border-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </CustRouter>
  );
};

export default Header;
