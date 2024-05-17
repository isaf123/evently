import React, { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import useEffect from 'react';
import Cookies from 'js-cookie';
import { setSuccessLoginAction } from '../../lib/features/userSlice';
import { redirect, useRouter } from 'next/navigation';

const EORouter = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    // Accessing the role with a fallback to ensure no TypeError
    const role = useAppSelector((state) => state.userSlice?.role);
    const findTokenEO = () => {
        // const tokenEO = Cookies.get('Token EO');
        // if (tokenEO) {
        //     dispatch(setSuccessLoginAction(tokenEO));
        // }
        // return tokenEO;
    };
    React.useEffect(() => {
        findTokenEO()
    }, [dispatch, router]);

    React.useEffect(() => {
        // if (role) {
        //     if (role !== 'customers') {
        //         router.replace('/unauthorized');
        //     }
        // }
    }, [role, router]);
    return (
        <>{children}</>
    )
}

export default EORouter