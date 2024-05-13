import prisma from '@/prisma';
import { Ievent } from './type';
import { Response, response, Request } from 'express';
import { Users } from '.prisma/client';

export const createEvent = async (
  eventData: Ievent,
  pic: null | string,
  usersId: number,
) => {
  try {
    // console.log('dapet data :', eventData);
    // console.log('dapet pic :', pic);
    // console.log('dapet user :', usersId);
    const newEvent = await prisma.masterEvent.create({
      data: {
        title: eventData.title,
        description: eventData.description,
        category: eventData.category,
        available_seat: Number(eventData.available_seat),
        event_type: eventData.event_type,
        price: Number(eventData.price),
        location: eventData.location,
        address: eventData.address,
        start_date: eventData.start_date,
        end_date: eventData.end_date,
        flyer_event: pic,
        usersId,
      },
    });

    return newEvent;
  } catch (error) {
    return error;
  }
};
