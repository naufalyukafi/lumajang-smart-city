import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 0,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'hidden',
        },
        title: {
            display: true,
        },
    },
};

const labels = ['Total Penduduk', 'Penduduk Perempuan', 'Penduduk Laki-Laki'];

export const data = {
    labels,
    datasets: [
        {
            // label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ max: 5 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(0, 191, 255)',
        },
    ],
};

export default function BarChart(props) {
    return <Bar options={options} data={data} height={"100px"} />;
}
