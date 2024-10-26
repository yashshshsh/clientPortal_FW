import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar = () => {
  const value = 85; // progress value

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
          pathColor: '#EAFF99',
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
