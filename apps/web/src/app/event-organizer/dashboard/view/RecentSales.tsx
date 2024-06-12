import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { convertDate, rupiah } from '@/lib/text';

interface IRecentSalesProps {}

const RecentSales: React.FunctionComponent<IRecentSalesProps> = (props) => {
  const [data, setData] = useState<Object[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}EO/recent-event`,
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
        <div className="flex items-center gap-4" key={idx}>
          <div className="grid gap-1">
            <p className="font-medium leading-none">{val.title}</p>
            <p className="text-xs text-muted-foreground">
              {convertDate(val.start_date)}
            </p>
          </div>
          {val.price ? (
            <div className="ml-auto text-sm font-medium">
              {rupiah(val.price)}
            </div>
          ) : (
            <div className="ml-auto font-medium text-sm text-green-600">
              Free
            </div>
          )}
        </div>
      );
    });
  };
  return (
    <Card className="xl:flex-2 flex-1">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-bold">Events</CardTitle>
          <CardDescription>Your upcoming events</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1" variant={'link'}>
          <Link href="/event-organizer/events">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-8">{mapping()}</CardContent>
    </Card>
  );
};

export default RecentSales;
