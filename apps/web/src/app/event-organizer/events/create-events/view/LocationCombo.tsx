'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppDispatch } from '@/lib/hooks';
import { setCreateEventAction } from '@/lib/features/createEventSlice';
import { Label } from '@radix-ui/react-label';

const getLocations = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

interface ILocationComboProps {}

const LocationCombo: React.FunctionComponent<ILocationComboProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const dispatch = useAppDispatch();
  const [getLocations, setGetLocations] =
    React.useState<{ value: string; label: string }[]>();

  React.useEffect(() => {
    getData();
  }, []);

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

      // console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? getLocations?.find((framework) => framework.value === value)
                ?.label
            : 'Select location...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command className="bg-white">
          <CommandInput placeholder="Search framework..." />
          <CommandList className="bg-white">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {getLocations?.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    dispatch(setCreateEventAction({ location: currentValue }));
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0',
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
  );
};

export default LocationCombo;
