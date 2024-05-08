'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { category } from '@/lib/text';
import { useAppDispatch } from '@/lib/hooks';
import { setCreateEventAction } from '@/lib/features/createEventSlice';

interface IEventCategoryProps {}

const EventCategory: React.FunctionComponent<IEventCategoryProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <Card x-chunk="dashboard-07-chunk-3" className="w-[360px] mb-8">
      <CardHeader>
        <CardTitle>Event Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(e) => {
                dispatch(setCreateEventAction({ category: e }));
              }}
            >
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Select status" />
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCategory;
