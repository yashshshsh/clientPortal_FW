import React, { useState } from 'react'
import logo from '../Images/Floorwalk logo7x.png';
import '../CSS/Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [active, setActive] = useState("dashboard");

    const navigate = useNavigate();

    const handleActive = (active) =>{
        setActive(active);
        navigate('/'+ active);
    }

    return (
        <div>
            <nav className="header navbar navbar-expand-lg">
                <div className="container-fluid d-flex">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="collNav">
                        <div className="collInner d-flex justify-content-end">
                            <div className="bellIcon mx-1 d-flex align-items-center justify-content-center">
                                <i className="bi bi-bell"></i>
                            </div>
                            <div className="globeIcon mx-3 d-flex align-items-center justify-content-center">
                                <i className="bi bi-globe"></i>
                                <select className="lang">
                                    <option value="en">Eng</option>
                                </select>
                            </div>
                            <div className="logOut d-flex mx-3 align-items-center justify-content-center">
                                <p className="my-2">Log Out</p>
                                <i className="bi bi-box-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py13">
                <div className="navb d-flex flex-wrap justify-content-evenly align-content-between">
                    <div onClick={() => {handleActive("dashboard")}} className={`dashboard gap-2 ${active === "dashboard" ? "bg-active" : ""}`}>
                        <div className="iconList">
                            <i className="bi bi-list"></i>
                        </div>
                        <p>Dashboard</p>
                    </div>
                    <div onClick={() => {handleActive("reportBrowser")}} className={`reportBrowser gap-2 ${active === "reportBrowser" ? "bg-active" : ""}`}>
                        <div className="iconChart">
                            <i className="bi bi-bar-chart"></i>
                        </div>
                        <p>Report Browser</p>
                    </div>
                    <div onClick={() => {handleActive("actionTrack")}} className={`actionTrack gap-2 ${active === "actionTrack" ? "bg-active" : ""}`}>
                        <div className="iconAction">
                            <i className="bi bi-box-arrow-in-down-right"></i>
                        </div>
                        <p>Action Track</p>
                    </div>
                    <div onClick={() => {handleActive("upAudits")}} className={`upAudits gap-2 ${active === "upAudits" ? "bg-active" : ""}`}>
                        <div className="iconClock">
                            <i className="bi bi-clock"></i>
                        </div>
                        <p>Upcoming audits</p>
                    </div>
                    <div onClick={() => {handleActive("storeBrowser")}} className={`storeBrowser gap-2 ${active === "storeBrowser" ? "bg-active" : ""}`}>
                        <div className="iconStore">
                            <i className="bi bi-shop"></i>
                        </div>
                        <p>Store Browser</p>
                    </div>
                    <div onClick={() => {handleActive("storePerformance")}} className={`storePer gap-2 ${active === "storePerformance" ? "bg-active" : ""}`}>
                        <div className="iconPer">
                            <i className="bi bi-archive-fill"></i>
                        </div>
                        <p>Store Performance</p>
                    </div>
                    {active === "AI" ? (<div className="view-Ai d-flex gap-1 my-2 justify-content-center align-items-center">
                        <div className="iconStar my-2">
                            <i className="bi bi-stars"></i>
                        </div>
                        <p className='my-2'>AI Insights</p>
                    </div>) : (<div onClick={() => {handleActive("AI")}} className="AI d-flex gap-2">
                        <div className="divAI">
                            <i className="bi bi-stars"></i>
                        </div>
                        <p className='my-2'>AI Insights</p>
                    </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
