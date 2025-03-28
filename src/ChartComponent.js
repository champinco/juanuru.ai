// ChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartComponent({ annualGridCost, annualSolarCost }) {
  const data = {
    labels: ['Grid', 'Solar'],
    datasets: [
      {
        label: 'Annual Cost (KSh)',
        data: [annualGridCost, annualSolarCost],
        backgroundColor: ['#ff6384', '#36a2eb'], // Red for grid, blue for solar
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (KSh)',
        },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Annual Cost Comparison',
      },
    },
  };

  const savings = annualGridCost - annualSolarCost;
  return (
    <div>
      <Bar data={data} options={options} />
      <p>
        With solar, you could save {Math.max(0, savings).toFixed(2)} KSh per year compared to the grid.
      </p>
    </div>
  );
}

export default ChartComponent;