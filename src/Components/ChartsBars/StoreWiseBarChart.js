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
import styles from '../../CSS/Dashboard.module.css';
import downImg from '../../Images/vertical_align_bottom.png';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const StoreWiseBarChart = ({ downloadBarChartAsPNG, barChartRef, stData }) => {
  const total = 100;
  const [barThickness, setBarThickness] = useState(50);
  const [fontSize, setFontSize] = useState(16);
  const [selectedBarIndex, setSelectedBarIndex] = useState(null);

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

    // Add resize listener
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartData = Array.isArray(stData?.data)
  ? stData.data.map((item) => {
      const [store, values] = item || [];
      return {
        label: store?.name || 'Unknown Store',
        value: values?.[0]?.value || 0, 
        colorCode: values?.[0]?.color_code || null,
      };
    })
  : [];

  const labels = chartData.map((item) => item.label);
  const values = chartData.map((item) => item.value);
  const colors = chartData.map((item, index) =>
    index === selectedBarIndex ? '#007DC1' : '#D7F1FF'
  );

  const handleBarClick = (index) => {
    setSelectedBarIndex(index === selectedBarIndex ? null : index);
  };

  return (
    <div
      style={{ minHeight: '420px', backgroundColor: '#FAFAFA' }}
      className="storeBar-parent shadow p-3"
    >
      <div className={`${styles.overallPara} mt-3 d-flex align-items-center`}>
        <p className="my-2 ps-4">
          Overall Performance <span>(Store Wise)</span>
        </p>
        <div
          className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}
        >
          <div onClick={downloadBarChartAsPNG} className={`${styles.downIcon}`}>
            <img src={downImg} alt="img" />
          </div>
        </div>
      </div>
      <div
        ref={barChartRef}
        className="chart-container my-2 p-3"
        style={{ width: '100%', height: '380px' }}
      >
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: 'Score (%) Store Wise',
                data: values,
                backgroundColor: colors,
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
                  display: false,
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

export default StoreWiseBarChart;
