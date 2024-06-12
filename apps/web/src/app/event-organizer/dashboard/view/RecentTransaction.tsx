'use client';
import * as React from 'react';
import { ArrowUpRight } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { rupiah } from '@/lib/text';
import { convertDate } from '@/lib/text';

interface IRecentTransProps {}

const RecentTrans: React.FunctionComponent<IRecentTransProps> = (props) => {
  const [data, setData] = useState<Object[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}EO/recent-transaction`,
        {
          headers: { Authorization: `Bearer ${Cookies.get('Token EO')}` },
        },
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const mapping = () => {
    return data.map((val: any, idx: number) => {
      return (
        <TableRow key={idx}>
          <TableCell>
            <div className="font-medium">{val.user?.name}</div>
            <div className="hidden text-xs text-muted-foreground md:inline">
              {convertDate(val.date_transaction)}
            </div>
          </TableCell>
          <TableCell className="text-right">
            {rupiah(Number(val.price_after_discount))}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Card className="flex-1 min-w-fit">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-bold">Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your events.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1" variant={'link'}>
          <Link href="/event-organizer/transactions">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{mapping()}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTrans;
