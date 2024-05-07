'use client';
import * as React from 'react';

import { useAppDispatch } from '@/lib/hooks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface IEventDetailProps {}

const EventPromo: React.FunctionComponent<IEventDetailProps> = (props) => {
  const dispatch = useAppDispatch();
  const [price, setPrice] = useState<number>(0);
  const [active, setActive] = useState<Boolean>(false);

  return (
    <div className=" gap-6 sm:grid-cols-2 mb-6">
      <div className="grid gap-3 mb-4">
        <Label htmlFor="promo">Promo name</Label>
        <Input
          id="promo"
          type="text"
          className="w-full"
          // onChange={(e) => {
          //   // setName(e.target.value);
          //   dispatch(setPromoEventAction({ title: e.target.value }));
          // }}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="promo">Discount (in %)</Label>
        <Input
          id="promo"
          type="text"
          className="w-full"
          // onChange={(e) => {
          //   // setName(e.target.value);
          //   dispatch(setPromoEventAction({ title: e.target.value }));
          // }}
        />
      </div>
    </div>
  );
};

export default EventPromo;
