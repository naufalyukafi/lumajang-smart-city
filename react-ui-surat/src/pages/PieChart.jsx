import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    elements: {
        bar: {
            borderWidth: 0,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
        },
    },
};

export const data = {
    labels: ['Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 3],
            backgroundColor: [
                'rgba(0, 191, 255)',
                'rgba(253, 28, 3)',
                'rgba(152, 251, 152)',
                'rgba(104, 106, 108)',
                'rgba(255, 165, 0)',
            ],
            borderWidth: 0,
        },
    ],
};

export default function PieChart() {
    return (
        <Pie data={data} options={options} />
    )
}
