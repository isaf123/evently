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

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { RadioGroup } from '@radix-ui/react-radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';

interface ISignUpPageProps { }

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm_pwd: '',
    role: '',
    referral_code: ''
  });

  const [role, setRole] = useState<string>("")

  const [showReferralCode, setShowReferralCode] = useState(false);
  const clickRefCode = () => {
    setShowReferralCode(!showReferralCode)
  }
  const router = useRouter()
  const handleRegister = async () => {
    try {
      console.log('ini ENV', process.env.NEXT_PUBLIC_BASE_API_URL);
      if (!dataUser.name || !dataUser.email || !dataUser.password || !dataUser.role || !dataUser.confirm_pwd) {
        console.log("debug master")
        showMessage("Please input all fields", "error")
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/register`, {
        name: dataUser.name,
        email: dataUser.email,
        password: dataUser.password,
        role: dataUser.role,
        referral_code: generateReferralCode(6),
        referral_code_other: dataUser.referral_code
      })
      console.log(dataUser);


      router.push("/signin")
    } catch (error: any) {
      if (error.response) {
        showMessage(error.response.data, 'error');
      } else {
        showMessage(error, 'error');
      }
    }
  }

  const generateReferralCode = (length: number = 6): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let referralCode = '';
    for (let i = 0; i < length; i++) {
      referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referralCode;
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
                <Label htmlFor="first-name">Name</Label>
                <Input
                  id="name"
                  type='text'
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
              <Input id="confirm_pwd" type="password" onChange={(e) => {
                const newData = { ...dataUser, confirm_pwd: e.target.value };
                setDataUser(newData);
              }} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role" className='text-sm'>Role</Label>
              <RadioGroup
                className='flex justify-center gap-4'
                onValueChange={(e) => {
                  setRole(e);
                  const newData = { ...dataUser, role: e };
                  setDataUser(newData);
                }}
                onClick={clickRefCode}
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="eo" id="r1" />
                  <Label htmlFor="r1">EO</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="customers" id="r2" />
                  <Label htmlFor="r2">Customer</Label>
                </div>
              </RadioGroup>

            </div>
            {role == "customers" ?
              <div className="grid gap-2">
                <Input
                  type='text'
                  className='block'
                  placeholder='Register with Referral Code'
                  onChange={(e) => {
                    const newData = { ...dataUser, referral_code: e.target.value };
                    setDataUser(newData);
                  }}
                />
              </div> : <></>
            }

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
