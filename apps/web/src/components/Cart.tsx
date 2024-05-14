'use client';
import { max } from 'cypress/types/lodash';
import * as React from 'react';
import { trimText } from '@/lib/text';
import { useRouter } from 'next/navigation';
import { rupiah } from '@/lib/text';
interface ICartEventProps {
  children?: string;
  startdate?: string;
  enddate?: string;
  price: number;
  organizer?: string;
  image?: null | string;
}

const CartEvent: React.FunctionComponent<ICartEventProps> = (props) => {
  const router = useRouter();
  return (
    <div
      className="w-[280px] h-[310px] shadow-md rounded-xl"
      onClick={() => {
        router.push(`/event/${props.children?.split(' ').join('')}`);
      }}
    >
      <div className="w-full h-[160px] bg-gray-200 rounded-t-xl overflow-hidden">
        <img
          src="http://localhost:3500/eventpic/EVENTPIC1715658625195.jpg"
          alt=""
        />
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
        <div className="w-full text-right mt-5 text-sm">{props.organizer}</div>
      </div>
    </div>
  );
};

export default CartEvent;
