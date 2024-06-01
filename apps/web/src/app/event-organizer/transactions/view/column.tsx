'use client';
import { ColumnDef } from '@tanstack/react-table';
import { rupiah } from '@/lib/text';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { convertDate } from '@/lib/text';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ModalTrans from './modalTrans';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id?: number;
  event?: string;
  total?: number;
  price?: number;
  discount?: number;
  point?: number;
  priceAfter: number;
  status?: 'submitted' | 'pending' | 'paid';
  name?: string;
  email?: string;
  date?: Date;
  invoice?: string;
  receipt?: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'event',
    header: ({ column }) => {
      return (
        <div className="min-w-[250px] flex items-center h-full">
          <button
            className=" px-0 font-bold "
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            Event
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const event = row.getValue('event');
      return (
        <div className="font-semibold text-black h-[41px] text-ellipsis">
          {String(event)}
        </div>
      );
    },
    meta: { className: 'hidden md:table-cell' },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <button
            type="button"
            className="px-0 font-bold"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            Customer
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue('name');
      const email: string = row.getValue('email');
      return (
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return <div className=" flex items-center h-full">Total Ticket</div>;
    },
    cell: ({ row }) => {
      const total = Number(row.getValue('total'));
      return <div>{total}</div>;
    },
    meta: { className: 'hidden md:table-cell' },
  },
  {
    accessorKey: 'price',
    header: 'Original Price',
    cell: ({ row }) => {
      const price = row.getValue('price');
      const rp = rupiah(Number(price));
      if (price) {
        return <div>{rp}</div>;
      } else {
        return <div className="font-semibold  text-green-700">free</div>;
      }
    },
    meta: { className: 'hidden md:table-cell' },
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: ({ row }) => {
      const price = row.getValue('discount');
      const rp = rupiah(Number(price));
      if (price) {
        return <div>{rp}</div>;
      } else {
        return <div className="font-semibold ">-</div>;
      }
    },
    meta: { className: 'hidden md:table-cell' },
  },
  {
    accessorKey: 'point',
    header: 'Point',
    cell: ({ row }) => {
      const price = row.getValue('point');
      const rp = rupiah(Number(price));
      if (price) {
        return <div>{rp}</div>;
      } else {
        return <div className="font-semibold">-</div>;
      }
    },
    meta: { className: 'hidden md:table-cell' },
  },
  {
    accessorKey: 'priceAfter',
    header: 'Total Price',
    cell: ({ row }) => {
      const price = row.getValue('priceAfter');
      const rp = rupiah(Number(price));
      if (price) {
        return <div className="font-bold">{rp}</div>;
      } else {
        return <div className="font-semibold ">-</div>;
      }
    },
    meta: { className: 'hidden md:table-cell' },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className="w-full flex justify-center items-center h-full ">
          <div>Status</div>
        </div>
      );
    },
    cell: ({ row }) => {
      const stat = row.getValue('status');
      return (
        <div className="w-full flex justify-center">
          <Badge
            className={cn('font-medium', {
              'bg-gray-300': stat === 'submitted',
              'bg-green-300': stat === 'paid',
              'bg-yellow-200': stat === 'pending',
            })}
          >
            {String(stat)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Transaction Date',
    cell: ({ row }) => {
      const date: Date = row.getValue('date');
      return <div>{convertDate(new Date(date))}</div>;
    },
    meta: { className: 'hidden md:table-cell' },
  },

  {
    accessorKey: 'email',
  },
  {
    accessorKey: 'invoice',
  },
  {
    accessorKey: 'receipt',
  },
  {
    accessorKey: 'id',
    header: 'Receipt',
    cell: ({ row }) => {
      const stat = String(row.getValue('status'));
      const invo = String(row.getValue('invoice'));
      const img = String(row.getValue('receipt'));
      const id = Number(row.getValue('id'));
      if (stat == 'pending') {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Check</Button>
            </DialogTrigger>
            <ModalTrans invoice={invo} image={img} id={id}></ModalTrans>
          </Dialog>
        );
      }
      return <></>;
    },
  },
];
