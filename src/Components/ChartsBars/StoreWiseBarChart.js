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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from '../../CSS/Dashboard.module.css'
import downImg from '../../Images/vertical_align_bottom.png'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const StoreWiseBarChart = () => {
  const sourceData = [
    { label: 'Store1', value: 40 },
    { label: 'Store2', value: 20 },
    { label: 'Store3', value: 50 },
    { label: 'Store4', value: 60 },
    { label: 'Store5', value: 10 },
    { label: 'Store6', value: 60 },
    { label: 'Store7', value: 30 },
    { label: 'Store8', value: 50 },
    { label: 'Store9', value: 40 },
    { label: 'Store10', value: 30 },
  ];

  const total = 100;
  const [barThickness, setBarThickness] = useState(50);
  const [fontSize, setFontSize] = useState(16);
  const [selectedBarIndex, setSelectedBarIndex] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 991) { // Change based on your breakpoint
        setBarThickness(15);
        setFontSize(13);
      } else if (window.innerWidth < 767) {
        setBarThickness(10);
        setFontSize(10);
      } else {
        setBarThickness(29);
        setFontSize(16);
      }
    };
    handleResize();
  }, []);

  const handleBarClick = (index) => {
    setSelectedBarIndex(index === selectedBarIndex ? null : index);
  };

  return (
    <div style={{minheight : "420px",backgroundColor:"#FAFAFA"}} className='storeBar-parent shadow p-3'>
      <div className={`${styles.overallPara} mt-3 d-flex align-items-center`}>
        <p className='my-2 ps-4'>Overall Performance <span>(Store Wise)</span></p>
        <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
          <div className={`${styles.downIcon}`}>
            <img src={downImg} alt="img" />
          </div>
        </div>
      </div>
      <div className="chart-container my-2 p-3" style={{ width: '100%',height:"380px" }}>
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: 'Score (%) Store Wise',
                data: sourceData.map((data) => data.value),
                backgroundColor: sourceData.map((_, index) =>
                  index === selectedBarIndex ? '#007DC1' : '#D7F1FF'
                ),
                borderRadius: 5,
                barThickness: barThickness,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                align: 'end',
                anchor: 'end',
                formatter: (value, context) => {
                  return context.dataIndex === selectedBarIndex
                    ? `${((value / total) * 100).toFixed(0)}%`
                    : '';
                },
                color: '#003C5D',
                font: {
                  size: fontSize,
                  weight: 'bold',
                },
              },
            },
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const index = elements[0].index;
                handleBarClick(index);
              }
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
                  text: 'Score (%) Store Wise',
                  font: {
                    size: 12,
                    weight: '400',
                  },
                  color: '#353E4C',
                },
                grid: {
                  display: false, // Remove horizontal grid lines
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
                  padding: {
                    top: 20, // Adjusted padding for margin
                  },
                },
                ticks: {
                  font: {
                    size: 10,
                  },
                  color: '#353E4C',
                },
                grid: {
                  display: false, // Remove grid lines on X-axis
                },
                border: {
                  display: false, // Remove X-axis line at 0%
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

export default StoreWiseBarChart;
