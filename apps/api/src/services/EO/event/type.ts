import { Category as CategoryEvent, EventType } from '.prisma/client';
export interface Ievent {
  title: string;
  start_date: Date;
  end_date: Date;
  description: string;
  category: CategoryEvent;
  available_seat: number;
  event_type: EventType;
  price: number;
  location: string;
  usersId: number;
  address: string;
  max_ticket: number;
}
