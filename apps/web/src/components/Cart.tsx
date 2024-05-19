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
      <div className="w-[178px] md:w-[280px] md:h-[310px] shadow-md rounded-xl">
        <div className="w-full h-[120px] md:h-[165px] bg-gray-200 rounded-t-xl overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}eventpic/${props.image}`}
            alt=""
            width={1280}
            height={1160}
            className="h-[120px] md:h-[180px] w-[180px] md:w-[335px] "
          ></Image>
        </div>
        <div className="mx-4 my-1 pb-1">
          <p className="text-lg font-medium hidden md:block">
            {trimText(props.children, 24)}
          </p>
          <p className="text-md font-medium block md:hidden">
            {trimText(props.children, 13)}
          </p>
          <div className=" flex items-center gap-2">
            <p className="text-[10px] md:text-xs text-gray-600">
              {props.startdate}
            </p>
            <p>-</p>
            <p className="text-[10px] text-gray-600">{props.enddate}</p>
          </div>
          {props.price == 0 ? (
            <p className="md:mt-2 text-sm md:text-md">free</p>
          ) : (
            <p className="md:mt-2 text-sm md:text-md">{rupiah(props.price)}</p>
          )}
          <div className="w-full text-right mt-1 md:mt-5 text-sm border-t-2 pt-1 hidden md:block">
            {trimText(props.organizer, 29)}
          </div>
          <div className="w-full text-right mt-1 md:mt-5 text-sm border-t-2 pt-1 block md:hidden">
            {trimText(props.organizer, 15)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartEvent;
