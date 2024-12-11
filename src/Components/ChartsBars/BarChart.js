import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = ({ filteredData }) => {
  const chartRef = useRef(null); 
  const sectionLabels = filteredData?.section_master || [];
  const values = filteredData?.values[0] || [];

  const total = 100;
  const [selectedBarIndex, setSelectedBarIndex] = useState(null);

  const sourceData = sectionLabels.map((label, index) => ({
    label: label,
    value: values[index]?.value || 0,
  }));

  const handleBarClick = (index) => {
    setSelectedBarIndex(index === selectedBarIndex ? null : index);
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div>
      <div
        className="chart-container"
        style={{
          height: '18rem',
          width: '97%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Bar
          ref={chartRef} 
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: 'Count',
                data: sourceData.map((data) => data.value),
                backgroundColor: sourceData.map((_, index) =>
                  index === selectedBarIndex ? '#007DC1' : '#B0E3FF'
                ),
                hoverBackgroundColor: '#007DC1',
                borderRadius: 5,
                barThickness: 20,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 2,
            indexAxis: 'y',
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const index = elements[0].index;
                handleBarClick(index);
              }
            },
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                align: 'end',
                anchor: 'end',
                formatter: (value) => {
                  return value < 100 ? `${((value / total) * 100).toFixed(0)}%` : '';
                },
                color: '#003C5D',
                font: {
                  size: 14,
                  weight: 'bold',
                  family: 'Lato, sans-serif',
                },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                max: total,
                ticks: {
                  stepSize: 20,
                  callback: (value) => `${value}%`,
                  color: '#003C5D',
                  font: {
                    size: 12,
                    family: 'Lato, sans-serif',
                  },
                },
                grid: {
                  color: '#DDE3EE',
                  borderDash: [5, 5],
                },
              },
              y: {
                ticks: {
                  padding: 20,
                  color: '#003C5D',
                  font: {
                    size: 12,
                    family: 'Lato, sans-serif',
                  },
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

export default BarChart;
