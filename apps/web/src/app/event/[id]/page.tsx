'use client';
import * as React from 'react';
import { event, rupiah } from '@/lib/text';
import EventDetails from './view/EventDetails';
import TicketBuy from './view/TicketBuy';
import PromoPoin from './view/PromoPoin';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { convertDate } from '@/lib/text';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { keepLogin } from '@/services/authService';
import { useAppDispatch } from '@/lib/hooks';
import { setSuccessLoginAction } from '@/lib/features/userSlice';
import { useAppSelector } from '@/lib/hooks';
import ModalCOnfirm from './view/ModalConfirm';
import { trimText } from '@/lib/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ModalConfirm from './view/ModalConfirm';
import { Plus } from 'lucide-react';
import Cookies from 'js-cookie';
import { showMessage } from '@/components/Alert/Toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface IEventPageProps { }

const EventPage: React.FunctionComponent<IEventPageProps> = (props) => {
  const [bought, setbought] = React.useState<number>(0);
  const [activeModal1, setActiveModal1] = React.useState<Boolean>(false);
  const [data, setData] = React.useState<{
    description: string;
    title: string;
    start_date: string;
    address: string;
    location: string;
    end_date: string;
    event_type: string;
    id?: number;
    price: number;
    flyer_event: string;
    max_ticket: number;
    Vouchers: any[];
  }>({
    description: '',
    title: '',
    start_date: '',
    event_type: '',
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
  const transaction = useAppSelector((state) => {
    return state.transactionEventSlice;
  });

  // console.log('ini transaction', transaction);

  const router = useRouter();
  const path = pathname.split('/')[2];
  const role = Cookies.get('Token Cust');

  console.log('ini role:', role);
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

  const handleGetTicket = async () => {
    try {
      if (!role) {
        throw 'please login to make order';
      }

      if (role == 'eo') {
        throw 'invalid user';
      }

      if (!transaction.total_price) {
        throw 'please pick your ticket';
      }

      setActiveModal1(true);
    } catch (error: any) {
      showMessage(error, 'error');
      console.log(error);
    }
  };

  const getDataTicket = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event/detail/${path}`,
        // { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );

      const newData = { ...response.data.result };
      setData(newData);
      if (role) {
        const maxTicket = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}event/maxbuy/${path}`,
          { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
        );

        const count = maxTicket.data._sum.ticket_count;
        if (count) {
          setbought(count);
        } else {
          setbought(0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  console.log(transaction);

  return (
    <div>
      <ToastContainer></ToastContainer>
      {activeModal1 ? (
        <div>
          <div className="w-full h-full bg-black fixed top-0 opacity-35 z-40"></div>
          <div className=" w-[390px] min-h-[600px] h-fit fixed z-50 m-auto -inset-0 rounded-xl">
            <ModalConfirm
              active={setActiveModal1}
              information={data}
            ></ModalConfirm>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="md:w-[1220px] m-auto py-2 md:py-10 min-h-screen gap-6 flex flex-col md:flex-row px-3 ">
        <div className="  md:w-[800px]]">
          <div className="md:w-[800px] md:h-[376px] bg-gray-200 rounded-t-xl overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}eventpic/${data.flyer_event}`}
              alt=""
              width={800}
              height={376}
              className="md:h-[376px] w-[390px] md:w-[800px] "
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
            <p className="mb-8 tracking-wide text-gray-600">
              {data.description}
            </p>
          </div>
        </div>
        {/* ////////////////////////      KANAN          //////////////////////////////// */}
        <div className=" min-h-screen md:w-[30%]">
          <EventDetails
            date={`${convertDate(new Date(data.start_date))} - ${convertDate(new Date(data.end_date))}`}
          >{`${data.address}, ${data.location}`}</EventDetails>
          {bought == data.max_ticket ? (
            <Card x-chunk="dashboard-07-chunk-0 " className="w-full mb-6">
              <CardHeader>
                <CardTitle className="text-xl">..</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[62px] bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="fonr-medium text-gray-400 text-sm">
                    Reach Max Transaction
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              {data.price ? (
                <PromoPoin data={data.Vouchers}></PromoPoin>
              ) : (
                <></>
              )}
              <TicketBuy
                buyTicket={bought}
                price={data.price}
                maxTicket={data.max_ticket}
              ></TicketBuy>
              <Button
                className="bg-color2 text-white w-full"
                onClick={() => {
                  if (!role) {
                    showMessage('Login to make order', 'error');
                  } else if (!transaction.ticket_count) {
                    showMessage('Pick your ticket first', 'error');
                  } else {
                    setActiveModal1(true);
                  }
                }}
              >
                Get Ticket
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;