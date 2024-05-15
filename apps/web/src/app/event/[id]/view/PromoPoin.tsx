import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface IPromoPoinProps {}

const PromoPoin: React.FunctionComponent<IPromoPoinProps> = (props) => {
  const [active, setActive] = React.useState<Boolean>(true);
  return (
    <Tabs defaultValue="voucher" className="w-full mb-6">
      <TabsList className="grid w-full grid-cols-2 bg-gray-100">
        <TabsTrigger
          value="voucher"
          className={active ? 'bg-white' : ''}
          onClick={() => {
            setActive(true);
          }}
        >
          Voucher
        </TabsTrigger>
        <TabsTrigger
          value="poin"
          className={!active ? 'bg-white' : ''}
          onClick={() => {
            setActive(false);
          }}
        >
          Poin
        </TabsTrigger>
      </TabsList>
      <TabsContent value="voucher">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          {/* <CardFooter></CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="poin">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          {/* <CardFooter></CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PromoPoin;
