import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { GrLocation } from 'react-icons/gr';

import { MdOutlineCalendarToday } from 'react-icons/md';
import { LuClock4 } from 'react-icons/lu';

interface IPaymentPageProps {}

const PaymentPage: React.FunctionComponent<IPaymentPageProps> = (props) => {
  return (
    <div className="md:w-[1080px] min-h-[680px] bg-[#EEF5FF] md:bg-gray-50 m-auto rounded-xl shadow-lg mt-16 flex flex-col md:flex-row justify-between items-center overflow-hidden">
      <div className="w-fit md:m-auto mx-4">
        <Image
          src="/event1.jpg"
          alt=""
          width={500}
          height={170}
          className="mb-6"
        />

        <div className="flex gap-4 items-center mb-4">
          <GrLocation className="w-6 h-6 text-color1" />
          <p className="text-sm font-medium">Tennis Indor lapangan jakarta</p>
        </div>
        <div className="flex gap-4 items-center mb-4">
          <MdOutlineCalendarToday className="w-6 h-6 text-color1" />
          <p className="text-sm font-medium">18 May 2024</p>
        </div>
        <div className="flex gap-4 items-center">
          <LuClock4 className="w-6 h-6 text-color1" />
          <p className="text-sm font-medium">19:00 - 22:00 WIB </p>
        </div>
      </div>
      <div className="w-[400px] h-full md:h-[680px]  py-10 md:py-20 bg-[#EEF5FF] px-6">
        <h1 className="w-fit m-auto font-semibold text-sm mb-4">
          {' '}
          Total amount
        </h1>
        <p className="font-bold text-3xl w-fit m-auto mb-4">Rp 500.000</p>
        <p className="w-fit m-auto text-xs mb-16">Your Payment</p>
        <div className="w-full border-[1px] h-[.1px] mb-10"></div>
        <p className="w-fit text-xs mb-6 font-medium text-color3">
          Order Summary
        </p>
        <div className=" text-sm flex justify-between font-semibold mb-2">
          <p>Tiket Festival Lebaran Hari Raya d..</p>
          <p>Rp 50.000</p>
        </div>
        <div className=" text-xs  font-medium text-color3 flex justify-between mb-10">
          <p>amount</p>
          <p>x 10</p>
        </div>
        <div className="w-full border-[1px] h-[.1px] mb-4"></div>
        <div className=" text-xs text-color3 flex justify-between mb-2">
          <p className="text-base">Total</p>
          <p className="text-base text-color2 font-bold mb-8">Rp 500.000</p>
        </div>
        <Button className="text-white bg-color2 w-full mb-2">
          {' '}
          make payment
        </Button>
        <button className="w-fit m-auto text-sm text-color2">
          {' '}
          send payment receipt
        </button>
        {/* <div className="w-full border-[1px] h-[.1px] mb-4"></div> */}
      </div>
    </div>
  );
};

export default PaymentPage;
