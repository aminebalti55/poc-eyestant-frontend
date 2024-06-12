'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { MdBarChart } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';

const BarChart = dynamic(() => import('./BarChart'), { ssr: false });

const DocumentsPartages = ({ isDarkMode }) => {
  const chartOptions = {
    chart: {
      id: 'bar-chart',
      toolbar: { show: false },
      zoom: { enabled: false },
      stacked: true,
      background: isDarkMode ? '#0B1437' : '#fff',
    },
    xaxis: {
      categories: ['17', '18', '19', '20', '21', '22', '23', '24', '25'],
      labels: {
        style: {
          colors: isDarkMode ? '#FFFFFF' : '#000000',
        },
      },
    },
    yaxis: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '40%',
        barHeight: '100%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    colors: ['#84D9FD', '#775FFC', '#E0E0E0'],
  };

  const chartData = [
    {
      name: 'Filled',
      data: [10, 15, 12, 18, 14, 16, 12, 15, 20],
    },
    {
      name: 'Partly Filled',
      data: [5, 7, 6, 8, 7, 8, 6, 7, 9],
    },
    {
      name: 'Empty',
      data: [10, 8, 12, 7, 9, 6, 12, 10, 5],
    },
  ];

  return (
    <div className={`w-full max-w-xl rounded-2xl shadow-md p-4 mt-8 ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-white text-light-text'}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Documents partagés</h2>
        <button className={`rounded-lg p-2 ${isDarkMode ? 'bg-dark-circle' : 'bg-light-circle'}`}>
          <MdBarChart size={24} className={isDarkMode ? 'text-dark-icon' : 'text-light-icon'} />
        </button>
      </div>
      <div className="py-4">
        <div className="w-full h-64">
          <BarChart chartData={chartData} chartOptions={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DocumentsPartages;
