'use client';
import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/lib/hooks';
import { setCreateEventAction } from '@/lib/features/createEventSlice';

interface IAddressSeatProps {}

const AddressSeat: React.FunctionComponent<IAddressSeatProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="grid gap-6 sm:grid-cols-2 mb-6">
      <div className="grid gap-3">
        <Label htmlFor="name">Address</Label>
        <Input
          id="name"
          type="text"
          className="w-full"
          placeholder="38. Tech Street, Silicon Valley"
          onChange={(e) => {
            dispatch(setCreateEventAction({ address: e.target.value }));
          }}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Max Seat</Label>
        <Input
          id="name"
          type="text"
          className="w-full"
          placeholder="ex. 400"
          onChange={(e) => {
            dispatch(
              setCreateEventAction({ available_seat: Number(e.target.value) }),
            );
          }}
        />
      </div>
    </div>
  );
};

export default AddressSeat;
