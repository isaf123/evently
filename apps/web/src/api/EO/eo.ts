import { showMessage } from "@/components/Alert/Toast"
import axios from "axios"
import Cookies from "js-cookie"

export const getUpcomingEventsEO = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}EO/dashboard/upcoming-event`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            showMessage(error.response.data, 'error');
        } else {
            showMessage(error.message, 'error');
        }
        throw error;
    }

}
export const deleteEvent = async (eventId: number) => {
    try {
        const cookies = Cookies.get('Token EO');

        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/deleteEvent/${eventId}`, {
            headers: {
                Authorization: `Bearer ${cookies}`
            }
        });


        showMessage('Event deleted successfully', 'success');
    } catch (error: any) {
        if (error.response) {
            showMessage(error.response.data.error, 'error');
        } else {
            showMessage(error.message, 'error');
        }
    }
};
