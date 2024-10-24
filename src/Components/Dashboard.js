import React from 'react'
import styles from '../CSS/Dashboard.module.css'
import logo from '../Images/Floorwalk logo7x.png'
import DashedProgressBar from './DashedBarProgress'
import AuditCalendar from './AuditCalender'
import BarChart from './BarChart'
import StoreWiseBarChart from './StoreWiseBarChart'
import OverallPerformance from './OverallPerformance'

const Dashboard = () => {
    return (
        <div>
            <nav className={`${styles.header} navbar navbar-expand-lg`}>
                <div className="container-fluid d-flex">
                    <div className={styles.logo}>
                        <img src={logo} alt='img' />
                    </div>
                    <div className={styles.collNav}>
                        <div className={`${styles.collInner} d-flex justify-content-end`}>
                            <div className={`${styles.bellIcon} mx-1 d-flex align-items-center justify-content-center`}>
                                <i className="bi bi-bell"></i>
                            </div>
                            <div className={`${styles.globeIcon} mx-3 d-flex align-items-center justify-content-center`}>
                                <i className="bi bi-globe"></i>
                                <select className={styles.lang}>
                                    <option value="en">Eng</option>
                                </select>
                            </div>
                            <div className={`${styles.logOut} d-flex mx-3 align-items-center justify-content-center`}>
                                <p className='my-2'>Log Out</p>
                                <i className="bi bi-box-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={styles.py13}>
                <div className={`${styles.navb} d-flex flex-wrap justify-content-evenly align-content-between`}>
                    <div className={`${styles.dashboard} gap-2`}>
                        <div className={styles.iconList}>
                            <i className="bi bi-list"></i>
                        </div>
                        <p>Dashboard</p>
                    </div>
                    <div className={`${styles.reportBrowser} gap-2`}>
                        <div className={styles.iconChart}>
                            <i className="bi bi-bar-chart"></i>
                        </div>
                        <p>Report Browser</p>
                    </div>
                    <div className={`${styles.actionTrack} gap-2`}>
                        <div className={styles.iconAction}>
                            <i className="bi bi-box-arrow-in-down-right"></i>
                        </div>
                        <p>Action Track</p>
                    </div>
                    <div className={`${styles.upAudits} gap-2`}>
                        <div className={styles.iconClock}>
                            <i className="bi bi-clock"></i>
                        </div>
                        <p>Upcoming audits</p>
                    </div>
                    <div className={`${styles.storeBrowser} gap-2`}>
                        <div className={styles.iconStore}>
                            <i className="bi bi-shop"></i>
                        </div>
                        <p>Store Browser</p>
                    </div>
                    <div className={`${styles.storePer} gap-2`}>
                        <div className={styles.iconPer}>
                            <i className="bi bi-archive-fill"></i>
                        </div>
                        <p>Store Performance</p>
                    </div>
                    <div className={`${styles.AI} d-flex gap-2`}>
                        <div className={styles.divAI}>
                            <i className="bi bi-stars"></i>
                        </div>
                        <p>AI Insights</p>
                    </div>
                </div>
            </div>


            <div className={styles.heroDashboard + ' p-3'}>
                <p className={styles.dashHeading}>Dashboard</p>

                <div className={styles.dashFirst + ' row d-flex'}>
                    <div className={styles.firstLeft + ' col-md-6'}>
                        <div className={styles.firstHeading + ' text-start'}>
                            <p>Latest Audit Cycle Score</p>
                        </div>

                        <div className={styles.l1First + ' my-1'}>
                            <div className={'row1 row'}>
                                <div className={styles.l1 + ' col-sm-6 d-flex justify-content-center align-items-center'}>
                                    <DashedProgressBar color={"#8DC63F"} progress={95} />
                                </div>
                                <div className={styles.l1 + ' col-sm-6 d-flex justify-content-center align-items-center'}>
                                    <DashedProgressBar color={"#C9727B"} progress={10} />
                                </div>
                            </div>

                            <div className={'row2 row'}>
                                <div className={styles.l1 + ' col-sm-6 d-flex justify-content-center align-items-center'}>
                                    <DashedProgressBar color={"#C6B83F"} progress={70} />
                                </div>
                                <div className={styles.l1 + ' col-sm-6 d-flex justify-content-center align-items-center'}>
                                    <DashedProgressBar color={"#B4DA1F"} progress={85} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.firstRight + ' col-md-6'}>
                        <div className={styles.firstHeading + ' text-start'}>
                            <p>Upcoming Audits</p>
                        </div>
                        <div className={styles.divCalender + ' my-2'}>
                            <AuditCalendar />
                        </div>
                    </div>
                </div>

                <div className={styles.dashSecond + ' my-2'}>
                    <div className={styles.dashSecHead + ' flex-wrap d-flex'}>
                        <div className={styles.auditCycle + ' d-flex flex-column'}>
                            <p className="text-start">Audit Cycle</p>
                            <select>
                                <option>Nps - June - 2024</option>
                            </select>
                        </div>
                        <div className={styles.auditCycleRight + ' mt-4 ms-auto gap-4 d-flex justify-content-center align-items-center'}>
                            <div className={styles.addSection + ' d-flex gap-2 justify-content-center align-items-center'}>
                                <p>Add Section</p>
                                <i className="bi bi-plus-square"></i>
                            </div>

                            <div className={styles.downIcon}>
                                <i className="bi bi-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className={styles.dashSecHero + ' p-3 justify-content-center align-items-center row d-flex'}>
                        <div className={styles.secHeroLeft + ' col-sm-9'}>
                            <BarChart />
                        </div>

                        <div className={styles.secHeroSection + ' shadow-lg col-sm-3'}>
                            <div className={styles.secHead}>
                                <p>Section</p>
                            </div>
                            <div className={styles.section1}>
                                <p className={styles.perPara}>60%</p>
                                <p className={styles.secPara}>Customer Arrival and Staff Grooming Analysis</p>
                            </div>
                            <div className={styles.section1}>
                                <p className={styles.perPara}>60%</p>
                                <p className={styles.secPara}>Store Exterior</p>
                            </div>
                            <div className={styles.section1}>
                                <p className={styles.perPara}>60%</p>
                                <p className={styles.secPara}>Store Exterior</p>
                            </div>
                            <div className={styles.section1}>
                                <p className={styles.perPara}>60%</p>
                                <p className={styles.secPara}>Store Exterior</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.dashThird}>
                    <div className={`${styles.dashThirdHead} flex-wrap d-flex`}>
                        <div className={`${styles.improvement} d-flex flex-column`}>
                            <p className='text-start'>Improvement areas based on observation</p>
                            <select>
                                <option>Nps-June-2024</option>
                            </select>
                        </div>
                        <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
                            <div className={styles.downIcon}>
                                <i className="bi bi-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.dashThirdHero} my-4 bg-light`}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "4vw" }}>S no.</th>
                                    <th>Section</th>
                                    <th>Questions</th>
                                    <th>Obtained Marks/Total Marks</th>
                                    <th>Marks Lost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Customer Arrival and Staff Grooming Analysis</td>
                                    <td>Was the in-store branding like wall branding, pillar branding, drop down headers, glass branding, category drop downs, etc. maintained well? 1/ 5 4</td>
                                    <td>1/5</td>
                                    <td>
                                        <div className={styles.tScore}>4</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Customer Arrival and Staff Grooming Analysis</td>
                                    <td>Was the in-store branding like wall branding, pillar branding, drop down headers, glass branding, category drop downs, etc. maintained well? 1/ 5 4</td>
                                    <td>1/5</td>
                                    <td>
                                        <div className={styles.tScore}>4</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.dashForth}>
                    <div className={`${styles.dashThirdHead} flex-wrap d-flex`}>
                        <div className={`${styles.improvement} d-flex flex-column`}>
                            <p className='text-start'>Improvement areas based on observation</p>
                            <select>
                                <option>Nps-June-2024</option>
                            </select>
                        </div>
                        <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
                            <div className={`${styles.downIcon} d-none`}>
                                <i className="bi bi-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.forthCharts} mt-4 row d-flex`}>
                        <div className={`${styles.dashForthLeft} col-md-6`}>
                            <div className={`${styles.overallPara} p-2 d-flex`}>
                                <p>Overall Performance <span>(Store Wise)</span></p>
                                <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
                                    <div className={`${styles.downIcon}`} style={{ height: "2.5rem", width: "2.5rem" }}>
                                        <i className="bi bi-download"></i>
                                    </div>
                                </div>
                            </div>
                            <StoreWiseBarChart />
                        </div>

                        <div className={`${styles.dashForthLeft} col-md-6`}>
                            <div className={`${styles.overallPara} p-2 d-flex`}>
                                <p>Overall Performance <span>(City Wise)</span></p>
                                <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
                                    <div className={`${styles.downIcon}`} style={{ height: "2.5rem", width: "2.5rem" }}>
                                        <i className="bi bi-download"></i>
                                    </div>
                                </div>
                            </div>
                            <OverallPerformance />
                        </div>
                    </div>
                </div>

                <div className={styles.dashFifth}>
                    <div className={`${styles.dashThirdHead} flex-wrap d-flex`}>
                        <div className={`${styles.improvement} d-flex flex-column`}>
                            <p className='text-start'>Question Summary</p>
                            <select>
                                <option>Nps-June-2024</option>
                            </select>
                        </div>
                        <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
                            <div className={`${styles.downIcon}`}>
                                <i className="bi bi-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className={styles.fifthHero}>
                        <div className={styles.customerArr}>
                            <p>Customer Arrival and Staff Grooming Analysis</p>
                        </div>
                        <div className={styles.fifthTable}>
                            <table style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>S no.</th>
                                        <th>Questions</th>
                                        <th>Marks Lost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Was the store ambience visible from outside and feel inviting?</td>
                                        <td className={styles.marksLost}>
                                            <div className={`${styles.tdFirst} d-flex align-items-center justify-content-between`}>
                                                <div className={styles.tTf}>Yes</div>
                                                <div className={`${styles.tPer} d-flex align-items-center justify-content-center`}>80%</div>
                                            </div>
                                            <div className={`${styles.tdFirst} d-flex align-items-center justify-content-between`}>
                                                <div className={styles.tTf}>No</div>
                                                <div className={`${styles.tPer} d-flex align-items-center justify-content-center`}>80%</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard
