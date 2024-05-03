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
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { showMessage } from '@/components/Alert/Toast';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



interface ISignUpPageProps { }

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  const [dataUser, setDataUser] = useState<Object>({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter()
  console.log(dataUser);
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3010/auth/register", { name: "ab", email: "maillee@mail.com", password: "12345a" })
      router.push("/")
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
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid  gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  onChange={(e) => {
                    const newData = { ...dataUser, name: e.target.value };
                    setDataUser(newData);
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  const newData = { ...dataUser, email: e.target.value };
                  setDataUser(newData);
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => {
                  const newData = { ...dataUser, password: e.target.value };
                  setDataUser(newData);
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="button" className="w-full bg-color1 text-white" onClick={() => { handleRegister() }}>
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;

// export function LoginForm() {
//   return (

//   );
// }
