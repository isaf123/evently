import { showMessage } from '@/components/Alert/Toast';
import axios from 'axios';
import Cookies from 'js-cookie';

export const getTicketSoldEO = async (
  token: string,
  from?: string,
  to?: string,
) => {
  try {
    const query = [];
    query.push(`from=${from}`);
    query.push(`to=${to}`);

    const queryJoin = `?${query.join('&')}`;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}EO/ticket${queryJoin}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteEvent = async (eventId: number) => {
  try {
    const cookies = Cookies.get('Token EO');

    await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/event/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      },
    );

    showMessage('Event deleted successfully', 'success');
  } catch (error: any) {
    if (error.response) {
      showMessage(error.response.data.error, 'error');
    } else {
      showMessage(error.message, 'error');
    }
  }
};

export const getTotalRevenue = async (
  token: string,
  from?: string,
  to?: string,
) => {
  try {
    const query = [];
    if (from) query.push(`from=${from}`);
    if (to) query.push(`to=${to}`);
    const queryjoin = query.length ? `?${query.join('&')}` : '';

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}EO/total-revenue${queryjoin}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
