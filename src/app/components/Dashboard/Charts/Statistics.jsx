'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { MdBarChart } from 'react-icons/md';
import { IoIosArrowUp } from 'react-icons/io';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const LineChart = dynamic(() => import('./LineChart'), { ssr: false });

const Statistics = ({ isDarkMode }) => {
  const chartOptions = {
    chart: {
      id: 'line-chart',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: isDarkMode ? '#0B1437' : '#fff',
    },
    xaxis: {
      categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
      labels: {
        style: {
          colors: isDarkMode ? '#FFFFFF' : '#000000',
        },
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
    },
    grid: {
      show: false,
    },
    markers: {
      size: 5,
      hover: { size: 7 },
    },
    legend: {
      show: false,
    },
    colors: ['#4318FF', '#6AD2FF'],
  };

  const chartData = [
    {
      name: 'Data 1',
      data: [2200, 2400, 2455, 2300, 2500, 2400],
    },
    {
      name: 'Data 2',
      data: [2100, 2250, 2300, 2150, 2400, 2300],
    },
  ];

  return (
    <div className={`w-full max-w-xl rounded-2xl shadow-md p-4 mt-8 ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-white text-light-text'}`}>
      <div className="flex justify-between items-center">
        <div className={`flex items-center rounded-lg p-2 ${isDarkMode ? 'bg-dark-circle' : 'bg-gray-200'}`}>
          <FaCalendarAlt className={`mr-2 ${isDarkMode ? 'text-dark-icon' : 'text-light-icon'}`} />
          <select className={`bg-transparent border-none cursor-pointer font-bold ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}>
            <option>Month</option>
            <option>Day</option>
            <option>Year</option>
          </select>
        </div>
        <button className={`rounded-lg p-2 ${isDarkMode ? 'bg-dark-circle' : 'bg-light-circle'}`}>
          <MdBarChart size={24} className={isDarkMode ? 'text-dark-icon' : 'text-light-icon'} />
        </button>
      </div>
      <div className="flex justify-between items-center py-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">3212</h1>
          <span className="text-lg text-gray-500 font-normal">Appels</span>
          <span className="text-green-500 text-lg font-bold flex items-center">
            +2.45% <IoIosArrowUp className="ml-1" />
          </span>
          <p className="text-green-500 text-sm font-bold mt-2">En Croissance</p>
        </div>
        <div className="w-7/12 h-64">
          <LineChart chartData={chartData} chartOptions={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
