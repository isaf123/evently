'use client';
import * as React from 'react';
import Link from 'next/link';
import TableCheckout from './view/TableCheckout';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/navigation';
import { protectPageCust, protectPageEO } from '@/utils/protectPage';
import BarCustomerWeb from '@/components/BarCustomerWeb';
import BarCustomerMobile from '@/components/BarCustomerMobile';
import { dataTable } from '@/api/customer/checkout';

interface ICheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (props) => {
  const [page, SetPage] = React.useState<number>(1);
  const router = useRouter();

  React.useEffect(() => {
    if (protectPageEO()) {
      router.replace('/event-organizer/dashboard');
    }
  }, [page]);

  const data = dataTable(page)?.result;
  const totalPage = dataTable(page)?.totalPage;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <BarCustomerWeb></BarCustomerWeb>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <BarCustomerMobile></BarCustomerMobile>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">Checkout</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col px-2 md:px-6">
          {data?.length ? (
            <div>
              <TableCheckout page={page}></TableCheckout>
              <div className="flex w-full justify-end">
                <Pagination
                  page={page}
                  setPage={SetPage}
                  maxPage={totalPage}
                ></Pagination>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no transaction
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start get event as soon as you buy a ticket.
                </p>
                <Link href="/">
                  <Button className="mt-4 border shadow-lg">Get Events</Button>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CheckoutPage;
