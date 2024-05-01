'use client';
import * as React from 'react';
import { event } from '@/lib/text';
import { Button } from '@/components/ui/button';
import { MdLocationOn } from 'react-icons/md';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { LuClock4 } from 'react-icons/lu';
import { rupiah } from '@/lib/text';

interface IEventPageProps {}

const EventPage: React.FunctionComponent<IEventPageProps> = (props) => {
  const [countTicket, setCountTicket] = React.useState<number>(0);
  const [active, setActive] = React.useState<Boolean>(true);

  const pickDescription = () => {
    if (active) {
      return 'w-[50%]  border-color2 border-b-[4px]';
    } else {
      return 'w-[50%]  border-color2';
    }
  };

  const pickTicket = () => {
    if (!active) {
      return 'w-[50%] border-color2 border-b-[4px]';
    } else {
      return 'w-[50%]  border-color2';
    }
  };

  return (
    <div className="md:w-[1120px] m-auto md:py-20 min-h-[820px] ">
      <div className="w-fit m-auto">
        <img
          src="https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240205125720.jpg"
          alt=""
        />
      </div>
      <div className=" flex md:w-[900px] m-auto text-center mt-10 h-[48px] text-color1 font-bold text-lg cursor-pointer">
        <p
          className={pickDescription()}
          onClick={() => {
            setActive(true);
          }}
        >
          Description
        </p>
        <p
          className={pickTicket()}
          onClick={() => {
            setActive(false);
          }}
        >
          Ticket
        </p>
      </div>
      {active ? (
        <div>
          <div className="flex flex-col md:flex-row  md:w-[800px] m-auto gap-[1px] ">
            <div className=" ml-4 md:ml-0 min-w-[360px]  md:min-w-[400px] border border-dashed border-color1 w-[320px]  md:h-[180px]  shadow-md rounded-2xl mt-4 px-5 md:px-10 py-6 flex flex-col gap-4 text-sm justify-center overflow-hidden">
              <div className="flex items-center  w-fit  gap-3">
                <MdLocationOn className="w-6 h-6 text-color1" />
                <p className="h-fit">Tennis Indor lapangan jakarta</p>
              </div>

              <div className="flex items-center w-fit gap-3">
                <MdOutlineCalendarToday className="w-6 h-6 text-color1" />

                <p className="h-fit">Tennis Indor lapangan jakarta</p>
              </div>
              <div className="flex items-center   w-fit gap-3">
                <LuClock4 className="w-6 h-6 text-color1" />

                <p className="h-fit">Tennis Indor lapangan jakarta</p>
              </div>
            </div>
            <div className="md:h-[180px] w-[360px] ml-[15px] md:ml-0 md:w-fit border border-dashed border-color1  shadow-md rounded-2xl mt-4 px-12 py-6 flex flex-col gap-4 justify-center">
              <p className="font-bold">{rupiah(event.price)}</p>
              <Button
                className="border bg-color1 text-white hover:bg-color2 ease-out"
                onClick={() => {
                  setActive(false);
                }}
              >
                Buy Ticket
              </Button>
            </div>
          </div>
          <div className="md:w-[800px] h-fit m-auto  mt-6 px-5">
            <h2 className="text-color1 font bold text-lg font-bold mb-4">
              Description :
            </h2>
            <p className="mb-8 tracking-wide text-gray-600">
              {event.description}
            </p>
            <h2 className="text-color1 font bold text-lg font-bold mb-4">
              Term & Condition :
            </h2>
            <p className="mb-8 tracking-wide text-gray-600">{event.term}</p>
          </div>
        </div>
      ) : (
        <div className="w-[370px] md:w-[800px] h-fit border-color2 border m-auto border-dashed rounded-2xl px-6 md:px-14 py-6 text-lg font-bold text-color1 mt-10 overflow-hidden">
          <p className="h-fit tracking-wide mb-8">{event.title}</p>
          <div className="flex items-center mt-10 mb-3 justify-between">
            <div className="flex gap-4 items-center">
              <p className="font-bold text-lg ">{rupiah(event.price)}</p>
              {countTicket > 0 ? (
                <p className="text-sm text-gray-400">x {countTicket}</p>
              ) : (
                <></>
              )}
            </div>
            <div className="flex gap-6">
              <button
                className="bg-color1 h-8 w-8 rounded-md text-white hover:bg-color2 ease-out"
                onClick={() => {
                  if (countTicket > 0) {
                    const newCount = countTicket - 1;
                    setCountTicket(newCount);
                  }
                }}
              >
                -
              </button>
              <p className="text-color1 w-7 text-center"> {countTicket}</p>
              <button
                className="bg-color1 h-8 w-8 rounded-md text-white hover:bg-color2 ease-out"
                onClick={() => {
                  const newCount = countTicket + 1;
                  setCountTicket(newCount);
                }}
              >
                +
              </button>
            </div>
          </div>
          {countTicket > 0 ? (
            <div>
              <div className="h-[1px] w-full border-gray-500 border m-auto border-dashed  opacity-40 "></div>
              <div className="flex items-center justify-between mt-4">
                <p className="font-bold text-lg  ">
                  {(event.price * countTicket).toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </p>
                <Button className="border bg-color1 text-white hover:bg-color2 ease-out">
                  Buy Ticket
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default EventPage;
