'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { trimText, trimFormat } from '@/lib/text';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import EventCategory from './view/EventCategory';
import AddressSeat from './view/AddressSeat';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { setSuccessLoginAction } from '@/lib/features/userSlice';
import SideNav from '@/components/EO/SidebarEO/side-nav';
import Header from '@/components/EO/SidebarEO/header';
import { keepLogin } from '@/services/authService';
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile';
import { setCreateEventAction } from '@/lib/features/createEventSlice';

interface IMakeEventProps { }

const MakeEvent: React.FunctionComponent<IMakeEventProps> = (props) => {
  const [active, setActive] = useState<Boolean>(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startDatePromo, setStartDatePromo] = useState<Date>();
  const [endDatePromo, setEndDatePromo] = useState<Date>();
  const [activeDate, setActiveDate] = useState<Boolean>(true);
  const [file, setFile] = React.useState<File | null>(null);
  const [picName, setPicName] = useState<string>('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const createEvent = useAppSelector((state) => {
    return state.eventReducer;
  });

  const promoEvent = useAppSelector((state) => {
    return state.promoEventSlice;
  });

  console.log(createEvent);
  console.log(promoEvent);
  React.useEffect(() => {
    searchToken();
  }, []);
  React.useEffect(() => {
    validateDate();
  }, [startDate, endDate]);

  // Keep Login for customer
  const searchToken = async () => {
    try {
      const data = await keepLogin();
      if (data) {
        dispatch(setSuccessLoginAction(data));
      } else {
        // Jika tidak ada token, arahkan ke halaman sign-in
        router.push('/signin');
      }
    } catch (error: any) {
      showMessage(error, 'error');
    }
  };

  const validateDate = () => {
    if (!startDate || !endDate) {
      setActiveDate(true);
    } else if (startDate.getTime() > endDate.getTime()) {
      setActiveDate(false);
    } else if (startDate.getTime() < new Date().getTime()) {
      setActiveDate(false);
    } else if (startDate.getTime() < endDate.getTime()) {
      setActiveDate(true);
    }
  };
  console.log(trimFormat(picName));

  console.log('ini start', startDatePromo);
  console.log('ini end', endDatePromo);
  const handleData = async () => {
    try {
      if (
        Object.values(createEvent).includes('') ||
        startDate == undefined ||
        endDate == undefined
      ) {
        throw 'please fill all data';
      }

      if (activeDate == false) {
        throw 'Invalid date';
      }

      if (createEvent.event_type == 'paid' && createEvent.price < 100) {
        throw 'invalid price';
      }

      if (createEvent.available_seat < 1) {
        throw 'invalid seat';
      }

      if (!(trimFormat(picName) == 'png' || trimFormat(picName) == 'jpg')) {
        throw 'invalid file type';
      }

      const formData = new FormData();
      if (file) {
        formData.append('flyer_event', file);
      }
      formData.append('title', createEvent.title);
      formData.append('description', createEvent.description);
      formData.append('category', createEvent.category);
      formData.append('available_seat', createEvent.available_seat);
      formData.append('event_type', createEvent.event_type);
      formData.append('price', createEvent.price);
      formData.append('location', createEvent.location);
      formData.append('address', createEvent.address);
      formData.append('start_date', startDate.toISOString());
      formData.append('end_date', endDate.toISOString());

      const responseEvent = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer`,
        formData,
        { headers: { Authorization: `Bearer ${Cookies.get('Token EO')}` } },
      );

      console.log(responseEvent.data.result.id);
      showMessage(responseEvent.data.message, 'success');
      dispatch(
        setCreateEventAction({
          title: '',
          description: '',
          category: '',
          available_seat: 0,
          event_type: '',
          price: 0,
          location: '',
          address: '',
        }),
      );

      router.replace('/event-organizer/events');
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        showMessage(error.response.data, 'error');
      }
      showMessage(error, 'error');
    }
  };

  return (
    <div className="">
      <ToastContainer></ToastContainer>
      <div className="flex">
        <SideNav />
      </div>
      <div className="flex-1">
        <Header />
        <HeaderMobile />
        <div className="flex justify-center items-center md:items-start flex-col md:flex-row w-fit md:ml-[300px] gap-8 my-10 m-auto">
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

                {/* ////////////////////////////////////////////     PROMOS   ///////////////////////////////////////////////////// */}
                {active ? <EventPromo></EventPromo> : <></>}
                {active ? (
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
                  Image must be in <span className="italic">.jpg/.png</span>{' '}
                  format
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
                            setFile(e.target.files[0]);
                            setPicName(e.target.files[0].name);
                          }
                        }}
                      />
                    </button>
                    <div className="text-sm mt-10 ml-4">
                      {`${trimText(picName, 12)} .${trimFormat(picName)}`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-color2 hover:bg-blue-400 text-white mt-8"
                >
                  Create your event
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Create event</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you absolutely sure? This action will create your event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-color2 text-white"
                    onClick={() => {
                      handleData();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeEvent;
