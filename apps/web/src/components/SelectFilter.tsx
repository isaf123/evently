'use client';
import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { any } from 'cypress/types/bluebird';
import { useAppDispatch } from '@/lib/hooks';
import { setFilterDataAction } from '@/lib/features/eventQuerySLice';
import { Value } from '@radix-ui/react-select';

interface SelectedFilterProps {
  children: string;
  list: any;
}

const SelectedFilter: React.FunctionComponent<SelectedFilterProps> = (
  props,
) => {
  const [selectData, setSelectData] = React.useState<string>('');
  const dispatch = useAppDispatch();

  const sendQuery = () => {
    dispatch(
      setFilterDataAction({
        [props.children.toLowerCase()]: selectData
          .toLowerCase()
          .replace(/\s/g, ''),
      }),
    );
  };
  console.log(selectData);
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={props.children} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{props.children}</SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectedFilter;
