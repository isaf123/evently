import axios from "axios"
import Cookies from "js-cookie"

export const getEvent = async (query: string, currentPage: number) => {
    try {
        const token = Cookies.get('Token EO')
        const events = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/event`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return events.data
    } catch (error) {
        throw "Failed to fetch events"
    }
}

export const getTransactionEO = async (page: number, pageSize: number) => {
    try {
        const tokenEO = Cookies.get('Token EO')
        const transaction = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/transaction?page=${page}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${tokenEO}`
            }
        })

        return transaction.data
    } catch (error) {
        throw 'Failed to fetch transaction'
    }
}