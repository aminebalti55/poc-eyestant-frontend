'use client';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const LineAreaChart = ({ chartData, chartOptions }) => {
  return (
    <Chart
      options={chartOptions}
      type="line"
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default LineAreaChart;
