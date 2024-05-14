import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import * as React from 'react';

interface IForgotPassProps {
}

const ForgotPass: React.FunctionComponent<IForgotPassProps> = (props) => {
    return <div>
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
                        />
                    </div>
                    <Button
                        type="button"
                        className="w-full bg-color1 text-white"
                    >
                        Login
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/signin" className="underline cursor-pointer">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>;
};

export default ForgotPass;
