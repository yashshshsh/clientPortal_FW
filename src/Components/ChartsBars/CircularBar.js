import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar = () => {
  const value = 80; // progress value

  // Function to determine arc color based on the value
  const getArcColor = (value) => {
    if (value >= 95) return "#C1FF99"; // Excellent
    if (value >= 80) return "#EAFF99"; // Good
    if (value >= 70) return "#FFFF99"; // Average
    if (value >= 50) return "#FFEB99"; // Poor
    return "#FFC299"; // Bad
  };

  return (
    <div className='circularBar'>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={5} // This controls the width of the curve
        circleRatio={0.5}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: 'round',
          trailColor: '#f0f0f0',
          pathColor: getArcColor(value), // Dynamic path color
          textColor: '#003C5D',
          pathTransitionDuration: 0.5,
          textSize: '20px',
          style: {
            fontWeight: '900', // Bold text
            fontFamily: 'Lato', // Correct way to set font family
            lineHeight: '58px' // Correctly formatted line height
          }
        })}
      />
    </div>
  );
}

export default CircularBar;
