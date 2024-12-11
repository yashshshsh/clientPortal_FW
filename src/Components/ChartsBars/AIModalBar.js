import React from "react";
import { Bar } from "react-chartjs-2";

const AIModalBar = ({ emotionData }) => {
    const chartData = {
        labels: emotionData.map((item) => item.name),
        datasets: [
            {
                label: "Emotions",
                data: emotionData.map((item) => item.value),
                backgroundColor: "#337ab7",
                borderWidth: 1,
                barThickness: 20,  
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false, 
                },
                title: {
                    display: true,
                    text: "Emotions",
                    color: "#337ab7",
                },
            },
            y: {
                grid: {
                    color: "rgba(0,0,0,0.2)",
                    borderDash: [5, 5], 
                },
                title: {
                    display: true,
                    text: "Values",
                    color: "#337ab7",
                },
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 3, 
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) =>
                        tooltipItem.raw === null ? "N/A" : tooltipItem.raw,
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default AIModalBar;
