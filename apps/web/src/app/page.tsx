'use client';
import CartEvent from '@/components/Cart';
import CategoryCart from '@/components/categoryCart';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { rupiah } from '@/lib/text';
import { convertDate } from '@/lib/text';
import DebounceSearch from '@/components/debounceSearch';

export default function Home() {
  const [newEvent, setNewEvent] = useState<any[]>();
  useEffect(() => {
    newsEvent();
  }, []);
  const newsEvent = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event`,
      );
      setNewEvent(response.data.reverse());
      console.log(response.data);
    } catch (error) { }
  };

  console.log(newEvent);
  const mapNewEvent = () => {
    return newEvent?.map((val: any, idx: number) => {
      return (
        <CarouselItem className="md:basis-1/4 mr-3 md:mr-8" key={idx}>
          <CartEvent
            price={val.price}
            startdate={convertDate(val.start_date)}
            enddate={convertDate(val.end_date)}
            image={val.flyer_event}
          >
            {val.title}
          </CartEvent>
        </CarouselItem>
      );
    });
  };
  return (
    <main className=" m-auto  md:py-20  md:px-0">
      <div className="w-full md:w-[1120px] h-[260px] md:h-[300px] m-auto mt-10 rounded-b-xl md:rounded-xl bg-red-100 overflow-hidden relative md:mb-5 ">
        <img
          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className=" absolute  md:-bottom-[120px] brightness-75"
          alt=""
        />

        <div className=" absolute bottom-10 left-10 md:left-10 z-10">
          <h1 className=" text-white text-2xl md:text-[36px] font-bold">
            Find Your Event Here
          </h1>
          <p className="text-white">
            &ldquo;Join our event for unforgettable moments and
            connections!&rdquo;
          </p>
        </div>
      </div>
      <div className="flex w-full md:w-[1120px] m-auto justify-between">
        <DebounceSearch></DebounceSearch>
        <p className="md:mb-6 font-medium text-[26px]  text-right  text-black pr-4">
          Welcome <span className="font-bold text-[#333A73]">ISA</span>
        </p>
      </div>
      {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
      <div className="mb-10 md:w-[1120px] m-auto">
        <p className=" font-medium text-[21px] ml-10 md:ml-0">Newest Event</p>
        <Carousel className="w-[280px] md:w-full m-auto">
          <CarouselContent className="py-4 md:px-2">
            {mapNewEvent()}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="w-full h-[fit] bg-[#333A73] mb-10 pb-10 pt-8">
        <h1 className=" text-white text-[24px] md:text-[30px] font-semibold  md:w-[1120px] m-auto px-12 mb-5">
          Find your interest
        </h1>
        <div className="w-full md:w-[1120px] m-auto flex flex-wrap justify-between px-12   gap-y-7">
          <CategoryCart image="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            Music
          </CategoryCart>
          <CategoryCart image="https://images.unsplash.com/photo-1504680177321-2e6a879aac86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            Nightlife
          </CategoryCart>
          <CategoryCart image="https://images.unsplash.com/photo-1630522791492-05f373da5543?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            Holidays
          </CategoryCart>
          <CategoryCart image="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            Hobby
          </CategoryCart>
          <CategoryCart image="https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            Food & Drink
          </CategoryCart>
          <CategoryCart image="https://images.unsplash.com/photo-1498673394965-85cb14905c89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            Other
          </CategoryCart>
        </div>
      </div>

      <div className="mb-5 w-[1120px] m-auto">
        <p className=" font-medium text-[21px]">This Month&apos;s Event</p>
        <Carousel>
          <CarouselContent className="py-4 px-2">
            <CarouselItem className="basis-1/4 mr-8">
              <CartEvent price={0}></CartEvent>
            </CarouselItem>
            <CarouselItem className="basis-1/4 mr-8">
              <CartEvent price={0}></CartEvent>
            </CarouselItem>
            <CarouselItem className="basis-1/4 mr-8">
              <CartEvent price={0}></CartEvent>
            </CarouselItem>
            <CarouselItem className="basis-1/4 mr-8">
              <CartEvent price={0}></CartEvent>
            </CarouselItem>
            <CarouselItem className="basis-1/4 mr-8">
              <CartEvent price={0}></CartEvent>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
