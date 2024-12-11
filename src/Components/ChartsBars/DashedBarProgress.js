 import React from 'react';
import '../../CSS/ChartsBarsCSS/DashedBarProgress.css';

const DashedProgressBar = ({ progress,color,shadow }) => {
  const dashes = 5;
  const progressPerDash = 100 / dashes;
  const filledDashes = Math.floor(progress / progressPerDash); 
  const partialFill = (progress % progressPerDash) / progressPerDash * 100; 

  return (
    <div className={`progress-container${shadow === true?" shadow-lg ":""}`} style={{marginTop : "1rem"}}>
      <div style={{color : `${color}`}} className="progress-label df">{progress}/100</div>
      <div className="dashed-progress-bar mt-4 mx-auto px-4">
        {[...Array(dashes)].map((_, index) => (
          <div
            key={index}
            className="dash"
            style={{
              background: index < filledDashes
                ? `${color}` 
                : index === filledDashes
                ? `linear-gradient(to right, ${color} ${partialFill}%, #e6e6e6 ${partialFill}%)`
                : '#e6e6e6'
            }}  
          ></div>
        ))}
      </div>
      {shadow === false?"":(<div className="progress-subtext mt-4">NPS - June - 2024</div>)}
    </div>
  );
};

export default DashedProgressBar;
