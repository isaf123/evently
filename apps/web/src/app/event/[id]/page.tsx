'use client';
import * as React from 'react';
import { event } from '@/lib/text';
import EventDetails from './view/EventDetails';
import TicketBuy from './view/TicketBuy';
import PromoPoin from './view/PromoPoin';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { convertDate } from '@/lib/text';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { keepLogin } from '@/services/authService';
import { useAppDispatch } from '@/lib/hooks';
import { setSuccessLoginAction } from '@/lib/features/userSlice';
import { useAppSelector } from '@/lib/hooks';
import { selectUserRole } from '@/lib/features/userSlice';
import Cookies from 'js-cookie';
interface IEventPageProps { }

const EventPage: React.FunctionComponent<IEventPageProps> = (props) => {
  const [data, setData] = React.useState<{
    description: string;
    title: string;
    start_date: string;
    address: string;
    location: string;
    end_date: string;
    id?: number;
    price: number;
    flyer_event: string;
    max_ticket: number;
    Vouchers: any[];
  }>({
    description: '',
    title: '',
    start_date: '',
    address: '',
    location: '',
    end_date: '',
    price: 0,
    flyer_event: '',
    max_ticket: 0,
    Vouchers: [],
  });
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const path = pathname.split('/')[2];

  React.useEffect(() => {
    getDataTicket();
    searchToken;
  }, []);

  const searchToken = async () => {
    try {
      const data = await keepLogin();
      if (data) {
        dispatch(setSuccessLoginAction(data));
      } else {
        // Jika tidak ada token, arahkan ke halaman sign-in
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getDataTicket = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event/detail/${path}`,
      );

      const newData = { ...data, ...response.data.result };
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:w-[1220px] m-auto md:py-10 min-h-screen gap-6 flex flex-col md:flex-row px-3">
      <div className=" min-h-screen md:w-[800px]]">
        <div className="w-[800px] h-[376px] bg-gray-200 rounded-t-xl overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}eventpic/${data.flyer_event}`}
            alt=""
            width={800}
            height={376}
            className="h-[376px] w-[800px] "
          ></Image>
        </div>

        <div className="md:w-[800px] m-auto h-fit mt-6">
          <p className=" font-bold text-2xl text-gray-700 tracking-wide break-words">
            {data.title}
          </p>
        </div>
        <div className="md:w-[800px] h-fit m-auto  mt-2 ">
          <h2 className="text-color1 font bold text-lg font-bold mb-4">
            Description :
          </h2>
          <p className="mb-8 tracking-wide text-gray-600">{data.description}</p>
        </div>
      </div>
      {/* ////////////////////////      KANAN          //////////////////////////////// */}
      <div className=" min-h-screen md:w-[30%]">
        <EventDetails
          date={`${convertDate(new Date(data.start_date))} - ${convertDate(new Date(data.end_date))}`}
        >{`${data.address}, ${data.location}`}</EventDetails>
        <PromoPoin data={data.Vouchers}></PromoPoin>
        <TicketBuy price={data.price} maxTicket={data.max_ticket}></TicketBuy>
        <Button className="bg-color2 text-white w-full">Buy Ticket</Button>
      </div>
    </div>
  );
};

export default EventPage;
