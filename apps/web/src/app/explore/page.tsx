import DropDownSelected from '@/components/DropdownSelected';
import * as React from 'react';
import { location } from '@/lib/text';
import { category } from '@/lib/text';
DropDownSelected;

interface IExplorePageProps {}

const ExplorePage: React.FunctionComponent<IExplorePageProps> = (props) => {
  return (
    <div className="h-[865px] w-[340px] border-r-[0.2px] border-color1">
      <DropDownSelected list={location}>Locations</DropDownSelected>
      <DropDownSelected list={category}>Category</DropDownSelected>
    </div>
  );
};

export default ExplorePage;
