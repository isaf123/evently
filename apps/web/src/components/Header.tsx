import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <div className="text-white bg-[#333A73] w-full h-[80px]">
      <div className="w-full h-full flex items-center justify-between mr-10">
        <p className="ml-20 font-extrabold text-[20px]">EVENTLY</p>
        <div className="flex items-center">
          <input type="text" className="h-[34px] w-[420px] rounded-l-md" />
          <button className="bg-blue-500 h-[34px] w-[80px] rounded-r-md">
            oke
          </button>
        </div>

        <div className="flex gap-5 mr-20 items-center">
          <p className="mr-5 font-medium">explore </p>
          <Button className="bg-white text-[#333A73] font-bold">Sign Up</Button>
          <Button className=" border border-lg border-white">Sign In</Button>
        </div>
      </div>
    </div>
  );
};
