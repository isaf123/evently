import { getToken } from "@/utils/getToken";
import axios from "axios";

export const keepLogin = async () => {
    try {
        const token = getToken();

        if (!token) {
            return null;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/keeplogin`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data
    } catch (error) {

    }
}