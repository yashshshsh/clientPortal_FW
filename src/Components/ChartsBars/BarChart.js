import React , {useState} from 'react';
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

const BarChart = ({tsData}) => {
  const sectionLabels = tsData?.section_master || []; // Y-axis labels
  const values = tsData?.values[0] || []; 
  const total = 100; // Assuming the maximum value is 100 for percentage calculation
  const [selectedBarIndex, setSelectedBarIndex] = useState(0);

  const sourceData = sectionLabels.map((label, index) => ({
    label: label,
    value: values[index]?.value || 0, // Safely get the value
  }));


  const handleBarClick = (index) => {
    setSelectedBarIndex(index === selectedBarIndex ? null : index);
  };

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
                backgroundColor: sourceData.map((_, index) =>
                  index === selectedBarIndex ? '#007DC1' : '#D7F1FF'
                ),
                borderRadius: 5,
                barThickness: 20, // Adjust bar thickness
              },
            ],
          }}
          options={{
            indexAxis: 'y', // Horizontal bar chart
            maintainAspectRatio: false,
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const index = elements[0].index; // Get the index of the clicked bar
                handleBarClick(index);
                
              }
            },
            plugins: {
              legend: {
                display: false, // Hide legend
              },
              datalabels: {
                align: 'end', // Align the labels to the end (right) of the bars
                anchor: 'end',
                formatter: (value, context) => {
                  return context.dataIndex === selectedBarIndex
                    ? `${((value / total) * 100).toFixed(0)}%`
                    : '';
                },
                color: '#003C5D', // Label color (adjust as needed)
                font: { 
                  size: 14,
                  weight : "bold"
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
                  display: false,
                },
                ticks: {
                  padding: 20,
                  color: '#003C5D',
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
