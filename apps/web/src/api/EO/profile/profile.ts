import { showMessage } from "@/components/Alert/Toast";
import axios from "axios";
import Cookies from "js-cookie";

export const updateProfile = async (formData: FormData) => {
    try {
        const token = Cookies.get('Token EO')
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API_URL}EO/profile`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        if (error.response) {
            showMessage(error.response.data, 'error');
        }
        showMessage(error, 'error');
    }
}