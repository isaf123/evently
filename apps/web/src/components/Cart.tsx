'use client';
import { max } from 'cypress/types/lodash';
import * as React from 'react';
import { trimText } from '@/lib/text';
import { useRouter } from 'next/navigation';
interface ICartEventProps {
  children?: string;
  date?: string;
  price?: string;
  organizer?: string;
  image?: string;
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
        <img src={props.image} alt="" />
      </div>
      <div className="mx-4 my-2">
        <p className="text-lg font-medium">{trimText(props.children, 24)}</p>
        <p className="text-xs text-gray-600">{props.date}</p>
        <p className="mt-3">{props.price}</p>
        <div className="w-full text-right mt-5 text-sm">{props.organizer}</div>
      </div>
    </div>
  );
};

export default CartEvent;
