'use client';
import Header from '@/components/EO/SidebarEO/header';
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile';
import SideNav from '@/components/EO/SidebarEO/side-nav';
import { Button } from '@/components/ui/button';
import { trimText } from '@/lib/text';
import Cookies from 'js-cookie';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { convertDate } from '@/lib/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { title } from 'process';
const DashboardEOPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [startDatePromo, setStartDatePromo] = useState<Date>();
  const [endDatePromo, setEndDatePromo] = useState<Date>();
  const [active, setActive] = useState<Boolean>(false);
  const [modal, setModal] = useState<{
    title: string;
    id: number;
    start_date: string;
    end_date: string;
  }>({
    title: '',
    id: 0,
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const cookies = Cookies.get('Token EO');
      // console.log(cookies);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/event`,
        {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        },
      );
      console.log('data event', response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(modal);
  const mapping = () => {
    return data.map((val: any, idx: number) => {
      return (
        <div
          className=" w-full md:w-[280px] h-[120px] rounded-lg px-3 py-2 border border-gray-400"
          key={idx}
        >
          <p className="font-medium text-lg">{trimText(val.title, 22)}</p>
          <div className=" flex items-center gap-2">
            <p className="text-xs text-gray-600">
              {convertDate(new Date(val.start_date))}
            </p>
            <p>-</p>
            <p className="text-xs text-gray-600">
              {convertDate(new Date(val.end_date))}
            </p>
          </div>

          <div className="w-full flex justify-end md:justify-normal">
            <Button
              className="bg-color2 text-white mt-2 border"
              type="button"
              onClick={(e) => {
                const newData = {
                  ...modal,
                  title: val.title,
                  id: val.id,
                  start_date: val.start_date,
                  end_date: val.end_date,
                };
                setModal(newData);
                setActive(!active);
              }}
            >
              add voucher
            </Button>
          </div>
        </div>
      );
    });
  };

  const createPromo = async () => {
    try {
      const responseEvent = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}promo`,

        { headers: { Authorization: `Bearer ${Cookies.get('Token EO')}` } },
      );
    } catch (error) {}
  };
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1">
        <Header />
        <HeaderMobile />
        <div className="flex flex-col container px-[20px]  my-[10px] mx-auto md:py-20">
          {active ? (
            <div className="bg-black h-full w-[1670px] fixed top-12 z-10 right-0 backdrop-blur-md opacity-50"></div>
          ) : (
            <></>
          )}
          <h1 className=" text-xl md:text-3xl font-bold mb-5 md:mx-[200px]">
            Create your voucher here
          </h1>
          <div className="w-full h-fit bg-white flex gap-8 flex-wrap relative md:mx-[200px]">
            {mapping()}
            {active ? (
              <Card
                x-chunk="dashboard-07-chunk-0 "
                className="w-[360px] md:w-[670px] mb-8 shadow-lg fixed md:top-40 md:right-[460px] bg-white py-4 z-20"
              >
                <CardHeader>
                  <CardTitle>{trimText(modal.title, 40)}</CardTitle>
                  <CardDescription>Create you event here, easy</CardDescription>
                </CardHeader>
                <CardContent>
                  <Plus
                    className="absolute top-6 right-6 rotate-45 cursor-pointer"
                    onClick={() => {
                      setActive(false);
                    }}
                  ></Plus>
                  <div className="grid gap-6 bg-white mb-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Voucher name</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        placeholder="Name your event here"
                        onChange={(e) => {}}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="promo">Discount (in %)</Label>
                      <Input id="promo" type="text" className="w-full" />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 mb-6">
                    <div className="grid gap-3">
                      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Start Date Promo
                      </p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !startDatePromo && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDatePromo ? (
                              format(startDatePromo, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white">
                          <Calendar
                            mode="single"
                            selected={startDatePromo}
                            onSelect={setStartDatePromo}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="grid gap-3">
                      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        End Date Promo
                      </p>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !endDatePromo && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDatePromo ? (
                              format(endDatePromo, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white">
                          <Calendar
                            mode="single"
                            selected={endDatePromo}
                            onSelect={setEndDatePromo}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Button className="bg-color2 text-white w-full">
                    create voucher
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEOPage;
