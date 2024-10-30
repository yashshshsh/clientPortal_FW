import React, { useState } from 'react'
import logo from '../Images/Floorwalk logo7x.png';
import CircularBar from '../Components/ChartsBars/CircularBar'
import '../CSS/StoreBrowser.css'
import Trends from './Trends';

const StoreBrowser = () => {

    const [state, setState] = useState("reports");
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
                    <div className="dashboard gap-2">
                        <div className="iconList">
                            <i className="bi bi-list"></i>
                        </div>
                        <p>Dashboard</p>
                    </div>
                    <div className="reportBrowser gap-2">
                        <div className="iconChart">
                            <i className="bi bi-bar-chart"></i>
                        </div>
                        <p>Report Browser</p>
                    </div>
                    <div className="actionTrack gap-2">
                        <div className="iconAction">
                            <i className="bi bi-box-arrow-in-down-right"></i>
                        </div>
                        <p>Action Track</p>
                    </div>
                    <div className="upAudits gap-2">
                        <div className="iconClock">
                            <i className="bi bi-clock"></i>
                        </div>
                        <p>Upcoming audits</p>
                    </div>
                    <div className="storeBrowser gap-2">
                        <div className="iconStore">
                            <i className="bi bi-shop"></i>
                        </div>
                        <p>Store Browser</p>
                    </div>
                    <div className="storePer gap-2">
                        <div className="iconPer">
                            <i className="bi bi-archive-fill"></i>
                        </div>
                        <p>Store Performance</p>
                    </div>
                    <div className="AI d-flex gap-2">
                        <div className="divAI">
                            <i className="bi bi-stars"></i>
                        </div>
                        <p>AI Insights</p>
                    </div>
                </div>
            </div>

            <div className="audit-first px-4 mt-3">
                <div className="rbar text-start d-flex">
                    <p className='my-2'>Store Browser<span>/Insights</span></p>
                </div>
            </div>

            <div className="hero-first row row px-4 d-flex justify-content-between">
                <div className="hero-left col-md-9">
                    <div className="overall d-flex align-items-center gap-2 mt-2">
                        <p className='mt-2'>Overall Score</p>
                        <div className="score-per mb-2">
                            <p>80%</p>
                        </div>
                    </div>
                    <div className="audit-details mt-2 d-flex">
                        <p className='ms-2'>Store Details</p>
                    </div>

                    <div className="store-table my-3 d-flex gap-5">
                        <div className="table-left">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='leftText mt'><strong>Store Name</strong></td>
                                        <td className='rightText'>Store Name 1</td>
                                    </tr>
                                    <tr>
                                        <td className='leftText'><strong>City</strong></td>
                                        <td className='rightText'>Indore</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-right text-start">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='leftText'><strong>Store Address</strong></td>
                                        <td className='rightText'>Indore 452012</td>
                                    </tr>
                                    <tr>
                                        <td className='leftText'><strong>State</strong></td>
                                        <td className='rightText'>Madhya Pradesh</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="hero-right col-md-3 meter p-4 d-flex flex-column align-items-center justify-content-center">
                    <p className='overallPara'>Overall Store Score</p>
                    <CircularBar />
                    <div className="store-score d-flex justify-content-center align-items-center flex-column">
                        <p className='scorePara'>Your Store Score Is Poor</p>
                        <div className="stats">
                            <p className='m-0'>What these stats mean?</p>
                        </div>
                        <div className="grades-div d-flex flex-wrap gap-2 mt-3">
                            <div className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                <p className='grade m-0'>Excellent</p>
                                <p className='percent m-0'>95% to above</p>
                                <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#C1FF99" }} className="mt-1 stats-div"></div>
                            </div>
                            <div className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                <p className='grade m-0'>Good</p>
                                <p className='percent m-0'>80% to 94%</p>
                                <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#EAFF99" }} className="mt-1 stats-div"></div>
                            </div>
                            <div className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                <p className='grade m-0'>Average</p>
                                <p className='percent m-0'>70% to 80%</p>
                                <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#FFFF99" }} className="mt-1 stats-div"></div>
                            </div>
                            <div className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                <p className='grade m-0'>Poor</p>
                                <p className='percent m-0'>50% to 70%</p>
                                <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#FFEB99" }} className="mt-1 stats-div"></div>
                            </div>
                            <div className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                <p className='grade m-0'>Bad</p>
                                <p className='percent m-0'>0% to 50%</p>
                                <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#FFC299" }} className="mt-1 stats-div"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="hero-sec df gap-2">
                <div onClick={() => { setState("trends") }} className={`trends df ${state === "trends" ? "active" : ""}`}>
                    <i class="bi bi-bar-chart-fill"></i>
                    <p>Trends</p>
                </div>
                <div onClick={() => { setState("reports") }} className={`reports df ${state === "reports" ? "active" : ""}`}>
                    <i class="bi bi-calendar-minus"></i>
                    <p>Report</p>
                </div>
                <div onClick={() => { setState("proof") }} className={`proof df ${state === "proof" ? "active" : ""}`}>
                    <i class="bi bi-arrow-left-right"></i>
                    <p>Proof Comparison</p>
                </div>
            </div>
            <div className="trend-comp">
                <Trends />
            </div>
        </div>
    )
}

export default StoreBrowser
