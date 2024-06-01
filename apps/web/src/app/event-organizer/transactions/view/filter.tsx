'use client';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';

interface IFilterStatusProps {
  statusFilter: string;
  setStatusFilter: Function;
}

const FilterStatus: React.FunctionComponent<IFilterStatusProps> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={props.statusFilter == 'paid'}
          onCheckedChange={() => {
            props.setStatusFilter('paid');
          }}
        >
          Paid
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.statusFilter == 'pending'}
          onCheckedChange={() => {
            props.setStatusFilter('pending');
          }}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.statusFilter == 'submitted'}
          onCheckedChange={() => {
            props.setStatusFilter('submitted');
          }}
        >
          Submitted
        </DropdownMenuCheckboxItem>
        {props.statusFilter ? (
          <DropdownMenuCheckboxItem
            className="text-red-400"
            onCheckedChange={() => {
              props.setStatusFilter('');
            }}
          >
            Cancel
          </DropdownMenuCheckboxItem>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterStatus;
