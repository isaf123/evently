'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getTotalRevenue } from '@/api/EO/eo';
import { convertDate, rupiah } from '@/lib/text';
import { Separator } from '@/components/ui/separator';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { formatTabel } from '@/lib/text';
import { useAppSelector } from '@/lib/hooks';

export function Overview() {
  const [detailTrans, setDetailTrans] = useState<
    { price: number; date: string }[]
  >([]);

  const getDate = useAppSelector((state) => {
    return state.calendarSlice;
  });

  useEffect(() => {
    getRevenue();
  }, [getDate]);

  const getRevenue = async (token = Cookies.get('Token EO')) => {
    try {
      if (token) {
        const response = await getTotalRevenue(
          String(token),
          getDate.from,
          getDate.to,
        );
        setDetailTrans(response.detail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!detailTrans.length) {
    return (
      <div className="w-full h-[350px] bg-gray-100 flex justify-center items-center rounded-md ">
        <div className="text-sm text-gray-300">no transaction</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={detailTrans}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any, idx: number) => {
            if (!idx) {
              return '';
            }
            return `Rp${formatTabel(value)}`;
          }}
        />

        {/* <Tooltip
          formatter={(value) => `Rp${formatTabel(Number(value))}`}
          wrapperStyle={{
            fontSize: '16px',
            fontWeight: '700',
            borderRadius: '20px',
          }}
        /> */}
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="price"
          fill="#10B981"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
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
        {payload.length ? (
          <div className="font-extrabold">{rupiah(payload[0].value)}</div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
