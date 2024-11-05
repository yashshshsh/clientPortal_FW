import React from 'react'
import '../CSS/AuditReport.css'
import CircularBar from './ChartsBars/CircularBar';
import ARDashedBar from './ChartsBars/ARDashedBar';
import attachImg from '../Images/Attachments.png'

const AuditReport = () => {
    return (
        <div className='px-4 my-4'>
            <div className="audit-first">
                <div className="rbar text-start d-flex">
                    <p className='my-2'>Report Browser<span>/Audit Report</span></p>
                </div>
            </div>

            <div className="audit-heading d-flex align-items-center justify-content-between">
                <div className="audit-text d-flex align-items-center">
                    <p className='mt-4'>Audit Report</p>
                </div>
                <div className="audit-right d-flex gap-3">
                    <div className="action d-flex gap-1">
                        <p className='mt-3'>Create Action</p>
                        <i className="bi bi-box-arrow-in-down-right"></i>
                    </div>
                    <div className="export d-flex gap-1">
                        <p className='mt-3'>Export To</p>
                        <i class="bi bi-caret-down-fill"></i>
                    </div>
                </div>
            </div>

            <div className="hero-audit">
                <div className="audit-details d-flex">
                    <p className='ms-2'>Audit Details</p>
                </div>

                <div className="hero-first row d-flex justify-content-between">
                    <div className="hero-left col-md-9">
                        <div className="overall d-flex align-items-center gap-2 mt-2">
                            <p className='mt-2'>Overall Score</p>
                            <div className="score-per df mb-2">
                                <p className='my-2'>80%</p>
                            </div>
                        </div>


                        <div className="left-details d-flex">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='leftText'><strong>Client</strong></td>
                                        <td className='rightText'>FloorWalk - Retail Consumer Experience Client Demo</td>
                                    </tr>
                                    <tr>
                                        <td className='leftText'><strong>Store code</strong></td>
                                        <td className='rightText'>ST004</td>
                                    </tr>
                                    <tr>
                                        <td className='leftText'><strong>Store</strong></td>
                                        <td className='rightText'>Showroom 4</td>
                                    </tr>
                                    <tr>
                                        <td className='leftText'><strong>Assigned Date</strong></td>
                                        <td className='rightText'>09 August 2024 10:29 PM/ in Progress</td>
                                    </tr>
                                    <tr>
                                        <td className='leftText'><strong>Store Address</strong></td>
                                        <td className='rightText'>Near Shopping Centre, Ahmedabad</td>
                                    </tr>
                                    <tr>
                                        <td className='leftText'><strong>Audit Date</strong></td>
                                        <td className='rightText'>21st Jun 2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="view-Ai my-3 d-flex gap-1 justify-content-center align-items-center">
                            <div className="iconStar my-2">
                                <i className="bi bi-stars"></i>
                            </div>
                            <p className='my-2'>View AI Insights</p>
                        </div>

                        <div className="audit-details my-3 d-flex">
                            <p className='ms-2'>Report Actions</p>
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

                <div style={{ height: 'auto' }} className="hero-sec my-3 table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th style={{ width: "4vw" }}>S no.</th>
                                <th>Report ID</th>
                                <th>Person Responsible</th>
                                <th>Target Date</th>
                                <th>Created By</th>
                                <th>Action Plan</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>40368</td>
                                <td>clientdem04@floorwalk.in</td>
                                <td>09 August 2024</td>
                                <td>Admin</td>
                                <td>The reception branding needs to be fixed.</td>
                                <td style={{ height: "4rem", borderTop: "none", borderLeft: "none" }} className='d-flex justify-content-center align-items-center'>
                                    <div className="pending d-flex align-items-center justify-content center">
                                        <i style={{ fontSize: "2.2rem", margin: "0", color: "#D98634" }} class="bi bi-dot"></i>
                                        <p className='my-2'>Action Pending</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="hero-third my-3">
                    <div className="audit-details d-flex">
                        <p className='ms-2'>Report Actions</p>
                    </div>

                    <div className="dashed-bars my-3 row d-flex">
                        <div className="d-flex col-sm-6 justify-content-center align-items-center">
                            <ARDashedBar color={"#8DC63F"} text={'survey'} progress={95} />
                        </div>
                        <div className="d-flex col-sm-6 justify-content-center align-items-center">
                            <ARDashedBar color={"#C9727B"} progress={10} />
                        </div>
                    </div>
                </div>

                <div className="hero-forth my-3">
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <div style={{ backgroundColor: "transparent" }} className="audit-details d-flex">
                                        <p className='ms-2'>Report Summary</p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div class="accordion-body1 summary text-start d-flex align-items-center">
                                    <p>The rickshaw driver was not satisfied with the quality of the auto Rickshaw. He was facing some mechanical issues with it. The seats were not so comfortable.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-fifth my-3">
                    <div className="accordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <div style={{ backgroundColor: "transparent" }} className="audit-details d-flex">
                                        <p className='ms-2'>Attachments</p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body2">
                                    <div className="attachImg d-flex">
                                        <img src={attachImg} alt="img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="questionnaire my-3">
                    <div className="head-que text-start">
                        <p className='pt-2'>Questionnaire</p>
                    </div>

                    <div className="accordion my-3">
                        <div class="accordion-item mt-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="#collapseThree">
                                    <div style={{ backgroundColor: "transparent" }} className="audit-details d-flex ">
                                        <p className='ms-2'>Survey Details</p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div className="marks d-flex gap-2">
                                        <div className="total d-flex align-items-center gap-2">
                                            <p className='m-2'>Total Marks</p>
                                            <div className="num df">
                                                <p className='my-2'>3</p>
                                            </div>
                                        </div>
                                        <div className="obtained d-flex align-items-center gap-2">
                                            <p className='m-2'>Obtained Marks</p>
                                            <div className="obt df">
                                                <p className='my-2'>3</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="question p-4 text-start">
                                        <div className="que">
                                            <p className='q'>Question 1</p>
                                            <p className='a'>How would you rate your overall experience with our dealership?</p>
                                        </div>

                                        <div className="ans">
                                            <p className='q'>Answer</p>
                                            <p className='a'>How would you rate your overall experience with our dealership?</p>
                                        </div>

                                        <div className="que-footer justify-content-between d-flex">
                                            <div className="f-marks gap-4 d-flex align-items-center">
                                                <p className='p-marks mt-3'>Marks</p>
                                                <div className="marks-num d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>15</p>
                                                </div>
                                            </div>
                                            <div className="max-marks gap-4 d-flex align-items-center">
                                                <p className='p-max-marks mt-3'>Maximum marks</p>
                                                <div className="max-div d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>30</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="question p-4 text-start">
                                        <div className="que">
                                            <p className='q'>Question 2</p>
                                            <p className='a'>How would you rate your overall experience with our dealership?</p>
                                        </div>

                                        <div className="ans">
                                            <p className='a'>Rating</p>
                                            <div className="rating flex-column d-flex justify-content-center align-items-center">
                                                <div className="icon-div-star d-flex gap-2">
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                </div>
                                                <div className="comment gap-5 d-flex align-items-center">
                                                    <p>Least Likely</p>
                                                    <p>Neutral</p>
                                                    <p>Most Likely</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="que-footer justify-content-between d-flex">
                                            <div className="f-marks gap-4 d-flex align-items-center">
                                                <p className='p-marks mt-3'>Marks</p>
                                                <div className="marks-num d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>00</p>
                                                </div>
                                            </div>
                                            <div className="max-marks gap-4 d-flex align-items-center">
                                                <p className='p-max-marks mt-3'>Maximum marks</p>
                                                <div className="max-div d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>30</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="question p-4 text-start">
                                        <div className="que">
                                            <p className='q'>Question 3</p>
                                            <p className='a'>How would you rate your overall experience with our dealership?</p>
                                        </div>

                                        <div className="ans">
                                            <p className='a'>Options</p>
                                        </div>

                                        <div className="options d-flex flex-column">
                                            <div className="options-upper row d-flex">
                                                <div className="option1 d-flex align-items-center justify-content-center col-md-6">
                                                    <div className="inner-op-div d-flex align-items-center">
                                                        <p className='alpha pt-1 m-3'>A</p>
                                                        <p className='op-text mt-3'>Option 1</p>
                                                    </div>
                                                </div>
                                                <div className="option2 d-flex align-items-center justify-content-center col-md-6">
                                                    <div className="inner-op-div selected d-flex align-items-center">
                                                        <p className='alpha pt-1 m-3'>B</p>
                                                        <p className='op-text mt-3'>Selected Option</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="options-lower mt-3 row d-flex">
                                                <div className="option3 d-flex align-items-center justify-content-center col-md-6">
                                                    <div className="inner-op-div d-flex align-items-center">
                                                        <p className='alpha pt-1 m-3'>C</p>
                                                        <p className='op-text mt-3'>Option 3</p>
                                                    </div>
                                                </div>
                                                <div className="option4 d-flex align-items-center justify-content-center col-md-6">
                                                    <div className="inner-op-div d-flex align-items-center">
                                                        <p className='alpha pt-1 m-3'>D</p>
                                                        <p className='op-text mt-3'>Option 4</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="que-footer mt-3 justify-content-between d-flex">
                                            <div className="f-marks gap-4 d-flex align-items-center">
                                                <p className='p-marks mt-3'>Marks</p>
                                                <div className="marks-num d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>10</p>
                                                </div>
                                            </div>
                                            <div className="max-marks gap-4 d-flex align-items-center">
                                                <p className='p-max-marks mt-3'>Maximum marks</p>
                                                <div className="max-div d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>30</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="accordion my-3">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="#collapseFour">
                                    <div style={{ backgroundColor: "transparent" }} className="audit-details d-flex">
                                        <p className='ms-2'>NPS Survey</p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div className="marks d-flex gap-2">
                                        <div className="total d-flex align-items-center gap-2">
                                            <p className='m-2'>Total Marks</p>
                                            <div className="num df">
                                                <p className='my-2'>3</p>
                                            </div>
                                        </div>
                                        <div className="obtained d-flex align-items-center gap-2">
                                            <p className='m-2'>Obtained Marks</p>
                                            <div className="obt df">
                                                <p className='my-2'>3</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="question p-4 text-start">
                                        <div className="que">
                                            <p className='q'>Question 1</p>
                                            <p className='a'>How would you rate your overall experience with our dealership?</p>
                                        </div>

                                        <div className="ans">
                                            <p className='q'>Answer</p>
                                            <p className='a'>How would you rate your overall experience with our dealership?</p>
                                        </div>

                                        <div className="que-footer justify-content-between d-flex">
                                            <div className="f-marks gap-4 d-flex align-items-center">
                                                <p className='p-marks mt-3'>Marks</p>
                                                <div className="marks-num d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>15</p>
                                                </div>
                                            </div>
                                            <div className="max-marks gap-4 d-flex align-items-center">
                                                <p className='p-max-marks mt-3'>Maximum marks</p>
                                                <div className="max-div d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>30</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="question p-4 text-start">
                                        <div className="que">
                                            <p className='q'>Question 2</p>
                                            <p className='a'>How would you rate your overall experience with our dealership?</p>
                                        </div>

                                        <div className="ans">
                                            <p className='q'>Answer</p>
                                            <div className="rating-div">

                                                <div className="rating flex-column d-flex justify-content-center align-items-center">
                                                    <div className="icon-div d-flex gap-2">
                                                        <div className="c1-selected d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>1</p>
                                                        </div>
                                                        <div className="c1-selected d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>2</p>
                                                        </div>
                                                        <div className="c1-selected d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>3</p>
                                                        </div>
                                                        <div className="c1-selected d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>4</p>
                                                        </div>
                                                        <div className="c1-selected d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>5</p>
                                                        </div>
                                                        <div className="c1-selected d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>6</p>
                                                        </div>
                                                        <div className="c1 d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>7</p>
                                                        </div>
                                                        <div className="c1 d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>8</p>
                                                        </div>
                                                        <div className="c1 d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>9</p>
                                                        </div>
                                                        <div className="c1 d-flex justify-content-center align-items-center">
                                                            <p className='mt-3'>10</p>
                                                        </div>
                                                    </div>
                                                    <div className="rate-comment d-flex justify-content-between align-items-center">
                                                        <p>Least Likely</p>
                                                        <p>Neutral</p>
                                                        <p>Most Likely</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="que-footer justify-content-between d-flex">
                                            <div className="f-marks gap-4 d-flex align-items-center">
                                                <p className='p-marks mt-3'>Marks</p>
                                                <div className="marks-num d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>15</p>
                                                </div>
                                            </div>
                                            <div className="max-marks gap-4 d-flex align-items-center">
                                                <p className='p-max-marks mt-3'>Maximum marks</p>
                                                <div className="max-div d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>30</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="question p-4 text-start">
                                        <div className="que">
                                            <p className='q'>Question 3</p>
                                            <p className='a'>How would you rate your overall experience with our dealership?</p>
                                        </div>

                                        <div className="ans">
                                            <p className='a'>Rating</p>
                                            <div className="rating flex-column d-flex justify-content-center align-items-center">
                                                <div className="icon-div d-flex gap-2">
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                </div>
                                                <div className="comment gap-5 d-flex align-items-center">
                                                    <p>Skip</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="que-footer justify-content-between d-flex">
                                            <div className="f-marks gap-4 d-flex align-items-center">
                                                <p className='p-marks mt-3'>Marks</p>
                                                <div className="marks-num d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>00</p>
                                                </div>
                                            </div>
                                            <div className="max-marks gap-4 d-flex align-items-center">
                                                <p className='p-max-marks mt-3'>Maximum marks</p>
                                                <div className="max-div d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>30</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="question p-4 text-start">
                                        <div className="que">
                                            <p className='q'>Question 3</p>
                                            <p className='a'>How would you rate your overall experience with our dealership?</p>
                                        </div>

                                        <div className="ans">
                                            <p className='a'>Options</p>
                                        </div>

                                        <div className="options d-flex flex-column">
                                            <div className="options-upper row d-flex">
                                                <div className="option1 d-flex align-items-center justify-content-center col-md-6">
                                                    <div className="inner-op-div d-flex align-items-center">
                                                        <p className='alpha pt-1 m-3'>A</p>
                                                        <p className='op-text mt-3'>Option 1</p>
                                                    </div>
                                                </div>
                                                <div className="option2 d-flex align-items-center justify-content-center col-md-6">
                                                    <div className="inner-op-div selected d-flex align-items-center">
                                                        <p className='alpha pt-1 m-3'>B</p>
                                                        <p className='op-text mt-3'>Selected Option</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="options-lower mt-3 row d-flex">
                                                <div className="option3 d-flex align-items-center justify-content-center col-md-6">
                                                    <div className="inner-op-div d-flex align-items-center">
                                                        <p className='alpha pt-1 m-3'>C</p>
                                                        <p className='op-text mt-3'>Option 3</p>
                                                    </div>
                                                </div>
                                                <div className="option4 d-flex align-items-center justify-content-center col-md-6">
                                                    <div className="inner-op-div d-flex align-items-center">
                                                        <p className='alpha pt-1 m-3'>D</p>
                                                        <p className='op-text mt-3'>Option 4</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="que-footer mt-3 justify-content-between d-flex">
                                            <div className="f-marks gap-4 d-flex align-items-center">
                                                <p className='p-marks mt-3'>Marks</p>
                                                <div className="marks-num d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>10</p>
                                                </div>
                                            </div>
                                            <div className="max-marks gap-4 d-flex align-items-center">
                                                <p className='p-max-marks mt-3'>Maximum marks</p>
                                                <div className="max-div d-flex justify-content-center align-items-center">
                                                    <p className='mt-3'>30</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuditReport
