import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartBarProps {
  labels: string[];
  data: number[];
  title: string;
  backgroundColor?: string;
}

const ChartBar: React.FC<ChartBarProps> = ({ labels, data, title, backgroundColor = 'rgba(21, 58, 221, 0.6)' }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor,
      },
    ],
  };

  return (
    <div style={{ height: '400px', marginTop: '20px' }}>
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default ChartBar;
