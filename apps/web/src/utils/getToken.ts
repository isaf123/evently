import Cookies from "js-cookie"

export const getToken = () => {
    const tokenEO = Cookies.get('Token EO')
    const tokenCust = Cookies.get('Token Cust')

    if (tokenEO) {
        return tokenEO
    } else if (tokenCust) {
        return tokenCust
    } else {
        return null
    }
}