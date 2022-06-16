import React from 'react';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ConsumptionChart(props) {
    const { dates, consumptions } = props;
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
                label: `Comsumos m3`,
                data: consumptions,
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgba(0, 170, 255, 1)',
                width: '50vw',
            },
        ],
    };

    return (
        <div className='chartContainer'>
            <Bar options={options} data={data} />
        </div>
    );
}
