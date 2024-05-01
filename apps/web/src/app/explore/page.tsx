'use client';
import DropDownSelected from '@/components/DropdownSelected';
import * as React from 'react';
import { location } from '@/lib/text';
import { category } from '@/lib/text';
import { times } from '@/lib/text';
import { price } from '@/lib/text';
import { useAppSelector } from '@/lib/hooks';
import CartEvent from '@/components/Cart';
import { Header } from '@/components/Header';

interface IExplorePageProps { }

const ExplorePage: React.FunctionComponent<IExplorePageProps> = (props) => {
  const event = useAppSelector((state) => {
    return state.eventReducer;
  });
  React.useEffect(() => {
    getEventFilter();
  }, [event]);

  const getEventFilter = () => {
    const filter = Object.keys(event).map((val: any) => {
      return `${val}=${event[val]}`;
    });

    console.log(`http://localhost:3500/event?${filter.join('&')}`);
  };
  return (
    <div className="flex h-fit w-full">
      {/* <Header /> */}
      <div className="h-fit min-h-[865px] w-[340px] border-r-[0.2px] border-color1 pt-10">
        <p className="w-full text-center font-bold text-lg text-color1">
          FILTER
        </p>
        <DropDownSelected list={location}>Locations</DropDownSelected>
        <DropDownSelected list={category}>Category</DropDownSelected>
        <DropDownSelected list={times}>Times</DropDownSelected>
        <DropDownSelected list={price}>Price</DropDownSelected>
      </div>
      <div className="h-[865px] m-auto w-[1300px] pt-10">
        <p className="text-color1 font-extrabold text-2xl mb-10">Find Event</p>
        <div className="w-full h-fit flex justify-between flex-wrap gap-y-8">
          <CartEvent></CartEvent>
          <CartEvent></CartEvent>
          <CartEvent></CartEvent>
          <CartEvent></CartEvent>
          <CartEvent></CartEvent>
          <CartEvent></CartEvent>
          <CartEvent></CartEvent>
          <CartEvent></CartEvent>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
