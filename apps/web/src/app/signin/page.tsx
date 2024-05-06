'use client';
import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Import JS Cookie
import Cookies from 'js-cookie'



import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

import { showMessage } from '@/components/Alert/Toast';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { setSuccessLoginAction } from '@/lib/features/userSlice';

interface ILoginPageProps { }

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const [dataUser, setDataUser] = useState({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogin = async () => {
    try {
      console.log('ini ENV', process.env.NEXT_PUBLIC_BASE_API_URL);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/login`, {
        email: dataUser.email,
        password: dataUser.password
      })
      const { role, token } = response.data;
      if (role === 'eo') {
        console.log('ini halaman EO');
        console.log('ini tokennya', token);
        dispatch(setSuccessLoginAction(response.data))
        router.replace('/event-organizer/dashboard')
      } else if (role === 'customers') {
        console.log('ini halaman Customers');
        console.log('token customers', token);
        dispatch(setSuccessLoginAction(response.data))
        router.replace('/')
      }

    } catch (error: any) {
      showMessage(error.response.data, "error")
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="w-full bg-white h-[85px] relative -top-[80px]"></div>
      <Card className="mx-3 md:mx-auto max-w-sm -mt-[70px] md:-mt-0">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="me@example.com"
                required
                onChange={(e) => {
                  const newData = { ...dataUser, email: e.target.value };
                  setDataUser(newData);
                }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => {
                  const newData = { ...dataUser, password: e.target.value };
                  setDataUser(newData);
                }}
              />
            </div>
            <Button
              type="button"
              className="w-full bg-color1 text-white"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline cursor-pointer">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>


    </div>
  );
};

export default LoginPage;
