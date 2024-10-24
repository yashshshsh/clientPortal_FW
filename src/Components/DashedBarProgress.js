import React from 'react';
import '../CSS/DashedBarProgress.css';

const DashedProgressBar = ({ progress,color }) => {
  // Calculate the percentage of each dash that should be filled
  const dashes = 5;
  const progressPerDash = 100 / dashes;
  const filledDashes = Math.floor(progress / progressPerDash); // Full dashes
  const partialFill = (progress % progressPerDash) / progressPerDash * 100; // Partial fill of the next dash

  return (
    <div className="progress-container shadow-lg" style={{marginTop : "1rem"}}>
      <div style={{color : `${color}`}} className="progress-label">{progress}/100</div>
      <div className="dashed-progress-bar mt-4 px-4">
        {[...Array(dashes)].map((_, index) => (
          <div
            key={index}
            className="dash"
            style={{
              background: index < filledDashes
                ? `${color}`  // Fully filled dash
                : index === filledDashes
                ? `linear-gradient(to right, ${color} ${partialFill}%, #e6e6e6 ${partialFill}%)`
                : '#e6e6e6'  // Unfilled dash
            }}
          ></div>
        ))}
      </div>
      <div className="progress-subtext mt-4">NPS - June - 2024</div>
    </div>
  );
};

export default DashedProgressBar;
