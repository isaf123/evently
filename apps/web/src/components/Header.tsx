"use client"
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { Search } from 'lucide-react';
import Link from 'next/link';

export const Header = () => {
  const token = Cookies.get("token Cust")
  const tokenEO = Cookies.get("token EO")

  return (
    <div>
      {tokenEO ? < div className="text-white bg-[#333A73] w-full h-[80px]" >
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
          {!token ?
            <div className="flex gap-5 mr-20 items-center">
              <Link className="mr-5 font-medium capitalize" href={'/explore'}>
                {' '}
                explore{' '}
              </Link>
              <Link className="w-fit h-fit" href={'/signup'}>
                <Button className="bg-white text-[#333A73] font-bold">
                  Sign Up
                </Button>
              </Link>
              <Link className="w-fit h-fit" href={'/signin'}>
                <Button className=" border border-lg border-white">Sign In</Button>
              </Link>

            </div> :
            <div className="">Oke</div>
          }        </div>
      </div > : <div className=''></div>
      }

    </div>
  );
};
