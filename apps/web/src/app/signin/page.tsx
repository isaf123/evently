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



import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface ILoginPageProps { }

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const [dataUser, setDataUser] = useState({
    email: '',
    password: '',
  });

  return (
    <div>
      <div className="w-full bg-white h-[85px] relative -top-[80px]"></div>
      <Card className="mx-3 md:mx-auto max-w-sm -mt-[70px] md:-mt-0">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email/username to login to your account
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
              onClick={() => {
                console.log('oke');
              }}
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
