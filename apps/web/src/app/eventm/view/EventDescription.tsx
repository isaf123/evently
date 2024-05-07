'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setCreateEventAction } from '@/lib/features/createEventSlice';
import { title } from 'process';

interface IEventDescriptionProps {}

const EventDescription: React.FunctionComponent<IEventDescriptionProps> = (
  props,
) => {
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const dispatch = useAppDispatch();

  return (
    <Card
      x-chunk="dashboard-07-chunk-0 "
      className="w-[360px] md:w-[670px] mb-8"
    >
      <CardHeader>
        <CardTitle>Event Description</CardTitle>
        <CardDescription>Create you event here, easy</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              placeholder="Name your event here"
              onChange={(e) => {
                setName(e.target.value);
                dispatch(setCreateEventAction({ title: e.target.value }));
              }}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="min-h-32"
              onChange={(e) => {
                setDesc(e.target.value);
                dispatch(setCreateEventAction({ description: e.target.value }));
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDescription;
