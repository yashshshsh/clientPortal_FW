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
import styles from '../../CSS/Dashboard.module.css';
import downImg from '../../Images/vertical_align_bottom.png';

// Register Chart.js components and plugins
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels // Register the datalabels plugin
);

const OverallPerformance = ({ downloadBarChartAsPNG, barChartRef, cityData }) => {
  const [barThickness, setBarThickness] = useState(50);
  const [fontSize, setFontSize] = useState(16);
  const [selectedBarIndex, setSelectedBarIndex] = useState(0);

  const chartData = cityData?.data?.map(([city, scores]) => ({
    label: city?.name || 'Unknown City',
    value: scores?.[0]?.value || 0,
  })) || [];

  const total = 100; // Total value for percentage calculation

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 991) {
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
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBarClick = (index) => {
    setSelectedBarIndex(index === selectedBarIndex ? null : index);
  };

  return (
    <div style={{ minHeight: "420px", backgroundColor: "#FAFAFA" }} className="storeBar-parent shadow p-3">
      <div className={`${styles.overallPara} mt-3 d-flex align-items-center`}>
        <p className="my-2 ps-4">Overall Performance <span>(City Wise)</span></p>
        <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
          <div onClick={downloadBarChartAsPNG} className={`${styles.downIcon}`}>
            <img src={downImg} alt="img" />
          </div>
        </div>
      </div>
      <div ref={barChartRef} className="chart-container my-2 p-3" style={{ width: '100%', height: "380px" }}>
        <Bar
          data={{
            labels: chartData.map((data) => data.label),
            datasets: [
              {
                label: 'NPS Score (%) City Wise',
                data: chartData.map((data) => data.value),
                backgroundColor: chartData.map((_, index) =>
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
                  text: 'NPS Score (%) City Wise',
                  font: {
                    size: 12,
                    weight: '400',
                  },
                  color: '#353E4C',
                },
                grid: {
                  display: false,
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Cities',
                  font: {
                    size: 12,
                    weight: '400',
                  },
                  color: '#353E4C',
                  padding: {
                    top: 20,
                  },
                },
                ticks: {
                  font: {
                    size: 10,
                  },
                  color: '#353E4C',
                },
                grid: {
                  display: false,
                },
                border: {
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
