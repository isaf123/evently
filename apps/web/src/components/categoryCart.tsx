import * as React from 'react';

interface IcateforyCartProps {
  image?: string;
  children?: string;
  onClick?: any;
}

const CategoryCart: React.FunctionComponent<IcateforyCartProps> = (props) => {
  return (
    <button
      className="w-[320px] h-[180px] bg-gray-200 rounded-lg overflow-hidden relative"
      onClick={props.onClick}
    >
      <img src={props.image} alt="" className="brightness-[.65]" />
      <p className="absolute bottom-3 left-6 text-white font-bold text-3xl">
        {props.children}
      </p>
    </button>
  );
};

export default CategoryCart;
