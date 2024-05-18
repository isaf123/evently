'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users2 } from 'lucide-react';
import { trimText } from '@/lib/text';

import { Badge } from '@/components/ui/badge';
import Cookies from 'js-cookie';
import { convertDate } from '@/lib/text';
import { rupiah } from '@/lib/text';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
import { trimFormat } from '@/lib/text';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import axios from 'axios';
import { showMessage } from '@/components/Alert/Toast';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface ITableCheckoutProps {
  dataTrans: any[];
}

const TableCheckout: React.FunctionComponent<ITableCheckoutProps> = (props) => {
  const [page, setPage] = React.useState<number>(1);
  const [file, setFile] = React.useState<File | null>(null);
  const [transId, setTransId] = React.useState<number>(0);
  const [eventId, setEventId] = React.useState<number>(0);
  const [picName, setPicName] = React.useState<string>('');
  const router = useRouter();

  React.useEffect(() => {}, []);

  const postData = async () => {
    try {
      const formData = new FormData();
      if (!file) {
        throw 'please input the image';
      }

      if (!(trimFormat(picName) == 'png' || trimFormat(picName) == 'jpg')) {
        throw 'invalid file type';
      }

      if (file) {
        formData.append('imgTransaction', file);
      }

      formData.append('trans_id', transId.toString());
      formData.append('event_id', eventId.toString());
      const postPhoto = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}transaction-user/upload`,
        formData,
        { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );

      showMessage(postPhoto.data.result, 'success');

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        showMessage(error.response.data, 'error');
      }
      showMessage(error, 'error');
    }
  };

  console.log('ini file:', file);
  const mapping = () => {
    return props.dataTrans.map((val: any, idx: number) => {
      return (
        <TableRow key={idx}>
          <TableCell className="hidden sm:table-cell">
            <Image
              alt=""
              className=" rounded-md object-cover"
              height="64"
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}eventpic/${val.event.flyer_event}`}
              width="136"
            />
          </TableCell>
          <TableCell className="font-medium">
            <p className="hidden md:block">{trimText(val.event.title, 45)}</p>
            <p className="block md:hidden">{trimText(val.event.title, 8)}</p>
          </TableCell>
          <TableCell className="w-[172px]">
            <div className="flex w-full">
              {val.status_transaction == 'paid' ? (
                <Badge
                  variant="outline"
                  className="w-[80px] m-auto bg-green-600 text-white border-none "
                >
                  <div className="w-full flex justify-center">
                    {val.status_transaction}
                  </div>
                </Badge>
              ) : (
                <></>
              )}
              {val.status_transaction == 'submitted' ? (
                <Badge variant="outline" className="w-fit m-auto ">
                  {val.status_transaction}
                </Badge>
              ) : (
                <></>
              )}
              {val.status_transaction == 'pending' ? (
                <Badge
                  variant="outline"
                  className="w-[80px] m-auto bg-yellow-400 text-white border-none"
                >
                  <div className="w-full flex justify-center">
                    {val.status_transaction}
                  </div>
                </Badge>
              ) : (
                <></>
              )}
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {val.price_after_discount
              ? rupiah(val.price_after_discount)
              : 'free'}
          </TableCell>
          <TableCell className="hidden md:table-cell ">
            <p className="pl-7">{val.ticket_count}</p>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {convertDate(new Date(val.date_transaction))}
          </TableCell>
          <TableCell>
            {val.status_transaction !== 'submitted' || !val.total_price ? (
              <></>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger
                  className="px-4 py-3 bg-white border rounded-md shadow-sm text-xs font-medium"
                  onClick={() => {
                    setEventId(val.event_id);
                    setTransId(val.id);
                  }}
                >
                  Checkout
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Send your transaction receipt here.
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      File must be in .jpg or .png
                    </AlertDialogDescription>
                    <input
                      type="file"
                      className="cursor-pointer mt-4"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          setFile(e.target.files[0]);
                          setPicName(e.target.files[0].name);
                          console.log('dapet foto :', e.target.files[0]);
                        }
                      }}
                    />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-gray-900 text-white"
                      onClick={() => {
                        postData();
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0" className="h-[630px] mb-4">
            <CardContent>
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[200px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead className="md:w-[400px]">Name</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Ticket
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>Checkout</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">{mapping()}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TableCheckout;
