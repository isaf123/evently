import * as React from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';
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
            ? 'border bg-color1 border-gray-600 shadow-sm  text-white opacity-75'
            : 'border bg-color1 border-gray-600 shadow-sm  text-white opacity-100'
        }
        onClick={() => {
          if (props.page > 1) {
            props.setPage(props.page - 1);
          }
        }}
      >
        <MoveLeft></MoveLeft>
      </Button>
      <Button
        className={
          props.page == props.maxPage
            ? 'border bg-color1 border-gray-600 shadow-sm  text-white opacity-75'
            : 'border bg-color1 border-gray-600 shadow-sm  text-white opacity-100'
        }
        onClick={() => {
          if (props.page < props.maxPage) {
            props.setPage(props.page + 1);
          }
        }}
      >
        <MoveRight></MoveRight>
      </Button>
    </div>
  );
};

export default Pagination;
