import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin

// Register Chart.js components and plugins
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels // Register the datalabels plugin
);

const BarChart = () => {
  const sourceData = [
    { label: ['Customer', 'Arrival and', 'Staff Grooming', 'Analysis'], value: 50 }, // Use array for multiline labels
    { label: 'Store Exterior', value: 30 },
    { label: 'Store Exterior', value: 90 },
    { label: 'Store Exterior', value: 45 },
  ];

  const total = 100; // Assuming the maximum value is 100 for percentage calculation

  return (
    <div>
      <div className="chart-container" style={{height:"18rem",width:"100%"}}>
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: 'Count',
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  '#007DC1', // Custom colors for bars
                  '#D7F1FF',
                  '#D7F1FF',
                  '#D7F1FF',
                ],
                borderRadius: 5,
                barThickness: 20, // Adjust bar thickness
              },
            ],
          }}
          options={{
            indexAxis: 'y', // Horizontal bar chart
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false, // Hide legend
              },
              datalabels: {
                align: 'end', // Align the labels to the end (right) of the bars
                anchor: 'end',
                formatter: (value) => `${((value / total) * 100).toFixed(0)}%`, // Show percentage
                color: '#000', // Label color (adjust as needed)
                font: {
                  size: 14, // Set the font size for datalabels
                  weight: 'bold',
                },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                max: 100, // X-axis will go up to 100 for percentages
                ticks: {
                  stepSize: 20, // Spacing between tick marks
                  callback: (value) => `${value}%`, // Show percentage labels on the X-axis
                },
                title: {
                  display: false,
                },
                grid: {
                  color: '#DDE3EE', // Set grid line color to #DDE3EE
                  borderDash: [5, 5], // Create dashed lines (5px dash, 5px space)
                },
              },
              y: {
                title: {
                  display: false, // Hides the Y-axis title
                },
                ticks: {
                  padding: 20, // Adds spacing between the bars and labels
                  font: {
                    size: 12, // Y-axis label font size
                  },
                },
                grid: {
                  display: false, // Disable horizontal grid lines
                },
              },
            },
            layout: {
              padding: {
                right: 20, // Adds padding to the right so labels don't get cut off
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
