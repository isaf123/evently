import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { renderIcon } from '@/utils/EO/renderIcon';
import Link from 'next/link';
import * as React from 'react';

interface ICardEOProps {
    title: string
    number: number
    icon?: string
    link: string
}

const CardEO: React.FunctionComponent<ICardEOProps> = (props) => {
    const { title, number, icon, link } = props
    return <div className=''>
        <Card className='md:w-[300px]'>
            <CardHeader className='flex flex-row items-center md:justify-center gap-[20px]'>
                <CardTitle>{title}</CardTitle>
                <div className='flex flex-col'>
                    {icon && renderIcon(icon)}
                </div>
            </CardHeader>
            <CardContent className='text-2xl font-bold text-center'>
                <p>{number}</p>
            </CardContent>
            <CardFooter className='flex justify-center'>
                <Link href={link}>
                    <p className='text-blue-600 underline underline-offset-[7px] text-[12px] cursor-pointer'>Learn More</p>
                </Link>
            </CardFooter>
        </Card>
    </div>;
};


export default CardEO;
