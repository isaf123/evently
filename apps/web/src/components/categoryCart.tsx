'use client';
import * as React from 'react';
import Link from 'next/link';

interface IcateforyCartProps {
  image?: string;
  children?: string;
  onClick?: any;
  number?: number;
}

const CategoryCart: React.FunctionComponent<IcateforyCartProps> = (props) => {
  return (
    <Link
      href={`event/${props.children?.split(' ').join('-')}`}
      className="relative"
    >
      <p className="absolute text-white text-[180px] font-bold z-5 -left-[66px]">
        {props.number}
      </p>
      <div className="w-[320px] h-[180px] bg-gray-200 rounded-lg overflow-hidden relative  box-shadow: 0 2px 5px 5px rgba(59, 130, 246, 0.7)">
        <img src={props.image} alt="" className="brightness-[.65] h-full" />
        <p className="absolute bottom-3 left-6 text-white font-bold text-3xl">
          {props.children}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCart;
