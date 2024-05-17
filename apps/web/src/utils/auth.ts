import Cookies from 'js-cookie';
export const isAuthEO = () => {
    const tokenEO = Cookies.get('Token EO')
    return !!tokenEO
}

export const isAuthCust = () => {
    const tokenCust = Cookies.get('Token Cust')
    return !!tokenCust
}