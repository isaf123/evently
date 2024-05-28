'use client';

import Header from '@/components/EO/SidebarEO/header';
import { Payment, columns } from './view/column';
import HeaderMobile from '@/components/EO/SidebarEO/header-mobile';
import SideNav from '@/components/EO/SidebarEO/side-nav';
import TableTransactionEOPage from '@/components/EO/Transaction-EO/table';
import React, { useEffect, useState } from 'react';
import { DataTable } from './view/data-table';
import Cookies from 'js-cookie';
import axios from 'axios';
import { price } from '@/lib/text';
import ModalTrans from './view/modalTrans';

const TransactionEOPage = () => {
  const [data, setData] = useState<Payment[]>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const tokenEO = Cookies.get('Token EO');
  useEffect(() => {
    getTransactionData();
  }, [page]);

  const getTransactionData = async () => {
    try {
      let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/transaction?page=${page}&pageSize=9`;
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
          event: val.event_title,
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

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1">
        <Header />
        <HeaderMobile />
        <div className="w-full min-h-screen  md:pl-[280px] py-10 pr-10">
          <p className="text-2xl font-bold">Transaction</p>
          {data && data.length ? (
            <DataTable
              columns={columns}
              data={data}
              page={page}
              setPage={setPage}
              totalPage={totalPage}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionEOPage;
