'use client';
import * as React from 'react';
import CartEvent from '@/components/Cart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { category, convertDate } from '@/lib/text';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import axios from 'axios';
import { title } from 'process';
import Pagination from '@/components/Pagination';

interface IFilterSectionProps {}

const FilterSection: React.FunctionComponent<IFilterSectionProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [getCategory, setGetCategory] = React.useState<string>('');
  const [location, setLocation] = React.useState<string>('');
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [saveData, setSaveData] = React.useState<any[]>([]);
  const [getLocations, setGetLocations] =
    React.useState<{ value: string; label: string }[]>();

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    filterDate();
  }, [getCategory, location, startDate, endDate, page]);

  const getData = async () => {
    try {
      const response = await axios.get(
        'https://alamat.thecloudalert.com/api/kabkota/get',
      );
      setGetLocations(
        response.data.result.map((val: any, idx: number) => {
          return { value: val.text, label: val.text };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filterDate = async () => {
    try {
      const query = [];
      if (getCategory) query.push(`category=${getCategory}`);
      if (location) query.push(`location=${encodeURIComponent(location)}`);
      if (startDate) query.push(`start_date=${startDate.toISOString()}`);
      if (endDate) query.push(`end_date=${endDate.toISOString()}`);
      query.push(`page=${page}`);
      query.push(`pageSize=8`);

      const queryString = query.length ? `?${query.join('&')}` : '';
      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}event/filter${queryString}`;

      const response = await axios.get(url);

      setTotalPage(response.data.totalPage);
      setSaveData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const mapping = () => {
    return saveData.map((val: any, idx: any) => {
      return (
        <CartEvent
          price={val.price}
          key={idx}
          startdate={convertDate(val.start_date)}
          enddate={convertDate(val.end_date)}
          image={val.flyer_event}
          organizer={val.user_id.name}
        >
          {val.title}
        </CartEvent>
      );
    });
  };

  return (
    <div className="mb-10 md:w-[1190px] m-auto">
      <Card x-chunk="dashboard-07-chunk-3" className="w-full mb-8">
        <CardHeader>
          <CardTitle>Looking for event ?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <div className="flex gap-4 flex-wrap md:flex-nowrap">
                <Select
                  onValueChange={(e) => {
                    setGetCategory(e);
                  }}
                >
                  <SelectTrigger id="status" aria-label="Select status">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {category.map((val: any, idx: number) => {
                      return (
                        <SelectItem value={val} key={idx}>
                          {val}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {/* COMBO BOXXXXXXX */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {value
                        ? getLocations?.find(
                            (framework) => framework.value === value,
                          )?.label
                        : 'Select location...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0 w-full">
                    <Command className="bg-white">
                      <CommandInput placeholder="Search framework..." />
                      <CommandList className="bg-white ">
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {getLocations?.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? '' : currentValue,
                                );
                                setOpen(false);
                                setLocation(currentValue);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  value === framework.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* date picker */}

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !startDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, 'PPP')
                      ) : (
                        <span>Pick start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !endDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, 'PPP')
                      ) : (
                        <span>Pick end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {totalPage ? (
        <div>
          <div className="h-[970px] md:h-[680px] w-[370px] md:w-full m-auto mb-4">
            <div className="flex gap-3 md:gap-[23px] flex-wrap mb-6 w-fit  md:mx-0">
              {/* ////// */}
              {mapping()}
            </div>
          </div>
          <div className="flex w-full justify-end pr-4 md:pr-0">
            <Pagination
              page={page}
              setPage={setPage}
              maxPage={totalPage}
            ></Pagination>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 w-full h-[300px] rounded-lg flex items-center justify-center mb-6 text-xl text-gray-300">
          Event not Found
        </div>
      )}
    </div>
  );
};

export default FilterSection;
