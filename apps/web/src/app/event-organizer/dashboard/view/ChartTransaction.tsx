'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getTotalRevenue } from '@/api/EO/eo';
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
import { rupiah } from '@/lib/text';

export function Overview() {
  const [detailTrans, setDetailTrans] = useState<
    { price: number; date: string }[]
  >([]);
  const [totalTrans, setTotalTrans] = useState<number>(0);

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
        setTotalTrans(response.total._sum.price_after_discount);
        console.log('total :', response.total);
        console.log(response.detail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!detailTrans.length) {
    return (
      <div className="w-full h-[350px] bg-gray-200 flex justify-center items-center rounded-md ">
        <div className="text-sm text-gray-300">no transaction</div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex justify-end">
        <div className="mb-2 font-semibold text-sm">{rupiah(totalTrans)}</div>
      </div>
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

          <Tooltip
            formatter={(value) => `Rp${formatTabel(Number(value))}`}
            wrapperStyle={{
              fontSize: '16px',
              fontWeight: '700',
              borderRadius: '20px',
            }}
          />

          <Bar
            dataKey="price"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
