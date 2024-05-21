import * as React from 'react';
import {
  Package2,
  User,
  ShoppingCart,
  Ticket,
  MessageSquareDiff,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch } from '@/lib/hooks';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { usePathname } from 'next/navigation';
import { setLogoutAction } from '@/lib/features/userSlice';

interface IBarCustomerProps {}

const BarCustomerWeb: React.FunctionComponent<IBarCustomerProps> = (props) => {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    // Dispatch action logout
    dispatch(setLogoutAction());
  };
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">Evently</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            href="/profile-cust"
            className={
              path == '/profile-cust'
                ? 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary bg-gray-100'
                : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            }
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link
            href="/checkout"
            className={
              path == '/checkout'
                ? 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary bg-gray-100'
                : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            }
          >
            <ShoppingCart className="h-4 w-4" />
            Checkout
          </Link>
          <Link
            href="/your-ticket"
            className={
              path == '/your-ticket'
                ? 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary bg-gray-100'
                : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            }
          >
            <Ticket className="h-4 w-4" />
            Your Ticket
          </Link>
          <Link
            href="/review"
            className={
              path == '/review'
                ? 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary bg-gray-100'
                : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            }
          >
            <MessageSquareDiff className="h-4 w-4" />
            Review and rate
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            onClick={() => {
              handleLogout();
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4"></div>
    </div>
  );
};

export default BarCustomerWeb;
