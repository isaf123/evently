import * as React from 'react';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
// import { setLogoutAction, selectUserRole } from '@/lib/features/userSlice'; // Perhatikan bahwa saya mengubah ini untuk mengambil fungsi logout dan selector role
// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// const role = useAppSelector(selectUserRole);

interface IHeaderEOProps {}

const HeaderEO: React.FunctionComponent<IHeaderEOProps> = (props) => {
  return (
    <div className="bg-color1 min-w-screen  border h-[80px] flex justify-between items-center">
      <Link className="ml-20 font-extrabold text-[20px] text-white" href={'/'}>
        EVENTLY
      </Link>
    </div>
  );
};

export default HeaderEO;
