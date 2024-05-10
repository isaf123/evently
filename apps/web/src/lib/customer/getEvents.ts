import { showMessage } from "@/components/Alert/Toast";
import axios from "axios";

export const getEvents = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}event`)

        return response.data
    } catch (error: any) {
        if (error.response) {
            showMessage(error.response.data.error.message, 'error');
        } else {
            showMessage(error, 'error');
        }
    }
}