import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setFilterDataAction } from '@/lib/features/eventQuerySLice';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ISelectCnProps {
  placeholder: string;
  children: string;
  list: any[];
}

const SelectCn: React.FunctionComponent<ISelectCnProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <Select
      onValueChange={(e) => {
        dispatch(
          setFilterDataAction({
            [props.children.toLowerCase()]: e.toLowerCase().replace(/\s/g, ''),
          }),
        );
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{props.children}</SelectLabel>

          {props.list.map((val: any, idx: number) => {
            return (
              <SelectItem value={val} key={idx}>
                {val}
              </SelectItem>
            );
          })}

          <SelectItem value="oke">oke</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCn;
