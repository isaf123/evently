'use client';
import CartEvent from '@/components/Cart';
import CategoryCart from '@/components/categoryCart';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { rupiah } from '@/lib/text';
import { convertDate } from '@/lib/text';
import DebounceSearch from '@/components/debounceSearch';
import Pagination from '@/components/Pagination';
import { protectPageCust } from '@/utils/protectPage';
import { useRouter } from 'next/navigation';
import FilterSection from './view/filter';
import Cookies from 'js-cookie';

export default function Home() {
  const [newEvent, setNewEvent] = useState<any[]>();
  const [topEvent, setTopEvent] = useState<any[]>([]);
  const [page1, setPage1] = useState<number>(1);
  const [totalPage1, setTotalPage1] = useState<number>(1);

  const router = useRouter();
  const roleEO = Cookies.get('Token EO');

  useEffect(() => {
    newsEvent();
  }, [page1]);

  useEffect(() => {
    if (roleEO) {
      router.replace('/event-organizer/dashboard');
    }
    getTop();
  }, []);

  const getTop = async () => {
    try {
      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event/event-top`,
      );
      setTopEvent(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newsEvent = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event?page=${page1}&pageSize=4`,
      );

      setNewEvent(response.data.result);
      setTotalPage1(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const mapNewEvent = () => {
    return newEvent?.map((val: any, idx: number) => {
      return (
        <div key={idx}>
          <CartEvent
            price={val.price}
            startdate={convertDate(val.start_date)}
            enddate={convertDate(val.end_date)}
            image={val.flyer_event}
            organizer={val.user_id.name}
          >
            {val.title}
          </CartEvent>
        </div>
      );
    });
  };

  const mapTopEvent = () => {
    return (
      topEvent &&
      topEvent.map((val: any, idx: number) => {
        return (
          <div key={idx}>
            <CategoryCart
              image={`${process.env.NEXT_PUBLIC_BASE_API_URL}eventpic/${val.flyer_event}`}
              number={idx + 1}
            >
              {val.title}
            </CategoryCart>
          </div>
        );
      })
    );
  };

  return (
    <main className=" m-auto  md:px-0 bg-gray-50">
      <div className="w-full md:w-[1190px] h-[260px] md:h-[300px] m-auto rounded-b-xl md:rounded-xl bg-red-100 overflow-hidden relative mb-5 top-0 md:mt-20">
        <img
          className="hidden md:block"
          src="/landingphoto2web.png
        "
          alt=""
        />
        <img
          className="block md:hidden"
          src="/landingphoto2mobile.png"
          alt=""
        />
        <div className=" absolute bottom-10  md:left-20 z-10 w-fit md:w-[600px]">
          <h1 className=" text-white text-2xl md:text-[36px] font-bold text-center md:text-start mb-2">
            Find Your Event Here
          </h1>
          <p className="text-white mb-6 text-center md:text-start">
            &ldquo;Join our event for unforgettable moments and
            connections!&rdquo;
          </p>
          <div className="flex w-full md:w-[1190px] md:m-auto md:mx-none justify-center md:justify-start mb-6">
            <DebounceSearch></DebounceSearch>
          </div>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
      <div className="mb-10 md:w-[1190px] m-auto">
        <p className=" font-bold text-[21px] ml-10 md:ml-0 mb-4">
          Newest Event
        </p>
        {newEvent ? (
          <div>
            <div className="h-[512px] md:h-fit w-[370px] md:w-full m-auto mb-4">
              <div className="flex gap-3 md:gap-[23px] flex-wrap mb-6 w-fit  md:mx-0">
                {mapNewEvent()}
              </div>
            </div>
            <div className="flex w-full justify-end pr-4 md:pr-0">
              <Pagination
                page={page1}
                setPage={setPage1}
                maxPage={totalPage1}
              ></Pagination>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 w-full h-[300px] rounded-lg flex items-center justify-center mb-6">
            <p className="text-2xl text-gray-300">Event not Available</p>
          </div>
        )}
      </div>

      <div className="w-full  h-fit min-h-[590px] bg-[#333A73] mb-10 pt-10 pb-20">
        <h1 className=" text-white text-[24px] md:text-[30px] font-semibold  md:w-[1230px] m-auto px-12 mb-5">
          Top event this Month
        </h1>
        <div className="w-full md:w-[1230px] m-auto flex flex-wrap justify-between px-12  gap-y-14 ">
          {mapTopEvent()}
        </div>
      </div>

      <FilterSection></FilterSection>
    </main>
  );
}
