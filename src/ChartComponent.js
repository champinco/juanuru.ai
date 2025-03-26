import React, { forwardRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = forwardRef(
  ({ annualGridCost, initialSolarCost, annualMaintenance }, ref) => {
    const years = Array.from({ length: 11 }, (_, i) => i); // 0 to 10
    const gridData = years.map((y) => y * annualGridCost);
    const solarData = years.map((y) => initialSolarCost + y * annualMaintenance);
    const annualSavings = annualGridCost - annualMaintenance;

    const lineData = {
      labels: years,
      datasets: [
        {
          label: 'Cumulative Grid Cost (KSh)',
          data: gridData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Cumulative Solar Cost (KSh)',
          data: solarData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Cumulative Costs Over 10 Years' },
      },
    };

    return (
      <div className="charts">
        <h3>Cost Comparison</h3>
        <Line ref={ref} data={lineData} options={options} />
      </div>
    );
  }
);

export default ChartComponent;