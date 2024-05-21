'use client';
import * as React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Pagination from '@/components/Pagination';
import { usePathname } from 'next/navigation';
import BarCustomerWeb from '@/components/BarCustomerWeb';
import BarCustomerMobile from '@/components/BarCustomerMobile';
import CartReview from '@/components/CartReview';
import { convertDate } from '@/lib/text';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { trimText } from '@/lib/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import StarRating from '@/components/starRating';
import { showMessage } from '@/components/Alert/Toast';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface ICheckoutPageProps { }

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (props) => {
  const [data, setData] = React.useState<[]>([]);
  const [page, SetPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [active, setActive] = React.useState<Boolean>(false);
  const [rating, setRating] = React.useState<number>();
  const [review, setReview] = React.useState<string>('');
  const router = useRouter();
  const [sendData, setSendData] = React.useState({
    title: '',
    eventId: 0,
  });

  console.log(data);

  const path = usePathname();
  React.useEffect(() => {
    getDataTrans();
  }, []);

  const getDataTrans = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}review-ticket/rate`,
        { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );

      setData(response.data);
      setTotalPage(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const sendReview = async () => {
    try {
      if (!rating) {
        throw 'Please input rating';
      }

      if (!review) {
        throw 'Please input review';
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}review-ticket`,
        { review: review, rating: rating, event_id: sendData.eventId },
        { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );
      showMessage(response.data, 'success');
      setTimeout(() => {
        router.replace('/checkout');
      }, 1500);
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        showMessage(error.response.data, 'error');
      }
      showMessage(error, 'error');
    }
  };

  const mapping = () => {
    return data.map((val: any, idx: number) => {
      return (
        <div
          className="w-[170px] md:w-[220px] pb-1 md:pb-0 md:min-h-[200px] shadow-md rounded-xl mt-4"
          key={idx}
        >
          <div className="w-full h-[106px] bg-gray-200 rounded-t-xl overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}eventpic/${val.event.flyer_event}`}
              alt=""
              width={1280}
              height={1160}
              className="h-[106px] w-[220px] "
            ></Image>
          </div>
          <div className="mx-4 my-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium  hidden md:block">
                  {trimText(val.event.title, 15)}
                </p>
                <p className="font-medium text-sm md:text-md block md:hidden">
                  {trimText('aaaaaaaaaaaaaaaaaaa', 11)}
                </p>
              </div>
              <p className="text-xs  text-green-500 w-fit h-[16px] font-bold ">
                finish
              </p>
            </div>

            <div className=" flex items-center gap-2">
              <p className="text-[9px] md:text-xs text-gray-600">
                {convertDate(val.event.start_date)}
              </p>
              <p>-</p>
              <p className="text-[9px] md:text-xs text-gray-600">
                {convertDate(val.event.end_date)}
              </p>
            </div>

            {!val.event.reviews_event?.length ? (
              <Button
                className=" md:mb-2 mt-2 w-full bg-gray-900 border text-white"
                onClick={() => {
                  setActive(true);

                  setSendData({
                    title: val.event.title,
                    eventId: val.event.id,
                  });
                }}
              >
                review
              </Button>
            ) : (
              <Button className=" md:mb-2 mt-2 w-full bg-gray-900 border text-white opacity-40 cursor-default">
                review
              </Button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <BarCustomerWeb></BarCustomerWeb>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <BarCustomerMobile></BarCustomerMobile>
            <div className="w-full flex-1">
              <h1 className="text-lg font-semibold md:text-2xl">
                Rate and review
              </h1>
            </div>
          </header>
          <main className="flex flex-1 flex-col px-2 md:px-6">
            <div className="w-full h-fit md:px-6 min-h-[500px]">
              <div className="flex gap-2 flex-wrap ml-3 md:ml-0">
                {mapping()}
              </div>
            </div>
            <div className="flex w-full justify-end">
              <Pagination
                page={page}
                setPage={SetPage}
                maxPage={totalPage}
              ></Pagination>
            </div>

            {active ? (
              <div className="h-screen w-screen bg-black fixed opacity-40 z-10"></div>
            ) : (
              <></>
            )}

            {active ? (
              <Card
                x-chunk="dashboard-07-chunk-0 "
                className="w-[360px] md:w-[670px] mb-8 fixed mt-20 md:top-40 bg-white ml-2 md:ml-72 shadow-2xl z-20"
              >
                <CardHeader>
                  <CardTitle>{sendData.title}</CardTitle>
                  <CardDescription>
                    Submit your review and share your experience!
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-white">
                  <Plus
                    className="absolute top-4 right-4 rotate-45 cursor-pointer"
                    onClick={() => {
                      setActive(false);
                      setRating(0);
                      setReview('');
                      setSendData({
                        title: '',
                        eventId: 0,
                      });
                    }}
                  ></Plus>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <StarRating rating={setRating}></StarRating>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Review</Label>
                      <Textarea
                        id="description"
                        placeholder="Send your review"
                        className="min-h-32"
                        onChange={(e) => {
                          setReview(e.target.value);
                        }}
                      />
                    </div>

                    <Button
                      className="text-white bg-black"
                      onClick={() => {
                        sendReview();
                      }}
                    >
                      send review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <></>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
