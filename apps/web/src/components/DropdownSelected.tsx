'use client';
import * as React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setFilterDataAction } from '@/lib/features/eventQuerySLice';
import { setEventDeleteAction } from '@/lib/features/eventQuerySLice';

interface IDropDownSelectedProps {
  children: string;
  list: any[];
}

const DropDownSelected: React.FunctionComponent<IDropDownSelectedProps> = (
  props,
) => {
  const [active, setActive] = React.useState<Boolean>(false);
  const [selectData, setSelectData] = React.useState<string>('');
  const [deleteUp, setDeleteUp] = React.useState<Object>({});
  const dispatch = useAppDispatch();

  // console.log(selectProp);
  const event = useAppSelector((state) => {
    return state.eventReducer;
  });
  console.log(deleteUp);

  const getDelete = () => {
    const newData = { ...event };
    setSelectData(newData);
  };
  return (
    <div className="h-fit min-h-[64px] pt-6">
      {active ? (
        <div className=" border z-30 w-[290px] h-[80px] left-5 rounded-lg border-[#333A73] top-4 ml-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="flex items-center h-[80px] ">
            <p className="ml-5 text-color1 text-lg font-semibold ">
              {selectData}
            </p>
            <div className="w-full h-fit relative">
              <FaPlus
                className="rotate-45 absolute right-5 -top-[9px] text-[#333A73] cursor-pointer"
                onClick={() => {
                  setActive(false);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type="checkbox"
            className="w-[340px] absolute h-20 cursor-pointer peer opacity-0 z-20"
          />
          <div className="h-20 w-full flex text-lg items-center font-semibold">
            <div className="text-color1 px-10 w-fit">
              <p>{props.children}</p>
            </div>
          </div>
          {/*//////// Arrow ////////*/}
          {/*/////// content ///////*/}
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
                      dispatch(
                        setFilterDataAction({
                          [props.children.toLowerCase()]: val
                            .toLowerCase()
                            .replace(/\s/g, ''),
                        }),
                      );
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
      )}
    </div>
  );
};

export default DropDownSelected;
