import React from 'react'
import styles from '../CSS/Dashboard.module.css'
import DashedProgressBar from '../Components/ChartsBars/DashedBarProgress'
import AuditCalendar from '../Components/AuditCalender'
import BarChart from './ChartsBars/BarChart'
import StoreWiseBarChart from './ChartsBars/StoreWiseBarChart'
import OverallPerformance from './ChartsBars/OverallPerformance'
import downImg from '../Images/vertical_align_bottom.png'

const Dashboard = () => {
    return (
        <div>
            <div style={{backgroundColor:"#FAFAFA"}} className={styles.heroDashboard + ' my-3'}>
                <p className={styles.dashHeading + ' px-4 m-0'}>Dashboard</p>

                <div style={{backgroundColor:"white"}} className={styles.dashFirst + ' px-4 row d-flex'}>
                    <div className={styles.firstLeft + ' col-md-6'}>
                        <div className={styles.firstHeading + ' my-2 text-start'}>
                            <p>Latest Audit Cycle Score</p>
                        </div>

                        <div className={styles.l1First + ''}>
                            <div className={'row1 row'}>
                                <div className={styles.l1 + ' col-sm-6 d-flex justify-content-center align-items-center'}>
                                    <DashedProgressBar color={"#8DC63F"} progress={95} shadow={true}/>
                                </div>
                                <div className={styles.l1 + ' col-sm-6 d-flex justify-content-center align-items-center'}>
                                    <DashedProgressBar color={"#C9727B"} progress={10} shadow={true}/>
                                </div>
                            </div>

                            <div className={'row2 row'}>
                                <div className={styles.l1 + ' col-sm-6 d-flex justify-content-center align-items-center'}>
                                    <DashedProgressBar color={"#C6B83F"} progress={70} shadow={true}/>
                                </div>
                                <div className={styles.l1 + ' col-sm-6 d-flex justify-content-center align-items-center'}>
                                    <DashedProgressBar color={"#B4DA1F"} progress={85} shadow={true}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.firstRight + ' col-md-6'}>
                        <div className={styles.firstHeading + ' mb-2 text-start'}>
                            <p>Upcoming Audits</p>
                        </div>
                        <div className={styles.divCalender + ' '}>
                            <AuditCalendar />
                        </div>
                    </div>
                </div>

                <div style={{backgroundColor:"#FFFFFF",borderRadius:"20px"}} className={styles.dashSecond + ' px-4 pt-4 mt-4'}>
                    <div className={styles.dashSecHead + ' flex-wrap d-flex'}>
                        <div className={styles.auditCycle + ' d-flex flex-column'}>
                            <p className="text-start">Audit Cycle</p>
                            <select>
                                <option>Nps - June - 2024</option>
                            </select>
                        </div>
                        <div className={styles.auditCycleRight + ' my-2 ms-auto gap-4 d-flex align-items-center'}>
                            <div className={styles.addSection + ' d-flex gap-2 justify-content-center align-items-center'}>
                                <p>Add Section</p>
                                <i className="bi bi-plus-square"></i>
                            </div>

                            <div className={styles.downIcon}>
                                <img src={downImg} alt="img"/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.dashSecHero + '  justify-content-center align-items-center row d-flex'}>
                        <div className={styles.secHeroLeft + ' col-sm-9'}>
                            <BarChart />
                        </div>

                        <div className={styles.secHeroSection + ' col-sm-3'}>
                            <div className={styles.secHead}>
                                <p>Section</p>
                            </div>
                            <div className={styles.section1}>
                                <p style={{color:"#003C5D"}} className={styles.perPara}>60%</p>
                                <p style={{color:"#003C5D"}} className={styles.secPara}>Customer Arrival and Staff Grooming Analysis</p>
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

                <div style={{backgroundColor:"white"}} className={styles.dashThird + ' mt-3 px-4 pt-4'}>
                    <div className={`${styles.dashThirdHead} flex-wrap d-flex`}>
                        <div className={`${styles.improvement} d-flex flex-column`}>
                            <p className='text-start'>Improvement areas based on observation</p>
                            <select>
                                <option>Nps-June-2024</option>
                            </select>
                        </div>
                        <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
                            <div className={styles.downIcon}>
                                <img src={downImg} alt="img"/>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.dashThirdHero + ' my-3'}`}>
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

                <div style={{backgroundColor:"white"}} className={styles.dashForth + ' px-4 py-3 mt-3'}>
                    <div className={`${styles.dashThirdHead} my-3 flex-wrap d-flex`}>
                        <div className={`${styles.improvement} d-flex flex-column`}>
                            <p className='text-start'>Improvement areas based on observation</p>
                            <select>
                                <option>Nps-June-2024</option>
                            </select>
                        </div>
                        <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
                            <div className={`${styles.downIcon} d-none`}>
                                <img src={downImg} alt="img"/>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.forthCharts}  row d-flex`}>
                        <div className={`${styles.dashForthLeft} col-md-6`}>
                            <StoreWiseBarChart />
                        </div>

                        <div className={`${styles.dashForthLeft} col-md-6`}>
                            <OverallPerformance />
                        </div>
                    </div>
                </div>

                <div style={{backgroundColor:"white"}} className={styles.dashFifth}>
                    <div className={`${styles.dashThirdHead} mt-3 px-4 pt-4 flex-wrap d-flex`}>
                        <div className={`${styles.improvement} d-flex flex-column`}>
                            <p className='text-start'>Question Summary</p>
                            <select>
                                <option>Nps-June-2024</option>
                            </select>
                        </div>
                        <div className={`${styles.improvementRight} ms-auto d-flex justify-content-center align-items-center`}>
                            <div className={`${styles.downIcon}`}>
                                <img src={downImg} alt="img"/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.fifthHero + ' px-4 mt-3'}>
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
