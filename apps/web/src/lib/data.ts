import axios from "axios"
import Cookies from "js-cookie"

export const getEvent = async (page: number, pageSize: number, query?: string) => {
    try {
        const token = Cookies.get('Token EO');
        let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/event?page=${page}&pageSize=${pageSize}`;
        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
        // console.log('data event', response.data.result);

    } catch (error) {
        throw "Failed to fetch events";
    }
};

export const getTransactionEO = async (page: number, pageSize: number, query?: string) => {
    try {
        const tokenEO = Cookies.get('Token EO');
        let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/transaction?page=${page}&pageSize=${pageSize}`;
        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }
        const transaction = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${tokenEO}`,
            },
        });

        return transaction.data;
    } catch (error) {
        throw 'Failed to fetch transaction';
    }
};
