import React from 'react'
import '../../CSS/ChartsBarsCSS/ARDashed.css'

const ARDashedBar = ({ progress, color, text }) => {
    const dashes = 5;
    const progressPerDash = 100 / dashes;
    const filledDashes = Math.floor(progress / progressPerDash); // Full dashes
    const partialFill = (progress % progressPerDash) / progressPerDash * 100; // Partial fill of the next dash

    return (
        <div className="progress-container shadow-lg df flex-column" style={{ marginTop: "1rem" }}>

            {text === 'survey' ? <div className="progress-subtext m-3">Survey Details</div> :
                <div className="progress-subtext m-3">NPS Survey</div>}


            <div style={{ color: `${color}` }} className="progress-label">{progress}/100</div>
            <div className="dashed-progress-bar mt-4 px-4">
                {[...Array(dashes)].map((_, index) => (
                    <div
                        key={index}
                        className="dash "
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
        </div>
    );
}

export default ARDashedBar
