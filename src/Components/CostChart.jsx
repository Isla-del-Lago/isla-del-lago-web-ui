import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export default function CostChart(props) {
    const { dates, costs } = props;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#000',
                    font: {
                        size: 15,
                    },
                },
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
        scales: {
            y: {
                ticks: {
                    color: '#000',
                    beginAtZero: true,
                },
            },
            x: {
                ticks: {
                    color: '#000',
                    beginAtZero: true,
                },
            },
        },
    };

    const labels = dates;

    const data = {
        labels,
        datasets: [
            {
                label: 'Costos COP',
                data: costs,
                borderColor: 'rgb(0, 170, 255)',
                backgroundColor: 'rgba(0, 0, 255)',
            },
        ],
    };

    return (
        <div className='chartContainer'>
            <Line options={options} data={data} />
        </div>
    );
}
