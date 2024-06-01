'use client';

import Header from '@/components/EO/SidebarEO/header';
import { Payment, columns } from './view/column';
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile';
import SideNav from '@/components/EO/SidebarEO/side-nav';
import React, { useEffect, useState } from 'react';
import { DataTable } from './view/data-table';
import Cookies from 'js-cookie';
import axios from 'axios';
import FilterStatus from './view/filter';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

const TransactionEOPage = () => {
  const [data, setData] = useState<Payment[]>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debounceValue] = useDebounce(search, 1200);
  const [getSort, setgetSort] = useState<{ type: string; order: string }>({
    type: 'date_transaction',
    order: 'desc',
  });
  const [statusFilter, setStatusFilter] = useState<string>('');

  const tokenEO = Cookies.get('Token EO');
  useEffect(() => {
    getTransactionData();
  }, [page, getSort, statusFilter, debounceValue]);

  const getTransactionData = async () => {
    try {
      const query = [];
      query.push(`page=${page}`);
      query.push(`pageSize=9`);
      query.push(`order=${getSort.type}-${getSort.order}`);
      query.push(`search=${debounceValue}`);
      if (statusFilter) query.push(`status=${statusFilter}`);

      const queryJoin = `?${query.join('&')}`;
      let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/transaction${queryJoin}`;
      const transaction = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tokenEO}`,
        },
      });

      const trans = transaction.data.result;
      // console.log(transaction.data.result);
      const newArr = trans.map((val: any, idx: number) => {
        return {
          id: val.id,
          event: val.event.title,
          total: val.ticket_count,
          price: val.total_price,
          discount: val.voucher_discount,
          point: val.point_discount,
          priceAfter: val.price_after_discount,
          status: val.status_transaction,
          name: val.user.name,
          email: val.user.email,
          date: val.date_transaction,
          invoice: val.invoice_code,
          receipt: val.img_payment,
        };
      });

      setData(newArr);
      setTotalPage(transaction.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1">
        <Header />
        <HeaderMobile />
        <div className="w-full min-h-screen  md:pl-[280px] sm:pr-14">
          <p className="text-2xl font-bold ml-2 sm:ml-0">Transaction</p>
          <div className="w-full sm:w-fit flex gap-2 items-center ">
            <Input
              className="w-[320px] h-[30px] mx-2 sm:mx-0"
              type="text"
              placeholder="seach by event or customer"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></Input>
            <FilterStatus
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            ></FilterStatus>
          </div>
          {data && data.length ? (
            <DataTable
              columns={columns}
              data={data}
              page={page}
              setPage={setPage}
              totalPage={totalPage}
            />
          ) : (
            <div className="bg-gray-200 w-[full] h-[710px] rounded-lg mt-2 flex items-center justify-center">
              <div className="font-semibold text-gray-300 text-lg">
                not found
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionEOPage;
