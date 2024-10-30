import React, { useEffect, useState } from 'react';
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

const StoreWiseBarChart = () => {
  const sourceData = [
    { label: 'Store1', value: 40 },
    { label: 'Store2', value: 20 },
    { label: 'Store3', value: 50 },
    { label: 'Store4', value: 60 },
    { label: 'Store5', value: 10 },
    { label: 'Store6', value: 60 }, // Highlighted bar with 60%
    { label: 'Store7', value: 30 },
    { label: 'Store8', value: 50 },
    { label: 'Store9', value: 40 },
    { label: 'Store10', value: 30 },
  ];

  const total = 100; // Assuming the maximum value is 100 for percentage calculation

  // State to manage bar thickness and font size
  const [barThickness, setBarThickness] = useState(50);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 991) { // Change based on your breakpoint
        setBarThickness(20);
        setFontSize(13);
      } else if(window.innerWidth < 767) {
        setBarThickness(10);
        setFontSize(10);
      } else {
        setBarThickness(50);
        setFontSize(16);
      }
    };
    handleResize(); // Call initially to set the correct values
  }, []);

  return (
    <div>
      <div className="chart-container mt-4 p-3" style={{ width: '100%' }}>
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: 'Score (%) Store Wise',
                data: sourceData.map((data) => data.value),
                backgroundColor: sourceData.map((data) =>
                  data.label === 'Store6' ? '#007DC1' : '#D7F1FF'
                ), // Custom colors for bars
                borderRadius: 5,
                barThickness: barThickness, // Use dynamic bar thickness
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false, // Hide legend
              },
              datalabels: {
                align: 'end', // Align the labels to the top of the bars
                anchor: 'end',
                formatter: (value) => `${((value / total) * 100).toFixed(0)}%`, // Show percentage
                color: '#007DC1', // Label color
                font: {
                  size: fontSize, // Use dynamic font size
                  weight: 'bold',
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100, // Y-axis will go up to 100 for percentages
                ticks: {
                  stepSize: 20, // Spacing between tick marks
                  callback: (value) => `${value}%`, // Show percentage labels on the Y-axis
                  color: '#353E4C', // Y-axis tick color
                },
                title: {
                  display: true,
                  text: 'Score (%) Store Wise',
                  font: {
                    size: 12,
                    weight: '400',
                  },
                  color: '#353E4C',
                },
                grid: {
                  color: '#D7F1FF', // Grid line color
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Total Store',
                  font: {
                    size: 12,
                    weight: '400',
                  },
                  color: '#353E4C',
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                  color: '#353E4C', // X-axis tick color
                },
                grid: {
                  display: false, // Hide grid lines for X-axis
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

export default StoreWiseBarChart;
