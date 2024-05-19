'use client';

import * as React from 'react';
import { trimText } from '@/lib/text';
import { useRouter } from 'next/navigation';
import { rupiah } from '@/lib/text';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
interface ICartReviewProps {
  children?: string;
  startdate?: string;
  enddate?: string;
  image?: string;
  review?: any[];
  eventId?: any;
  eventName?: any;
  Id?: number;
}

const CartReview: React.FunctionComponent<ICartReviewProps> = (props) => {
  return (
    <div className="w-[170px] md:w-[220px] pb-1 md:pb-0 md:min-h-[200px] shadow-md rounded-xl mt-4">
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
        <p className="font-medium  hidden md:block">
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

        <p className="text-xs text-white bg-green-500 w-fit px-2 py-[1px] rounded-lg border-green-600 border">
          finish
        </p>

        {!props.review?.length ? (
          <Button
            className=" md:mb-2 mt-4 w-full bg-gray-900 border text-white"
            onClick={() => {
              props.eventId(props.Id);
              props.eventName(props.children);
            }}
          >
            review
          </Button>
        ) : (
          <Button className=" md:mb-2 mt-4 w-full bg-gray-900 border text-white opacity-40 cursor-default">
            review
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartReview;
