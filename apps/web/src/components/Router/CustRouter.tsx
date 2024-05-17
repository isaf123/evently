import React, { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import useEffect from 'react';
import Cookies from 'js-cookie';
import { setSuccessLoginAction } from '../../lib/features/userSlice';
import { redirect, useRouter } from 'next/navigation';

const CustRouter = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    // Accessing the role with a fallback to ensure no TypeError
    const role = useAppSelector((state) => state.userSlice?.role);
    const findTokenCust = () => {
        const tokenCust = Cookies.get('Token EO')
        if (tokenCust) {
            dispatch(setSuccessLoginAction(tokenCust))
        }
        return tokenCust
    }
    React.useEffect(() => {
        findTokenCust()
    }, [dispatch, router]);

    React.useEffect(() => {

        if (role && role !== 'customers') {
            console.log('role baru saat ini', role);

        }

    }, [role, router]);
    return (
        <>{children}</>
    )
}

export default CustRouter