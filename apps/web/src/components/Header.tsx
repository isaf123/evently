'use client'
import { Button } from '@/components/ui/button';
import { setLogoutAction, selectUserRole } from '@/lib/features/userSlice'; // Perhatikan bahwa saya mengubah ini untuk mengambil fungsi logout dan selector role
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Header = () => {


  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.userSlice.username); // Mengambil username dari Redux store

  const role = useAppSelector(selectUserRole); // Mengambil role pengguna dari Redux store

  console.log(role);


  const handleLogout = () => {
    // Dispatch action logout
    dispatch(setLogoutAction());
  };

  if (role === 'eo') {
    return null; // Jika role pengguna adalah "eo", kembalikan null untuk menyembunyikan header
  }

  return (
    <div className='text-white bg-[#333A73] w-full h-[80px]'>
      <div className="w-full h-full flex items-center justify-between mr-10">
        <Link className="ml-20 font-extrabold text-[20px]" href={'/'}>
          EVENTLY
        </Link>

        <div className="flex items-center">
          <input
            type="text"
            className="h-[34px] w-[420px] rounded-l-md"
            placeholder="Search Your Event"
          />
          <button className="bg-blue-500 h-[34px] w-[80px] rounded-r-md">
            <Search className="w-[80px]" />
          </button>
        </div>

        <div className="flex gap-5 mr-20 items-center">
          <Link className="mr-5 font-medium capitalize" href={'/explore'}>
            {' '}
            explore{' '}
          </Link>
          {role === 'customers' && ( // Hanya menampilkan tombol Sign Out jika pengguna adalah customers
            <Button onClick={handleLogout} className="border border-lg border-white">
              Sign Out
            </Button>
          )}
          {username ? ( // Jika ada username, tampilkan username
            <span className="mr-5 font-medium capitalize">{username}</span>
          ) : (
            <Link className="w-fit h-fit" href={'/signup'}>
              <Button className="bg-white text-[#333A73] font-bold">
                Sign Up
              </Button>
            </Link>
          )}
          {!username && ( // Jika tidak ada username, tampilkan tombol Sign In
            <Link className="w-fit h-fit" href={'/signin'}>
              <Button className=" border border-lg border-white">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
