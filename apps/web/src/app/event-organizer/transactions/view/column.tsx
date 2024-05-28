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
        <div className="min-w-[250px] ">
          <Button
            variant="ghost"
            className="text-ellipsis px-0 font-bold"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            Event
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const event = row.getValue('event');
      return (
        <div className="font-semibold text-black h-[41px]">{String(event)}</div>
      );
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return <div className="w-[46px] break-words">Total Ticket</div>;
    },
  },
  {
    accessorKey: 'price',
    header: 'Original price',
    cell: ({ row }) => {
      const price = row.getValue('price');
      const rp = rupiah(Number(price));
      if (price) {
        return <div>{rp}</div>;
      } else {
        return <div className="font-semibold text-green-700">free</div>;
      }
    },
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
        return <div className="font-semibold ">-</div>;
      }
    },
  },
  {
    accessorKey: 'priceAfter',
    header: 'After Discount',
    cell: ({ row }) => {
      const price = row.getValue('priceAfter');
      const rp = rupiah(Number(price));
      if (price) {
        return <div className="font-bold">{rp}</div>;
      } else {
        return <div className="font-semibold ">-</div>;
      }
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className="w-full flex justify-center px-0">
          <Button
            variant="ghost"
            className="px-0 font-bold"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
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
    header: 'Transaction date',
    cell: ({ row }) => {
      const date: Date = row.getValue('date');
      return <div>{convertDate(new Date(date))}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 font-bold"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
    header: ({ column }) => {
      return (
        <div className="w-full flex justify-center">
          <Button
            variant="ghost"
            className="font-bold"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            Proof
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const stat = String(row.getValue('status'));
      const invo = String(row.getValue('invoice'));
      const img = String(row.getValue('receipt'));
      const id = Number(row.getValue('id'));
      if (stat == 'pending') {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Share</Button>
            </DialogTrigger>
            <ModalTrans invoice={invo} image={img} id={id}></ModalTrans>
          </Dialog>
        );
      }
      return <></>;
    },
  },
];
