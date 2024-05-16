import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { trimText } from '@/lib/text';
import { TicketPercent, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { convertDate } from '@/lib/text';
import axios from 'axios';
import Cookies from 'js-cookie';

interface IPromoPoinProps {
  data: any[];
}

const PromoPoin: React.FunctionComponent<IPromoPoinProps> = (props) => {
  const [activeColor, setActiveColor] = React.useState<Boolean>(true);
  const [selectTitle, setSelectTitle] = React.useState<string>('');
  const [selectDiscount, setSelectDiscount] = React.useState<number>(0);
  const [active, setActive] = React.useState<Boolean>(true);
  const [pointUser, setPointUser] = React.useState<{
    amount: number;
    expiredAt: Date;
    usersId: number;
  }>({
    amount: 0,
    expiredAt: new Date(),
    usersId: 0,
  });
  const [voucherUser, SetVoucherUser] = React.useState<{
    name_voucher: string;
    discount: number;
    usersId: number;
    start_date: Date;
    end_date: Date;
    user_id: number;
  }>({
    name_voucher: '',
    discount: 0,
    usersId: 0,
    start_date: new Date(),
    end_date: new Date(),
    user_id: 0,
  });

  const role = Cookies.get('Token Cust');
  React.useEffect(() => {
    getVoucherPoin();
  }, []);

  // console.log('iniprops :', props.data);

  const getVoucherPoin = async () => {
    try {
      const voucherUser = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}voucher-user`,
        { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );

      const point = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}voucher-user/point`,
        { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );

      const data = voucherUser.data.result[0];
      const dataPoint = console.log('ini poin', point.data[0]);

      if (data) {
        SetVoucherUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(voucherUser);

  const mapping = () => {
    return props.data.map((val: any, idx: number) => {
      return (
        <CarouselItem className="" key={idx}>
          <div className="min-h-[84px] h-fit w-[240px]  border border-gray-200 shadow-sm rounded-md break-words px-3 py-3 text-sm">
            {val.name_voucher ? (
              <p className="font-bold">{trimText(val.name_voucher, 20)}</p>
            ) : (
              <p className="font-bold">....</p>
            )}
            <p className=" text-xs text-gray-600 mb-3">
              {`${convertDate(val.start_date)} - ${convertDate(val.end_date)}`}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <TicketPercent className="text-green-600"></TicketPercent>
                <p className="font-bold text-xl text-green-600">
                  {val.discount}%
                </p>
              </div>

              <Button
                className="border border-gray-200 h-[20px] bg-color2 text-white"
                onClick={() => {
                  setActive(!active);
                  setSelectTitle(val.name_voucher);
                  setSelectDiscount(val.discount);
                }}
              >
                use
              </Button>
            </div>
          </div>
        </CarouselItem>
      );
    });
  };

  const voucher = () => {
    if (role) {
      return (
        <CarouselItem className="">
          <div className="min-h-[84px] h-fit w-[240px]  border border-gray-200 shadow-sm rounded-md break-words px-3 py-3 text-sm">
            {voucherUser?.name_voucher ? (
              <p className="font-bold">
                {trimText(voucherUser?.name_voucher, 20)}
              </p>
            ) : (
              <p className="font-bold">....</p>
            )}
            <p className=" text-xs text-gray-600 mb-3">
              {`${convertDate(voucherUser.start_date)} - ${convertDate(voucherUser.end_date)}`}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <TicketPercent className="text-green-600"></TicketPercent>
                <p className="font-bold text-xl text-green-600">
                  {voucherUser.discount}%
                </p>
              </div>

              <Button
                className="border border-gray-200 h-[20px] bg-color2 text-white"
                onClick={() => {
                  setActive(!active);
                  setSelectTitle(voucherUser.name_voucher);
                  setSelectDiscount(voucherUser.discount);
                }}
              >
                use
              </Button>
            </div>
          </div>
        </CarouselItem>
      );
    } else {
      <></>;
    }
  };

  const point = () => {
    if (role) {
      return (
        <div className="min-h-[84px] h-fit w-[240px]  border border-gray-200 shadow-sm rounded-md break-words px-3 py-3 text-sm">
          {voucherUser?.name_voucher ? (
            <p className="font-bold">
              {trimText(voucherUser?.name_voucher, 20)}
            </p>
          ) : (
            <p className="font-bold">....</p>
          )}
          <p className=" text-xs text-gray-600 mb-3">
            {`${convertDate(voucherUser.start_date)} - ${convertDate(voucherUser.end_date)}`}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <TicketPercent className="text-green-600"></TicketPercent>
              <p className="font-bold text-xl text-green-600">
                {voucherUser.discount}%
              </p>
            </div>

            <Button
              className="border border-gray-200 h-[20px] bg-color2 text-white"
              onClick={() => {
                setActive(!active);
                setSelectTitle(voucherUser.name_voucher);
                setSelectDiscount(voucherUser.discount);
              }}
            >
              use
            </Button>
          </div>
        </div>
      );
    } else {
      <></>;
    }
  };

  return (
    <Tabs defaultValue="voucher" className="w-full mb-6">
      <TabsList className="grid w-full grid-cols-2 bg-gray-100">
        <TabsTrigger
          value="voucher"
          className={activeColor ? 'bg-white' : ''}
          onClick={() => {
            setActiveColor(true);
          }}
        >
          Voucher
        </TabsTrigger>
        <TabsTrigger
          value="point"
          className={!activeColor ? 'bg-white' : ''}
          onClick={() => {
            setActiveColor(false);
          }}
        >
          Point
        </TabsTrigger>
      </TabsList>
      <TabsContent value="voucher">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Voucher</CardTitle>
            <CardDescription>
              Get discount from promoter or your voucher
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {props.data.length || voucherUser.name_voucher ? (
              <Carousel className="w-[280px] md:w-[245px] m-auto">
                {active ? (
                  <CarouselContent className="md:basis-1/4 mr-3 md:mr-8 gap-6">
                    {mapping()}
                    {voucher()}
                  </CarouselContent>
                ) : (
                  <div className=" h-fit w-[240px]  border border-gray-200 shadow-sm rounded-md break-words  py-3 text-sm px-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          selected:{trimText(selectTitle, 8)}
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          {selectDiscount}%
                        </p>
                      </div>
                      <Plus
                        className="rotate-45 font-bold text-lg text-red-600"
                        onClick={() => {
                          setActive(!active);
                        }}
                      ></Plus>
                    </div>
                  </div>
                )}
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <></>
            )}
            {!props.data.length && !voucherUser.name_voucher ? (
              <div className="w-full h-[62px] bg-gray-100 rounded-md flex items-center justify-center">
                <p className="fonr-medium text-gray-400 text-sm">
                  discount not found
                </p>
              </div>
            ) : (
              <></>
            )}
          </CardContent>

          {/* <CardFooter></CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="point">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Point</CardTitle>
            <CardDescription>Reedem your point here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          {/* <CardFooter></CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PromoPoin;
