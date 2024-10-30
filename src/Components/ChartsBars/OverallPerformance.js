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

const OverallPerformance = () => {
  const [barThickness, setBarThickness] = useState(50);
  const [fontSize, setFontSize] = useState(16);

  const sourceData = [
    { label: 'City 1', value: 40 },
    { label: 'City 2', value: 20 },
    { label: 'City 3', value: 50 },
    { label: 'City 4', value: 60 }, // Highlighted bar with 60%
    { label: 'City 5', value: 10 },
    { label: 'City 6', value: 60 }, // Highlighted bar with 60%
    { label: 'City 7', value: 30 },
    { label: 'City 8', value: 50 },
    { label: 'City 9', value: 40 },
    { label: 'City 10', value: 30 },
  ];

  const total = 100; // Assuming the maximum value is 100 for percentage calculation

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
                label: 'NPS Score (%) Store Wise',
                data: sourceData.map((data) => data.value),
                backgroundColor: sourceData.map((data) =>
                  data.value === 60 ? '#007DC1' : '#D7F1FF'
                ),
                borderRadius: 5,
                barThickness: barThickness, // Use dynamic bar thickness
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                align: 'end',
                anchor: 'end',
                formatter: (value) => `${((value / total) * 100).toFixed(0)}%`,
                color: '#007DC1',
                font: {
                  size: fontSize, // Use dynamic font size
                  weight: 'bold',
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  stepSize: 20,
                  callback: (value) => `${value}%`,
                  color: '#353E4C',
                },
                title: {
                  display: true,
                  text: 'NPS Score (%) Store Wise',
                  font: {
                    size: 12,
                    weight: '400',
                  },
                  color: '#353E4C',
                },
                grid: {
                  color: '#D7F1FF',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Total score',
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
                  color: '#353E4C',
                },
                grid: {
                  display: false,
                },
              },
            },
            layout: {
              padding: {
                right: 20,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default OverallPerformance;
