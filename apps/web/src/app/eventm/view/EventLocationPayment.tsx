'use client';
import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch } from '@/lib/hooks';
import { setCreateEventAction } from '@/lib/features/createEventSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
interface IEventDetailProps {}

const EventDetail: React.FunctionComponent<IEventDetailProps> = (props) => {
  const dispatch = useAppDispatch();
  const [price, setPrice] = useState<number>(0);
  const [active, setActive] = useState<Boolean>(false);

  return (
    <div className="grid gap-6 sm:grid-cols-2 mb-6">
      <div className="grid gap-3">
        <Label htmlFor="location">Location</Label>
        <Select
          onValueChange={(e) => {
            dispatch(setCreateEventAction({ location: e }));
            console.log(e);
          }}
        >
          <SelectTrigger id="category" aria-label="Select location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent className="bg-white"></SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="payment">Payment</Label>
        <Select
          onValueChange={(e) => {
            dispatch(setCreateEventAction({ event_type: e }));
            {
              e == 'paid' ? setActive(true) : setActive(false),
                dispatch(setCreateEventAction({ price: 0 }));
            }
          }}
        >
          <SelectTrigger id="payment" aria-label="Select payment method">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="free">Free</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {active ? (
        <div className="grid gap-3 ">
          <Label htmlFor="name">Price</Label>
          <Input
            id="name"
            type="text"
            className="w-full"
            placeholder="Input your price"
            onChange={(e) => {
              setPrice(Number(e.target.value));
              {
                dispatch(
                  setCreateEventAction({ price: Number(e.target.value) }),
                );
              }
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventDetail;
