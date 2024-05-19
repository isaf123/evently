import * as React from 'react';
import {
  Menu,
  Package2,
  User,
  ShoppingCart,
  Ticket,
  MessageSquareDiff,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { setLogoutAction } from '@/lib/features/userSlice';
import { useAppDispatch } from '@/lib/hooks';

interface IBarCustomerMobileProps {}

const BarCustomerMobile: React.FunctionComponent<IBarCustomerMobileProps> = (
  props,
) => {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    // Dispatch action logout
    dispatch(setLogoutAction());
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col bg-white">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Evently</span>
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
          <Link
            href="/checkout"
            className={
              path == '/checkout'
                ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground bg-gray-100'
                : 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
            }
          >
            <ShoppingCart className="h-5 w-5" />
            Checkout
          </Link>
          <Link
            href="/your-ticket"
            className={
              path == '/your-ticket'
                ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground bg-gray-100'
                : 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
            }
          >
            <Ticket className="h-5 w-5" />
            Your Ticket
          </Link>
          <Link
            href="/review"
            className={
              path == '/review'
                ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground bg-gray-100'
                : 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
            }
          >
            <MessageSquareDiff className="h-5 w-5" />
            Review and rate
          </Link>
          <Link
            href="/"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            onClick={() => {
              handleLogout();
            }}
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default BarCustomerMobile;
