import prisma from '@/prisma';
import { Category as CategoryEvent, EventType } from '.prisma/client';

import { Users } from '.prisma/client';

export const createEvent = async (eventData: {
  flyer_event?: null | string;
  title: string;
  start_date: Date;
  end_date: Date;
  description: string;
  category: CategoryEvent;
  available_seat: number;
  event_type: EventType;
  category_id: number;
  price: number;
  location: string;
  code_event: string;
  usersId: number;
  address: string;
}) => {
  try {
    const newEvent = await prisma.masterEvent.create({
      data: eventData,
    });
    return newEvent;
  } catch (error) {
    throw error;
  }
};
