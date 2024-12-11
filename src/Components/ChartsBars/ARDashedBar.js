import React from 'react'
import '../../CSS/ChartsBarsCSS/ARDashed.css'

const ARDashedBar = ({ progress, color, text, sectionName }) => {
    const dashes = 5;
    const progressPerDash = 100 / dashes;
    const filledDashes = Math.floor(progress / progressPerDash); 
    const partialFill = (progress % progressPerDash) / progressPerDash * 100;

    return (
        <div className="progress-container shadow-lg df flex-column" style={{ marginTop: "1rem" }}>

            <div className="progress-subtext m-3">{sectionName}</div>
            <div style={{ color: `${color}` }} className="progress-label">{progress}/100</div>
            <div className="dashed-progress-bar mt-4 px-4">
                {[...Array(dashes)].map((_, index) => (
                    <div
                        key={index}
                        className="dash "
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
        </div>
    );
}

export default ARDashedBar
