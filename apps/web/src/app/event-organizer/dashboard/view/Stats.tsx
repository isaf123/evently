import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tag, HandCoins, UsersRound, Tent } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface IStatBarProps {}

const StatBar: React.FunctionComponent<IStatBarProps> = (props) => {
  const [getData, setGetData] = useState<any[]>([]);
  useEffect(() => {
    getStat();
  }, []);

  const getStat = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}EO`,
        {
          headers: { Authorization: `Bearer ${Cookies.get('Token EO')}` },
        },
      );
      console.log(response.data);
      setGetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const mapping = () => {
    return getData.map((val: any, idx: number) => {
      return (
        <Card className="flex-1 min-w-fit" key={idx}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">{val.title}</CardTitle>
            {val.title == 'Ticket Sold' ? (
              <Tag className="w-4 h-4 text-muted-foreground" />
            ) : (
              <></>
            )}
            {val.title == 'Your Events' ? (
              <Tent className="w-4 h-4 text-muted-foreground" />
            ) : (
              <></>
            )}
            {val.title == 'Customer' ? (
              <UsersRound className="w-4 h-4 text-muted-foreground" />
            ) : (
              <></>
            )}
            {val.title == 'Total Revenue' ? (
              <HandCoins className="w-4 h-4 text-muted-foreground" />
            ) : (
              <></>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{val.data}</div>
            <p className="text-xs text-muted-foreground">{val.desc}</p>
          </CardContent>
        </Card>
      );
    });
  };

  return <div className="flex flex-wrap gap-4">{mapping()}</div>;
};

export default StatBar;
