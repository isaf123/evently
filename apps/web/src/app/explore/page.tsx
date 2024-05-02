'use client';
import DropDownSelected from '@/components/DropdownSelected';
import * as React from 'react';
import { location, category, times, price, trimText } from '@/lib/text';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import CartEvent from '@/components/Cart';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { any } from 'cypress/types/bluebird';
import { time } from 'console';

interface IExplorePageProps {}

const ExplorePage: React.FunctionComponent<IExplorePageProps> = (props) => {
  const [select, setSelectData] = React.useState<any>({});

  const router = useRouter();

  React.useEffect(() => {
    getEventFilter();
  }, [select]);

  const getEventFilter = () => {
    const filter = Object.keys(select).map((val: any) => {
      return `${val}=${select[val]}`;
    });
    console.log(`http://localhost:3500/event?${filter.join('&')}`);
  };
  return (
    <div className=" h-fit w-full">
      {/* <Header /> */}

      <div className="h-[865px] m-auto w-[1300px] pt-10">
        <p className="text-color1 font-extrabold text-2xl mb-6">Find Event</p>
        <div className="w-[1300px] m-auto mb-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Filter</Button>
            </SheetTrigger>
            <SheetContent className="bg-white" side={'left'}>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription>
                  Find your event that you looking for
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4"></div>
                <div className="grid grid-cols-4 items-center gap-4"></div>
              </div>
              {/* select category */}
              <Select
                onValueChange={(e) => {
                  const newData = {
                    ...select,
                    category: e.toLocaleLowerCase(),
                  };
                  setSelectData(newData);
                }}
              >
                <SelectTrigger className="w-full mb-6 h-[54px]">
                  <SelectValue placeholder=" Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {category.map((val: any, idx: number) => {
                      return (
                        <SelectItem value={val} key={idx}>
                          {val}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* select location */}
              <Select
                onValueChange={(e) => {
                  const newData = {
                    ...select,
                    location: e.toLocaleLowerCase(),
                  };
                  setSelectData(newData);
                }}
              >
                <SelectTrigger className="w-full mb-6 h-[54px]">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Location</SelectLabel>
                    {location.map((val: any, idx: number) => {
                      return (
                        <SelectItem value={val} key={idx}>
                          {val}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* select times */}
              <Select
                onValueChange={(e) => {
                  const newData = {
                    ...select,
                    time: e.split(' ').join('').toLocaleLowerCase(),
                  };
                  setSelectData(newData);
                }}
              >
                <SelectTrigger className="w-full mb-6 h-[54px]">
                  <SelectValue placeholder="select times" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>times</SelectLabel>
                    {times.map((val: any, idx: number) => {
                      return (
                        <SelectItem value={val} key={idx}>
                          {val}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* select price */}
              <Select
                onValueChange={(e) => {
                  const newData = { ...select, price: e.toLocaleLowerCase() };
                  setSelectData(newData);
                }}
              >
                <SelectTrigger className="w-full mb-6 h-[54px]">
                  <SelectValue placeholder="select price" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>price</SelectLabel>
                    {price.map((val: any, idx: number) => {
                      return (
                        <SelectItem value={val} key={idx}>
                          {val}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                className="border"
                type="button"
                onClick={() => {
                  router.push('/explore');
                }}
              >
                clear filter
              </Button>
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-full h-fit flex justify-between flex-wrap gap-y-8">
          <CartEvent>none</CartEvent>
          <CartEvent>none</CartEvent>
          <CartEvent>none</CartEvent>
          <CartEvent>none</CartEvent>
          <CartEvent>none</CartEvent>
          <CartEvent>none</CartEvent>
          <CartEvent>none</CartEvent>
          <CartEvent>none</CartEvent>
        </div>

        {/* select Times */}
      </div>
    </div>
  );
};

export default ExplorePage;
