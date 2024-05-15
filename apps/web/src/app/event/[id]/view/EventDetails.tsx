import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, Clock } from 'lucide-react';
interface IEventDetailsProps {
  children: string;
  date: string;
}

const EventDetails: React.FunctionComponent<IEventDetailsProps> = (props) => {
  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-0 " className="w-full mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-gray-600">
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5"></MapPin>
              <Label htmlFor="name">{props.children}</Label>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5"></Calendar>
              <Label htmlFor="name">{props.date}</Label>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-5 h-5"></Clock>
              <Label htmlFor="name">-</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;
