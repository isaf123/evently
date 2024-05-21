import * as React from 'react';
import { MoveRight, MoveLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IPaginationProps {
  page: number;
  setPage: any;
  maxPage: number;
}

const Pagination: React.FunctionComponent<IPaginationProps> = (props) => {
  return (
    <div className=" flex gap-4 text-2xl">
      <Button
        className={
          props.page == 1
            ? 'border bg-white  shadow-md  text-white opacity-35 px-3 py-3'
            : 'border bg-white shadow-md  text-white opacity-100 px-3 py-3'
        }
        onClick={() => {
          if (props.page > 1) {
            props.setPage(props.page - 1);
          }
        }}
      >
        <ChevronLeft className="text-black"></ChevronLeft>
      </Button>
      <Button
        className={
          props.page == props.maxPage
            ? 'border bg-white  shadow-md  text-white opacity-35 px-3 py-3'
            : 'border bg-white  shadow-md  text-white opacity-100 px-3 py-3'
        }
        onClick={() => {
          if (props.page < props.maxPage) {
            props.setPage(props.page + 1);
          }
        }}
      >
        <ChevronRight className="text-black"></ChevronRight>
      </Button>
    </div>
  );
};

export default Pagination;
