import Cookies from "js-cookie";


export const protectPageEO = () => {
    try {
        const tokenEO = Cookies.get('Token EO')
        if (!tokenEO) {
            return false
        }

        return true
    } catch (error) {
        console.log(error);

    }
}
export const protectPageCust = () => {
    try {
        const tokenCust = Cookies.get('Token Cust')
        if (!tokenCust) {
            return false
        }
    } catch (error) {
        console.log(error);

    }
}