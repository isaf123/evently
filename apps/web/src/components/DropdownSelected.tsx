'use client';
import * as React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';

interface IDropDownSelectedProps {
  children: string;
  list: any[];
}

const DropDownSelected: React.FunctionComponent<IDropDownSelectedProps> = (
  props,
) => {
  const [active, setActive] = React.useState<Boolean>(false);
  const [selectData, setSelectData] = React.useState<string>('');

  console.log(selectData);

  return (
    <div className=" relative">
      <input
        type="checkbox"
        className="w-[340px] absolute h-20 cursor-pointer peer opacity-0 z-10"
      />

      <div className="h-20 w-full flex text-lg items-center  font-semibold">
        {!active ? (
          <p className="text-[#333A73] px-10">{props.children}</p>
        ) : (
          <div className="absolute border z-20 w-[290px] h-[54px] left-5 rounded-lg border-[#333A73]">
            <div className="flex items-center h-[54px] ">
              <p className="ml-5 text-[#333A73] ">{selectData}</p>
              <div className="w-full h-fit relative">
                <FaPlus
                  className="rotate-45 absolute right-10 -top-[9px] text-[#333A73] cursor-pointer"
                  onClick={() => {
                    setActive(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Arrow */}

      {/* content */}
      {props.list.map((val: any, idx: number) => {
        return (
          <div
            className="overflow-hidden duration-500 max-h-0 peer-checked:max-h-[140px] transition-all px-7 "
            key={idx}
          >
            <div className="px-10 py-3  bg-white  border-b-[2px]">
              <button
                className="w-full h-full text-left"
                onClick={() => {
                  setSelectData(val);
                  setActive(true);
                }}
              >
                {' '}
                {val}
              </button>
            </div>
          </div>
        );
      })}
      <MdKeyboardArrowDown className="w-6 h-6 absolute top-7 right-10 transition-transform duration-600 rotate-0 peer-checked:rotate-180 " />
    </div>
  );
};

export default DropDownSelected;
