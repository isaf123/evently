import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { renderIcon } from '@/utils/EO/renderIcon';
import * as React from 'react';

interface ICardEOProps {
    title: string
    number: number
    icon?: string
}

const CardEO: React.FunctionComponent<ICardEOProps> = (props) => {
    const { title, number, icon } = props
    return <div className=''>
        <Card className='md:w-[300px]'>
            <CardHeader className='flex flex-row items-center gap-[20px]'>
                <CardTitle>{title}</CardTitle>
                <div className='flex flex-col'>
                    {icon && renderIcon(icon)}
                </div>
            </CardHeader>
            <CardContent>
                <p>{number}</p>
            </CardContent>
            <CardFooter className='flex justify-center'>
                <p className='text-blue-600 underline underline-offset-[7px] text-[12px] cursor-pointer'>Learn More</p>
            </CardFooter>
        </Card>
    </div>;
};


export default CardEO;
