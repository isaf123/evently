'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { trimText } from '@/lib/text';
import { useEffect, useState } from 'react';
import { category, times } from '@/lib/text';
import EventDesccription from './view/EventDescription';
import EventDetail from './view/EventLocationPayment';
import EventDate from './view/EventDate';
import EventPromo from './view/EventPromo';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { showMessage } from '@/components/Alert/Toast';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Upload,
  PlusCircle,
  Calendar as CalendarIcon,
  CircleX,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import EventCategory from './view/EventCategory';
import AddressSeat from './view/AddressSeat';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { setSuccessLoginAction } from '@/lib/features/userSlice';
import SideNav from '@/components/EO/SidebarEO/side-nav';
import Header from '@/components/EO/SidebarEO/header';

interface IMakeEventProps { }

const MakeEvent: React.FunctionComponent<IMakeEventProps> = (props) => {
  const [active, setActive] = useState<Boolean>(false);
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [endDatePromo, setEndDatePromo] = React.useState<Date>();
  const [file, setFile] = React.useState<File | null>(null);
  const [picName, setPicName] = useState<string>('');
  const dispatch = useAppDispatch()

  const keepLogin = async () => {
    try {
      const tokenEO = Cookies.get('Token EO')
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/keeplogin`, {
        headers: { Authorization: `Bearer ${tokenEO}` }
      })
      dispatch(setSuccessLoginAction(response.data))
    } catch (error: any) {
      showMessage(error.response.data, "error")
    }
  }

  React.useEffect(() => {
    keepLogin()
  }, []);

  const createEvent = useAppSelector((state) => {
    return state.eventReducer;
  });
  console.log(createEvent);
  // console.log('ini tanggal', startDate);
  console.log(Cookies.get('Token EO'));
  console.log(startDate?.toISOString());
  console.log(endDate?.toISOString());

  const handleData = async () => {
    try {
      if (
        Object.values(createEvent).includes('') ||
        startDate == undefined ||
        endDate == undefined
      ) {
        throw 'please fill all data';
      }
      const {
        title,
        description,
        category,
        available_seat,
        event_type,
        price,
        location,
        address,
      } = createEvent;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event`,
        {
          title,
          start_date: startDate,
          end_date: endDate,
          description,
          category,
          available_seat,
          event_type,
          price,
          location,
          address,
        },
        { headers: { Authorization: `Bearer ${Cookies.get('Token EO')}` } },
      );
    } catch (error: any) {
      showMessage(error, 'error');
      console.log(error);
    }
  };

  return (
    <div className="w-full m-auto  min-h-screen py-20">
      <ToastContainer></ToastContainer>
      <div className='flex'>
        <SideNav />
      </div>
      <div className="flex-1">
        <Header />
      </div>
      <div className="flex justify-center items-start flex-col md:flex-row w-fit m-auto gap-8">
        <div>
          <EventDesccription></EventDesccription>
          <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <EventDetail></EventDetail>
              <AddressSeat></AddressSeat>
              <div className="grid gap-6 sm:grid-cols-2 mb-6">
                <div className="grid gap-3">
                  {/* <Label htmlFor="date1">Start Date</Label> */}
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Start Date
                  </p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !startDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-3">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    End Date
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !endDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {!active ? (
                <Button
                  className="bg-color2 text-white w-[150px] mb-5"
                  onClick={() => {
                    setActive(!active);
                  }}
                >
                  <div className="w-full h-full flex justify-center items-center gap-3">
                    <PlusCircle className="w-5 h-5"></PlusCircle>
                    <p>Add promo</p>
                  </div>
                </Button>
              ) : (
                <Button
                  className="bg-red-500 text-white w-[150px] mb-5"
                  onClick={() => {
                    setActive(!active);
                  }}
                >
                  <div className="w-full h-full flex justify-center items-center gap-3">
                    <CircleX className="w-5 h-5"></CircleX>
                    <p>cancel promo</p>
                  </div>
                </Button>
              )}
              {active ? <EventPromo></EventPromo> : <></>}
              {active ? (
                <div className="grid gap-6 sm:grid-cols-2 mb-6">
                  <div className="grid gap-3">
                    {/* <Label htmlFor="date1">Start Date</Label> */}
                    <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Valid date until
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
              ) : (
                <></>
              )}
            </CardContent>
          </Card>
        </div>

        {/*///////////////////////////////////////////////////////////////////////// SECTION KANAN /////////////////////////////////////////////////////////////////////*/}
        <div>
          <EventCategory></EventCategory>
          <Card
            className="overflow-hidden w-[360px]"
            x-chunk="dashboard-07-chunk-4"
          >
            <CardHeader>
              <CardTitle>Event Images</CardTitle>
              <CardDescription>
                Choose image for your event here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 gap-2">
                  <button className="relative aspect-square w-full items-center justify-center rounded-md border border-dashed">
                    <Upload className=" absolute left-[40px] top-10 h-4 w-4 text-muted-foreground" />

                    <input
                      type="file"
                      className="w-full h-full opacity-0 cursor-pointer"
                      id="photo-event"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          console.log(e.target.files[0].name);
                          setPicName(e.target.files[0].name);
                        }
                      }}
                    />
                  </button>
                  <div className="text-sm mt-10 ml-4">
                    {`${trimText(picName, 12)} `}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            className="w-full bg-color2 hover:bg-blue-400 text-white mt-8"
            onClick={() => {
              handleData();
            }}
          >
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MakeEvent;