"use client"

import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface DataPoint {
  x: number;
  y: number;
  zone: string;
}

const data: DataPoint[] = [
  { x: 0.5, y: 1, zone: 'Graue Zone' },
  { x: 1.5, y: 2, zone: 'Graue Zone' },
  { x: 2.2, y: 3.5, zone: 'Indirekte Einbeziehung' },
  { x: 2.8, y: 5, zone: 'Direkte Einbeziehung' },
];

const COLORS: { [key: string]: string } = {
  'Graue Zone': 'rgba(169, 169, 169, 0.6)',
  'Indirekte Einbeziehung': 'rgba(255, 165, 0, 0.6)',
  'Direkte Einbeziehung': 'rgba(255, 0, 0, 0.6)'
};

const StakeholderMatrix: React.FC = () => {
  const chartData = {
    datasets: Object.keys(COLORS).map(zone => ({
      label: zone,
      data: data.filter(item => item.zone === zone).map(item => ({ x: item.x, y: item.y })),
      backgroundColor: COLORS[zone],
    })),
  };

  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        min: 0,
        max: 3,
      },
      y: {
        type: 'linear' as const,
        min: 0,
        max: 6,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `(${context.parsed.x}, ${context.parsed.y})`
        }
      }
    }
  };

  return <Scatter data={chartData} options={options} />;
};

export default StakeholderMatrix;