import axios from "axios"

export const forgotPass = async (email: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/forgotPassword`)
    return response.data
}