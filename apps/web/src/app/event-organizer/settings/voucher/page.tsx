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
import { showMessage } from '@/components/Alert/Toast';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
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

import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const DashboardEOPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [startDatePromo, setStartDatePromo] = useState<Date>();
  const [endDatePromo, setEndDatePromo] = useState<Date>();
  const [active, setActive] = useState<Boolean>(false);
  const [activeInfo, setActiveInfo] = useState<Boolean>(false);
  const [dataPromo, setDataPromo] = useState<any[]>([]);
  const [eventId, setEventId] = useState<number>();
  const router = useRouter();
  const [sendPromo, setSendPromo] = useState<{
    promo_name: string;
    discount: number;
  }>({
    promo_name: '',
    discount: 0,
  });
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

  useEffect(() => {
    getPromo();
  }, [eventId]);

  // console.log(eventId);
  const getData = async () => {
    try {
      const cookies = Cookies.get('Token EO');

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/event`,
        {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        },
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data);

  const mapping = () => {
    return data.map((val: any, idx: number) => {
      return (
        <div
          className=" w-full md:w-[260px] h-[120px] rounded-lg px-3 py-2 border border-gray-400"
          key={idx}
        >
          <p className="font-medium text-xl">{trimText(val.title, 18)}</p>
          <div className=" flex items-center gap-2">
            <p className="text-xs text-gray-600">
              {convertDate(new Date(val.start_date))}
            </p>
            <p>-</p>
            <p className="text-xs text-gray-600">
              {convertDate(new Date(val.end_date))}
            </p>
          </div>

          <div className="w-full flex justify-end md:justify-normal gap-2">
            <Button
              className=" text-black mt-2 border border-gray-300"
              type="button"
              onClick={() => {
                setEventId(val.id);
                setActiveInfo(true);
                const newData = { ...modal, title: val.title };
                setModal(newData);
              }}
            >
              Check promo details
            </Button>
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
              <Plus className="w-3 h-3 font-bold"></Plus>
            </Button>
          </div>
        </div>
      );
    });
  };

  const createPromo = async () => {
    try {
      if (Object.values(sendPromo).includes('')) {
        throw 'fill all the data';
      }

      if (
        isNaN(sendPromo.discount) ||
        sendPromo.discount > 99 ||
        sendPromo.discount < 1
      ) {
        throw 'invalid discount';
      }

      if (!startDatePromo || !endDatePromo) {
        throw 'fill the date';
      }

      if (startDatePromo && endDatePromo) {
        const startPromoTime = new Date(startDatePromo).getTime();
        const endPromoTime = new Date(endDatePromo).getTime();
        const startEventTime = new Date(modal.start_date).getTime();
        const endEventTime = new Date(modal.end_date).getTime();
        if (startPromoTime > startEventTime || endPromoTime > startEventTime) {
          throw 'invalid, cant exceed event date';
        }

        if (
          startPromoTime > endPromoTime ||
          startPromoTime < new Date().getTime()
        ) {
          throw 'invalid promo date';
        }
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}promo`,
        {
          name_voucher: sendPromo.promo_name,
          discount: sendPromo.discount,
          start_date: startDatePromo?.toISOString(),
          end_date: endDatePromo?.toISOString(),
          event_id: modal.id,
        },
        { headers: { Authorization: `Bearer ${Cookies.get('Token EO')}` } },
      );

      showMessage('create promo success', 'success');

      setTimeout(() => {
        router.push('/event-organizer/dashboard');
      }, 1200);
    } catch (error: any) {
      if (error.response) {
        showMessage(error.response.data, 'error');
      }
      showMessage(error, 'error');
    }
  };

  const getPromo = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}promo/${eventId}`,
        { headers: { Authorization: `Bearer ${Cookies.get('Token EO')}` } },
      );

      setDataPromo(response.data[0].Vouchers);
      console.log(response.data[0].Vouchers);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('ini data promo :', dataPromo);

  const promoMapping = () => {
    return dataPromo.map((val: any, idx: number) => {
      return (
        <div
          className="border-b-2 border-gray-100 py-2 flex items-center justify-between"
          key={idx}
        >
          <div>
            {val.name_voucher ? (
              <p className="font-bold">{val.name_voucher}</p>
            ) : (
              <p className="font-bold">..</p>
            )}
            <div className=" flex items-center gap-2">
              <p className="text-xs text-gray-600">
                {convertDate(val.start_date)}
              </p>
              <p>-</p>
              <p className="text-xs text-gray-600">
                {convertDate(val.end_date)}
              </p>
            </div>
          </div>
          <p className="text-xl font-bold text-green-600">{val.discount}%</p>
        </div>
      );
    });
  };
  return (
    <div className="flex">
      {active ? (
        <div className="bg-black w-full h-full fixed z-10 opacity-50"></div>
      ) : (
        <></>
      )}
      {activeInfo ? (
        <div className="bg-black w-full h-full fixed z-10 opacity-50"></div>
      ) : (
        <></>
      )}
      <SideNav />
      <div className="flex-1">
        <Header />
        <HeaderMobile />
        <div className="flex flex-col container px-[20px]  my-[10px] mx-auto md:py-20">
          <ToastContainer></ToastContainer>

          <h1 className="md:mx-[200px] text-xl md:text-3xl font-bold mb-6">
            Create Your Promo Here
          </h1>

          <div className="md:w-[1400px] h-fit bg-white flex gap-8 flex-wrap relative md:mx-[200px]">
            {mapping()}

            {active ? (
              <Card
                x-chunk="dashboard-07-chunk-0"
                className="w-[360px] md:w-[670px] mb-8 shadow-lg fixed md:top-40 md:right-[460px] bg-white py-4 z-20"
              >
                <CardHeader>
                  <CardTitle>{trimText(modal.title, 40)}</CardTitle>
                  <div className=" flex items-center gap-2">
                    <p className="text-xs text-gray-600">
                      {convertDate(new Date(modal.start_date))}
                    </p>
                    <p>-</p>
                    <p className="text-xs text-gray-600">
                      {convertDate(new Date(modal.end_date))}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="shado-xl">
                  <Plus
                    className="absolute top-6 right-6 rotate-45 cursor-pointer"
                    onClick={() => {
                      setActive(false);
                      setSendPromo({ discount: 0, promo_name: '' });
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
                        onChange={(e) => {
                          const newData = {
                            ...sendPromo,
                            promo_name: e.target.value,
                          };
                          setSendPromo(newData);
                        }}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="promo">Discount (in %)</Label>
                      <Input
                        id="promo"
                        type="text"
                        className="w-full"
                        placeholder="ex : 20"
                        onChange={(e) => {
                          const newData = {
                            ...sendPromo,
                            discount: Number(e.target.value),
                          };
                          setSendPromo(newData);
                        }}
                      />
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
                  <Button
                    className="bg-color2 text-white w-full"
                    onClick={() => {
                      createPromo();
                    }}
                  >
                    create voucher
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <></>
            )}
            {activeInfo ? (
              <Card
                x-chunk="dashboard-07-chunk-0 "
                className="w-[360px] md:w-[430px] mb-8 fixed md:top-40 md:right-[620px] bg-white py-4 z-20"
              >
                <CardHeader>
                  <CardTitle>{modal.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <Plus
                      className="absolute top-6 right-6 rotate-45 cursor-pointer"
                      onClick={() => {
                        setActiveInfo(false);
                      }}
                    ></Plus>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Your promo</Label>
                      <div className="w-full h-[400px]  border border-gray-200 rounded-lg overflow-y-auto">
                        <div className="w-full h-fit px-3 py-3">
                          {promoMapping()}
                        </div>
                      </div>
                    </div>
                  </div>
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
