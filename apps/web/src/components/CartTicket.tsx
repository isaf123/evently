'use client';

import * as React from 'react';
import { trimText } from '@/lib/text';
import { useRouter } from 'next/navigation';
import { rupiah } from '@/lib/text';
import Image from 'next/image';
import Link from 'next/link';
interface ICartEventProps {
  children?: string;
  startdate?: string;
  enddate?: string;
  price?: number;
  organizer?: string;
  image?: string;
}

const CartTicket: React.FunctionComponent<ICartEventProps> = (props) => {
  const router = useRouter();
  return (
    <div className="w-[170px] md:w-[220px] pb-1 md:pb-0 md:h-[220px] shadow-md rounded-xl">
      <div className="w-full h-[106px] bg-gray-200 rounded-t-xl overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}eventpic/${props.image}`}
          alt=""
          width={1280}
          height={1160}
          className="h-[106px] w-[220px] "
        ></Image>
      </div>
      <div className="mx-4 my-2">
        <p className="font-medium text-sm md:text-md hidden md:block">
          {trimText(props.children, 24)}
        </p>
        <p className="font-medium text-sm md:text-md block md:hidden">
          {trimText(props.children, 16)}
        </p>
        <div className=" flex items-center gap-2">
          <p className="text-[9px] md:text-xs text-gray-600">
            {props.startdate}
          </p>
          <p>-</p>
          <p className="text-[9px] md:text-xs text-gray-600">{props.enddate}</p>
        </div>
        <div className="flex justify-between mt-2 md:mt-4">
          <p className="text-xs bg-green-300 w-fit px-2 py-[1px] rounded-lg border-green-600 border">
            paid
          </p>
          <img src="/barcode.png" alt="" className="w-fit h-6" />
        </div>
        <div className="w-full text-right mt-5 text-sm">{props.organizer}</div>
      </div>
    </div>
  );
};

export default CartTicket;
