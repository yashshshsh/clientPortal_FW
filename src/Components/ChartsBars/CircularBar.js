import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar = ({storeIdData}) => {
  const value = storeIdData?.audit?.store?.get_total_percentage.score || 0;

  const getArcColor = (value) => {
    if (value >= 95) return "#C1FF99"; 
    if (value >= 80) return "#EAFF99"; 
    if (value >= 70) return "#FFFF99"; 
    if (value >= 50) return "#FFEB99";
    return "#FFC299"; 
  };

  return (
    <div className='circularBar'>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={5} 
        circleRatio={0.5}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: 'round',
          trailColor: '#f0f0f0',
          pathColor: getArcColor(value),
          textColor: '#003C5D',
          pathTransitionDuration: 0.5,
          textSize: '20px',
          style: {
            fontWeight: '900', 
            fontFamily: 'Lato',
            lineHeight: '58px' 
          }
        })}
      />
    </div>
  );
}

export default CircularBar;
