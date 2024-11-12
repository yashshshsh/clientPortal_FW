import React, { useState } from 'react'
import '../CSS/CustomSelect.css'
import { useNavigate } from 'react-router-dom';

const CustomSelect = () => {
    const [selectedOption, setSelectedOption] = useState("Dashboard");
    const [selectedIcon, setSelectedIcon] = useState("bi-list")
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleActive = (active) => {
        navigate('/' + active);
        setIsOpen(!isOpen);
    }
    
    return (
        <div>
            <div className="custom-select z-3 d-flex flex-column align-items-center">
                {selectedOption === "AI Insights"?(<div onClick={() => setIsOpen(!isOpen)} className="view-Ai d-flex gap-1 my-2 justify-content-center align-items-center">
                        <div className="iconStar my-2">
                            <i className="bi bi-stars"></i>
                        </div>
                        <p className='my-2'>AI Insights</p>
                    </div>):(<button onClick={() => setIsOpen(!isOpen)} className="select-button mx-auto my-3">
                    <div className="select-div df gap-2">
                        <i className={`bi ${selectedIcon}`}></i>
                        <p className='my-2'>{selectedOption}</p>
                    </div>
                    <i className="bi bi-chevron-down"></i>
                </button>)}
            
                {isOpen && (
                    <div className="divas">
                        <ul className="dropdown-options">
                            <li
                                onClick={() => {
                                    handleActive("dashboard");
                                    setSelectedOption("Dashboard");
                                    setSelectedIcon("bi-list");
                                }}
                                className="dropdown-item"
                            >
                                <i className="bi bi-list"></i>
                                <p>Dashboard</p>
                            </li>
                            <li
                                onClick={() => {
                                    handleActive("reportBrowser");
                                    setSelectedOption("Report Browser");
                                    setSelectedIcon("bi-bar-chart");
                                }}
                                className="dropdown-item"
                            >
                                <i className="bi bi-bar-chart"></i>
                                <p>Report Browser</p>
                            </li>
                            <li
                                onClick={() => {
                                    handleActive("actionTrack");
                                    setSelectedOption("Action Track");
                                    setSelectedIcon("bi-box-arrow-in-down-right");
                                }}
                                className="dropdown-item"
                            >
                                <i className="bi bi-box-arrow-in-down-right"></i>
                                <p>Action Track</p>
                            </li>
                            <li
                                onClick={() => {
                                    handleActive("upAudits");
                                    setSelectedOption("Upcoming Audits");
                                    setSelectedIcon("bi-clock");
                                }}
                                className="dropdown-item"
                            >
                                <i className="bi bi-clock"></i>
                                <p>Upcoming Audits</p>
                            </li>
                            <li
                                onClick={() => {
                                    handleActive("storeBrowser");
                                    setSelectedOption("Store Browser");
                                    setSelectedIcon("bi-shop");
                                }}
                                className="dropdown-item"
                            >
                                <i className="bi bi-shop"></i>
                                <p>Store Browser</p>
                            </li>
                            <li
                                onClick={() => {
                                    handleActive("storePerformance");
                                    setSelectedOption("Store Performance");
                                    setSelectedIcon("bi-archive-fill");
                                }}
                                className="dropdown-item"
                            >
                                <i className="bi bi-archive-fill"></i>
                                <p>Store Performance</p>
                            </li>
                            <li
                                onClick={() => {
                                    handleActive("AI");
                                    setSelectedOption("AI Insights");
                                    setSelectedIcon("bi-stars");
                                }}
                                className="dropdown-item"
                            >
                                <i className="bi bi-stars"></i>
                                <p>AI Insights</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomSelect
