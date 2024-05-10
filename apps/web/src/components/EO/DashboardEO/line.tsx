import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

interface Props {
    data: { eventName: string; price: number }[]; // Data event dari response
}

const EventLineChart: React.FC<Props> = ({ data }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    };
    return (
        <div>
            <h2>Event Line Chart</h2>
            <AreaChart width={600} height={300} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="eventName" />
                <YAxis tickFormatter={formatPrice} />
                <Tooltip formatter={(value: any) => formatPrice(value)} />
                <Legend />
                <Area type="monotone" dataKey="price" stackId="1" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </div>
    );
};

export default EventLineChart;
