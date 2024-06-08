'use client';
import { convertDate } from '@/lib/text';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';

export function TicketSold() {
  const [dataDetail, setDataDetail] = useState<
    { ticket: number; date: string }[]
  >([]);
  useEffect(() => {
    getTicket();
  }, []);

  const getTicket = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}EO/ticket`,
        {
          headers: { Authorization: `Bearer ${Cookies.get('Token EO')}` },
        },
      );
      setDataDetail(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={dataDetail}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.4}
            ></stop>
            <stop
              offset="75%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.05}
            ></stop>
          </linearGradient>
        </defs>

        <Area
          dataKey="ticket"
          stroke="hsl(var(--primary))"
          fill="url(#color)"
        />
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val: Date, idx: number) => {
            if (idx === 0) return '';
            return convertDate(val);
          }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.3} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active) {
    return (
      <div className="px-2 py-1 bg-white rounded-md shadow-lg border border-gray-100">
        <h2
          className="text-sm text-center"
          style={{ color: 'hsl(var(--primary))' }}
        >
          {convertDate(label)}
        </h2>
        <Separator className="my-1" />
        <div className="font-extrabold">{payload[0].value} TICKET</div>
      </div>
    );
  }
}
