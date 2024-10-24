import React from 'react'
import logo from '../Images/Floorwalk logo7x.png'
import '../CSS/ReportBrowser.css';

const ReportBrowser = () => {
    return (
        <div>
            <nav className="header navbar navbar-expand-lg">
                <div className="container-fluid d-flex">
                    <div className="logo">
                        <img src={logo} alt='img'></img>
                    </div>
                    <div className="collNav ">
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
                                <p className='my-2'>Log Out</p>
                                <i className="bi bi-box-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="py13">
                <div className="navb d-flex flex-wrap justify-content-evenly align-items-center">
                    <div className="dashboard gap-2">
                        <div className="iconList">
                            <i class="bi bi-list"></i>
                        </div>
                        <p>Dashboard</p>
                    </div>
                    <div className="reportBrowser gap-2">
                        <div className="iconChart">
                            <i class="bi bi-bar-chart"></i>
                        </div>
                        <p>Report Browser</p>
                    </div>
                    <div className="actionTrack gap-2">
                        <div className="iconAction">
                            <i class="bi bi-box-arrow-in-down-right"></i>
                        </div>
                        <p>Action Track</p>
                    </div>
                    <div className="upAudits gap-2">
                        <div className="iconClock">
                            <i class="bi bi-clock"></i>
                        </div>
                        <p>Upcoming audits</p>
                    </div>
                    <div className="storeBrowser gap-2">
                        <div className="iconStore">
                            <i class="bi bi-shop"></i>
                        </div>
                        <p>Store Browser</p>
                    </div>
                    <div className="storePer gap-2">
                        <div className="iconPer">
                            <i class="bi bi-archive-fill"></i>
                        </div>
                        <p>Store Performance</p>
                    </div>
                    <div className="AI d-flex gap-2">
                        <div className="div-AI">
                            <i class="bi bi-stars"></i>
                        </div>
                        <p>AI Insights</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportBrowser
