import React, { useState } from 'react'
import CircularBar from './ChartsBars/CircularBar.js'
import '../CSS/StoreBrowser.css'
import Trends from './Trends.js'
import Report from './Report.js';
import Proof from './Proof.js';

const StoreBrowserIn = () => {
    const [state, setState] = useState("trends");
    return (
        <div style={{backgroundColor : "#FAFAFA"}}>
            <div className="audit-first px-4 mt-4">
                <div className="rbar text-start d-flex">
                    <p className='my-2'>Store Browser<span>/Insights</span></p>
                </div>
            </div>

            <div className="hero-first row px-4 my-2 d-flex justify-content-between">
                <div className="hero-left col-md-9">
                    <div className="overall d-flex align-items-center gap-2">
                        <p className='my-3'>Overall Score</p>
                        <div className="score-per">
                            <p className='ms-1'>80%</p>
                        </div>
                    </div>
                    <div className="audit-details d-flex">
                        <p className='ms-2'>Store Details</p>
                    </div>

                    <div className="store-table d-flex my-4 gap-5">
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

                <div className="hero-right col-md-3 meter d-flex flex-column align-items-center justify-content-center">
                    <p className='overallPara'>Overall Store Score</p>
                    <CircularBar />
                    <div className="store-score d-flex justify-content-center align-items-center flex-column">
                        <p className='scorePara'>Your Store Score Is Poor</p>
                        <div className="stats">
                            <p className='m-0'>What these stats mean?</p>
                        </div>
                        <div className="grades-div d-flex flex-wrap gap-2   ">
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

            <div className="trp">
                {state === "trends"?(<Trends/>) : 
                state === "reports"?(<Report/>) : (<Proof/>)}
            </div>
        </div>
    )
}

export default StoreBrowserIn
