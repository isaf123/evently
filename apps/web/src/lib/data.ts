import axios from "axios"
import Cookies from "js-cookie"

export const getEvent = async (query: string = '') => {
    try {
        const token = Cookies.get('Token EO')
        const events = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/event`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                query: query
            }
        })
        return events.data
    } catch (error) {
        throw "Failed to fetch events"
    }
}