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
import '../../CSS/Dashboard.css';
import downImg from '../../Images/vertical_align_bottom.png';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const OverallPerformance = ({ downloadBarChartAsPNG, barChartRef, cityData }) => {
  const [barThickness, setBarThickness] = useState(50);
  const [fontSize, setFontSize] = useState(16);
  const [selectedBarIndex, setSelectedBarIndex] = useState(null);

  const chartData = (cityData?.data || []).map(([city, scores]) => ({
    label: city?.name || 'Unknown City',
    value: scores?.[0]?.value || 0,
  }));

  const total = 100; // Total value for percentage calculation

  const resizeHandler = () => {
    if (window.innerWidth < 767) {
      setBarThickness(10);
      setFontSize(10);
    } else if (window.innerWidth < 991) {
      setBarThickness(15);
      setFontSize(13);
    } else {
      setBarThickness(29);
      setFontSize(16);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    resizeHandler(); // Initialize on mount
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const handleBarClick = (index) => {
    setSelectedBarIndex(index === selectedBarIndex ? null : index);
  };

  const labels = chartData.map((data) => data.label);
  const dataValues = chartData.map((data) => data.value);

  return (
    <div
      style={{
        minHeight: '420px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
      }}
      className="storeBar-parent shadow p-3"
    >
      <div className="overallPara mt-3 d-flex align-items-center">
        <p className="my-2 ps-4">
          Overall Performance <span>(City Wise)</span>
        </p>
        <div className="improvementRight ms-auto d-flex justify-content-center align-items-center">
          <div onClick={downloadBarChartAsPNG} className="downIcon">
            <img src={downImg} alt="Download Chart" />
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
                label: 'NPS Score (%) City Wise',
                data: dataValues,
                backgroundColor: dataValues.map((_, index) =>
                  index === selectedBarIndex ? '#007DC1' : '#B0E3FF'
                ),
                hoverBackgroundColor: '#007DC1',
                borderRadius: 5,
                barThickness: barThickness,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 2, // High-resolution rendering
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                align: 'end',
                anchor: 'end',
                formatter: (value, context) =>
                  context.dataIndex === selectedBarIndex
                    ? `${((value / total) * 100).toFixed(0)}%`
                    : '',
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
                  font: {
                    family: 'DM Sans',
                  },
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
                    family: 'DM Sans',
                  },
                  color: '#353E4C',
                  padding: {
                    top: 20,
                  },
                },
                ticks: {
                  font: {
                    size: 10,
                    family: 'DM Sans',
                  },
                  color: '#353E4C',
                },
                grid: {
                  display: false,
                },
                border: {
                  display: true,
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
