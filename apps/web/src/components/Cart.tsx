'use client';
import { max } from 'cypress/types/lodash';
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
  price: number;
  organizer?: string;
  image?: string;
}

const CartEvent: React.FunctionComponent<ICartEventProps> = (props) => {
  const router = useRouter();
  return (
    <Link href={`event/${props.children?.split(' ').join('-')}`}>
      <div className="w-[280px] h-[310px] shadow-md rounded-xl">
        <div className="w-full h-[160px] bg-gray-200 rounded-t-xl overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}eventpic/${props.image}`}
            alt=""
            width={1280}
            height={1160}
            className="h-[160px] w-[335px] "
          ></Image>
        </div>
        <div className="mx-4 my-2">
          <p className="text-lg font-medium">{trimText(props.children, 24)}</p>
          <div className=" flex items-center gap-2">
            <p className="text-xs text-gray-600">{props.startdate}</p>
            <p>-</p>
            <p className="text-xs text-gray-600">{props.enddate}</p>
          </div>
          {props.price == 0 ? (
            <p className="mt-3">free</p>
          ) : (
            <p className="mt-3">{rupiah(props.price)}</p>
          )}
          <div className="w-full text-right mt-5 text-sm">
            {props.organizer}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartEvent;
