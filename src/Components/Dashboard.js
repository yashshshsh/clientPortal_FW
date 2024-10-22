import React from 'react'
import '../CSS/Dashboard.css'
import logo from '../Images/Floorwalk logo7x.png'
import DashedProgressBar from './DashedBarProgress'
import AuditCalendar from './AuditCalender'
import BarChart from './BarChart'
import StoreWiseBarChart from './StoreWiseBarChart'
import OverallPerformance from './OverallPerformance'

const Dashboard = () => {
    return (
        <div>
            <nav className="header navbar navbar-expand-lg">
                <div className="container-fluid d-flex">
                    <div className="logo">
                        <img src={logo} alt='img'></img>
                    </div>
                    <div className="coll-nav ">
                        <div className="coll-inner d-flex justify-content-end">
                            <div className="bell-icon mx-1 d-flex align-items-center justify-content-center">
                                <i className="bi bi-bell"></i>
                            </div>
                            <div className="globe-icon mx-3 d-flex align-items-center justify-content-center">
                                <i className="bi bi-globe"></i>
                                <select className="lang">
                                    <option value="en">Eng</option>
                                </select>
                            </div>
                            <div className="log-out d-flex mx-3 align-items-center justify-content-center">
                                <p className='my-2'>Log Out</p>
                                <i className="bi bi-box-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="py1-3">
                <div className="navb d-flex flex-wrap justify-content-evenly align-content-between">
                    <div className="dashboard gap-2">
                        <div className="icon-list">
                            <i class="bi bi-list"></i>
                        </div>
                        <p>Dashboard</p>
                    </div>
                    <div className="report-browser gap-2">
                        <div className="icon-chart">
                            <i class="bi bi-bar-chart"></i>
                        </div>
                        <p>Report Browser</p>
                    </div>
                    <div className="action-track gap-2">
                        <div className="icon-action">
                            <i class="bi bi-box-arrow-in-down-right"></i>
                        </div>
                        <p>Action Track</p>
                    </div>
                    <div className="up-audits gap-2">
                        <div className="icon-clock">
                            <i class="bi bi-clock"></i>
                        </div>
                        <p>Upcoming audits</p>
                    </div>
                    <div className="store-browser gap-2">
                        <div className="icon-store">
                            <i class="bi bi-shop"></i>
                        </div>
                        <p>Store Browser</p>
                    </div>
                    <div className="store-per gap-2">
                        <div className="icon-per">
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

            <div className="hero-dashboard p-3">
                <p className='dash-heading'>Dashboard</p>

                <div className="dash-first row d-flex ">
                    <div className="first-left col-md-6">
                        <div className="first-heading text-start">
                            <p>Latest Audit Cycle Score</p>
                        </div>


                        <div className="l1-first my-1">
                            <div className="row1 row">
                                <div className="l1 col-sm-6 d-flex justify-content-center align-items-center">
                                    <DashedProgressBar color={"#8DC63F"} progress={95} />
                                </div>
                                <div className="l1 col-sm-6 d-flex  justify-content-center align-items-center">
                                    <DashedProgressBar color={"#C9727B"} progress={89} />
                                </div>
                            </div>

                            <div className="row2 row">
                                <div className="l1 col-sm-6 d-flex justify-content-center align-items-center">
                                    <DashedProgressBar color={"#C6B83F"} progress={95} />
                                </div>
                                <div className="l1 col-sm-6 d-flex  justify-content-center align-items-center">
                                    <DashedProgressBar color={"#B4DA1F"} progress={95} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="first-right col-md-6">
                        <div className="first-heading text-start">
                            <p>Upcoming Audits</p>
                        </div>
                        <div className="div-calender my-2">
                            <AuditCalendar />
                        </div>
                    </div>
                </div>

                <div className="dash-second my-2">
                    <div className="dash-sec-head flex-wrap d-flex">
                        <div className="audit-cycle d-flex flex-column">
                            <p className='text-start'>Audit Cycle</p>
                            <select>
                                <option>Nps - June - 2024</option>
                            </select>
                        </div>
                        <div className="audit-cycle-right mt-4 ms-auto gap-4 d-flex justify-content-center align-items-center">
                            <div className="add-section d-flex gap-2 justify-content-center align-items-center">
                                <p>Add Section</p>
                                <i class="bi bi-plus-square"></i>
                            </div>

                            <div className="down-icon">
                                <i class="bi bi-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className="dash-sec-hero p-3 justify-content-center align-items-center row d-flex">
                        <div className="sec-hero-left col-sm-9">
                            <BarChart />
                        </div>

                        <div className="sec-hero-section shadow-lg col-sm-3">
                            <div className="sec-head">
                                <p>Section</p>
                            </div>
                            <div className="section1">
                                <p className='perPara'>60%</p>
                                <p className='secPara'>Customer Arrival and Staff Grooming Analysis</p>
                            </div>
                            <div className="section1">
                                <p className='perPara'>60%</p>
                                <p className='secPara'>Store Exterior</p>
                            </div>
                            <div className="section1">
                                <p className='perPara'>60%</p>
                                <p className='secPara'>Store Exterior</p>
                            </div>
                            <div className="section1">
                                <p className='perPara'>60%</p>
                                <p className='secPara'>Store Exterior</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dash-third">
                    <div className="dash-third-head flex-wrap  d-flex">
                        <div className="improvement d-flex flex-column">
                            <p className='text-start'>Improvement areas based on observation</p>
                            <select>
                                <option>Nps-June-2024</option>
                            </select>
                        </div>
                        <div className="improvement-right ms-auto d-flex justify-content-center align-items-center">
                            <div className="down-icon">
                                <i class="bi bi-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className="dash-third-hero my-4 bg-light">
                        <table>
                            <tr>
                                <th style={{ width: "4vw" }}>S no.</th>
                                <th>Section</th>
                                <th>Questions</th>
                                <th>Obtained Marks/Total Marks</th>
                                <th>Marks Lost</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Customer Arrival and Staff Grooming Analysis</td>
                                <td>Was the in-store branding like wall branding, pillar branding, drop down headers, glass branding, category drop downs, etc. maintained well?1/ 5 4</td>
                                <td>1/5</td>
                                <td>
                                    <div className="t-score">4</div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Customer Arrival and Staff Grooming Analysis</td>
                                <td>Was the in-store branding like wall branding, pillar branding, drop down headers, glass branding, category drop downs, etc. maintained well?1/ 5 4</td>
                                <td>1/5</td>
                                <td>
                                    <div className="t-score">4</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className="dash-forth">
                    <div className="dash-third-head flex-wrap d-flex">
                        <div className="improvement d-flex flex-column">
                            <p className='text-start'>Improvement areas based on observation</p>
                            <select>
                                <option>Nps-June-2024</option>
                            </select>
                        </div>
                        <div className="improvement-right ms-auto d-flex justify-content-center align-items-center">
                            <div className="down-icon d-none">
                                <i class="bi bi-download"></i>
                            </div>
                        </div>
                    </div>


                    <div className="forth-charts mt-4 row d-flex">
                        <div className="dash-forth-left col-md-6">
                            <div className="overall-para p-2 d-flex">
                                <p>Overall Performance <span>(Store Wise)</span></p>
                                <div className="improvement-right ms-auto d-flex justify-content-center align-items-center">
                                    <div className="down-icon" style={{ height: "2.5rem", width: "2.5rem" }}>
                                        <i class="bi bi-download"></i>
                                    </div>
                                </div>
                            </div>
                            <StoreWiseBarChart />
                        </div>

                        <div className="dash-forth-left col-md-6">
                            <div className="overall-para p-2 d-flex">
                                <p>Overall Performance <span>(City Wise)</span></p>
                                <div className="improvement-right ms-auto d-flex justify-content-center align-items-center">
                                    <div className="down-icon" style={{ height: "2.5rem", width: "2.5rem" }}>
                                        <i class="bi bi-download"></i>
                                    </div>
                                </div>
                            </div>
                            <OverallPerformance />
                        </div>
                    </div>
                </div>

                <div className="dash-fifth">
                    <div className="dash-third-head flex-wrap d-flex">
                        <div className="improvement d-flex flex-column ">
                            <p className='text-start'>Question Summary</p>
                            <select>
                                <option>Nps-June-2024</option>
                            </select>
                        </div>
                        <div className="improvement-right ms-auto d-flex justify-content-center align-items-center">
                            <div className="down-icon">
                                <i class="bi bi-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className="fifth-hero">
                        <div className="customer-arr">
                            <p>Customer Arrival and Staff Grooming Analysis</p>
                        </div>
                        <div className="fifth-table">
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <th>S no.</th>
                                    <th>Questions</th>
                                    <th>Marks Lost</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Was the store ambience visible from outside and feel inviting?</td>
                                    <td className='marks-lost'>
                                        <div className="td-first d-flex align-items-center justify-content-between">
                                            <div className="t-tf">Yes</div>
                                            <div className="t-per d-flex align-items-center justify-content-center">80%</div>
                                        </div>
                                        <div className="td-first d-flex align-items-center justify-content-between">
                                            <div className="t-tf">No</div>
                                            <div className="t-per d-flex align-items-center justify-content-center">80%</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
