export interface EventData {
    id: number;
    flyer_event: string | null;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    category: string;
    available_seat: number;
    event_type: string;
    price: number;
    location: string;
    usersId: number;
    address: string;
    user_id: {
        name: string;
    };
    eventCode: any
}