import React from 'react'
import '../CSS/AI.css'
import logo from '../Images/Floorwalk logo7x.png';

const AI = () => {
    return (
        <div>
            <div className="hero-ai px-5">
                <div className="ai-head my-4 text-start">
                    <p>AI Insights </p>
                </div>

                <div className="auditCycle d-flex flex-column">
                    <select>
                        <option>Nps - June - 2024</option>
                    </select>
                </div>

                <div className="responses my-3 gap-4 d-flex row">
                    <div style={{ backgroundColor: "#007DC18C" }} className="total col-md-3">
                        <div className="total-upper p-1 gap-2 text-start d-flex">
                            <div className="sq-slash df">
                                <i class="bi bi-slash-square"></i>
                            </div>
                            <p className='m-0'>Total Responses</p>
                        </div>
                        <div className="total-lower mt-1 text-start d-flex align-items-center gap-2">
                            <span>160</span>
                            <div className="last-month df">
                                <p className='my-2'>+ 12% from last month</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: "#8DC63F8C" }} className="positive col-md-3">
                        <div className="total-upper p-1 gap-2 text-start d-flex">
                            <div style={{ backgroundColor: "#8DC63F" }} className="sq-slash df">
                                <i class="bi bi-slash-square"></i>
                            </div>
                            <p className='m-0'>Total Positive Responses</p>
                        </div>
                        <div className="total-lower mt-1 text-start d-flex align-items-center gap-2">
                            <span>160</span>
                            <div className="last-month df">
                                <p className='my-2'>+ 12% from last month</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: "#EAB3088C" }} className="neutral col-md-3">
                        <div className="total-upper p-1 gap-2 text-start d-flex">
                            <div style={{ backgroundColor: "#EDA145" }} className="sq-slash df">
                                <i class="bi bi-slash-square"></i>
                            </div>
                            <p className='m-0'>Total Neutral Responses</p>
                        </div>
                        <div className="total-lower mt-1 text-start d-flex align-items-center gap-2">
                            <span>160</span>
                            <div className="last-month df">
                                <p className='my-2'>+ 12% from last month</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: "#F871718C" }} className="negative col-md-3">
                        <div className="total-upper p-1 gap-2 text-start d-flex">
                            <div style={{ backgroundColor: "#FF7784" }} className="sq-slash df">
                                <i class="bi bi-slash-square"></i>
                            </div>
                            <p className='m-0'>Total Negative Responses</p>
                        </div>
                        <div className="total-lower mt-1 text-start d-flex align-items-center gap-2">
                            <span>160</span>
                            <div className="last-month df">
                                <p style={{ color: "#FF3347" }} className='my-2'>+ 12% from last month</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="bubbleChart bg-warning my-4 text-start">
                    <p style={{fontSize : "16px"}}>Report Analysis</p>
                </div> */}

                <div className="total-pos-res">
                    <div style={{ backgroundColor: "#8DC63F8C" }} className="pos-res-head px-4 gap-2 text-start d-flex align-items-center">
                        <div style={{ backgroundColor: "#8DC63F" }} className="sq-slash df">
                            <i class="bi bi-slash-square"></i>
                        </div>
                        <p className='m-0'>Total Positive Responses</p>
                    </div>

                    <div style={{ backgroundColor: "#FAFAFA" }} className="pos-res-nps p-4">
                        <div style={{ backgroundColor: "white" }} className='p-3 d-flex justify-content-between'>
                            <div className="nps-left gap-5">
                                <p className='text-start nps-head-p'>NPS - JUNE - 2024</p>
                                <div className="table-left">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='leftText'><strong>Store Code</strong></td>
                                                <td className='rightText'>ST004</td>
                                            </tr>
                                            <tr>
                                                <td className='leftText'><strong>ST004</strong></td>
                                                <td className='rightText'>Showroom 4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="nps-right gap-2 df">
                                <div style={{ width: "11rem" }} className="view-Ai d-flex gap-1 justify-content-center align-items-center">
                                    <div className="iconStar my-2">
                                        <i className="bi bi-stars"></i>
                                    </div>
                                    <p className='my-2'>View AI Insights</p>
                                </div>
                                <div className="view-report df">
                                    <p className='my-3'>View Report</p>
                                </div>
                            </div>
                        </div>

                        <div className="hero-forth mt-3">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            <div className="audit-details d-flex" style={{ backgroundColor: "transparent" }}>
                                                <p className="ms-2">Report Summary</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body1 summary text-start d-flex align-items-center">
                                            <p>
                                                The rickshaw driver was not satisfied with the quality of the auto
                                                Rickshaw. He was facing some mechanical issues with it. The seats were
                                                not so comfortable.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: "#FAFAFA" }} className="pos-res-nps p-4">
                        <div style={{ backgroundColor: "white" }} className='p-3 d-flex justify-content-between'>
                            <div className="nps-left gap-5">
                                <p className='text-start nps-head-p'>NPS - JUNE - 2024</p>
                                <div className="table-left">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='leftText'><strong>Store Code</strong></td>
                                                <td className='rightText'>ST004</td>
                                            </tr>
                                            <tr>
                                                <td className='leftText'><strong>ST004</strong></td>
                                                <td className='rightText'>Showroom 4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="nps-right gap-2 df">
                                <div style={{ width: "11rem" }} className="view-Ai d-flex gap-1 justify-content-center align-items-center">
                                    <div className="iconStar my-2">
                                        <i className="bi bi-stars"></i>
                                    </div>
                                    <p className='my-2'>View AI Insights</p>
                                </div>
                                <div className="view-report df">
                                    <p className='my-3'>View Report</p>
                                </div>
                            </div>
                        </div>

                        <div className="hero-forth mt-3">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="true"
                                            aria-controls="collapseTwo"
                                        >
                                            <div className="audit-details d-flex" style={{ backgroundColor: "transparent" }}>
                                                <p className="ms-2">Report Summary</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body1 summary text-start d-flex align-items-center">
                                            <p>
                                                The rickshaw driver was not satisfied with the quality of the auto
                                                Rickshaw. He was facing some mechanical issues with it. The seats were
                                                not so comfortable.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>

                <div className="total-neu-res">
                    <div style={{ backgroundColor: "#EAB3088C" }} className="pos-res-head px-4 gap-2 text-start d-flex align-items-center">
                        <div style={{ backgroundColor: "#EDA145" }} className="sq-slash df">
                            <i class="bi bi-slash-square"></i>
                        </div>
                        <p className='m-0'>Total Neutral Responses</p>
                    </div>

                    <div style={{ backgroundColor: "#FAFAFA" }} className="pos-res-nps p-4">
                        <div style={{ backgroundColor: "white" }} className='p-3 d-flex justify-content-between'>
                            <div className="nps-left gap-5">
                                <p className='text-start nps-head-p'>NPS - JUNE - 2024</p>
                                <div className="table-left">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='leftText'><strong>Store Code</strong></td>
                                                <td className='rightText'>ST004</td>
                                            </tr>
                                            <tr>
                                                <td className='leftText'><strong>ST004</strong></td>
                                                <td className='rightText'>Showroom 4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="nps-right gap-2 df">
                                <div style={{ width: "11rem" }} className="view-Ai d-flex gap-1 justify-content-center align-items-center">
                                    <div className="iconStar my-2">
                                        <i className="bi bi-stars"></i>
                                    </div>
                                    <p className='my-2'>View AI Insights</p>
                                </div>
                                <div className="view-report df">
                                    <p className='my-3'>View Report</p>
                                </div>
                            </div>
                        </div>

                        <div className="hero-forth mt-3">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="true"
                                            aria-controls="collapseThree"
                                        >
                                            <div className="audit-details d-flex" style={{ backgroundColor: "transparent" }}>
                                                <p className="ms-2">Report Summary</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body1 summary text-start d-flex align-items-center">
                                            <p>
                                                The rickshaw driver was not satisfied with the quality of the auto
                                                Rickshaw. He was facing some mechanical issues with it. The seats were
                                                not so comfortable.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="total-neg-res">
                    <div style={{ backgroundColor: "#F871718C" }} className="pos-res-head px-4 gap-2 text-start d-flex align-items-center">
                        <div style={{ backgroundColor: "#FF7784" }} className="sq-slash df">
                            <i class="bi bi-slash-square"></i>
                        </div>
                        <p className='m-0'>Total Neutral Responses</p>
                    </div>

                    <div style={{ backgroundColor: "#FAFAFA" }} className="pos-res-nps p-4">
                        <div style={{ backgroundColor: "white" }} className='p-3 d-flex justify-content-between'>
                            <div className="nps-left gap-5">
                                <p className='text-start nps-head-p'>NPS - JUNE - 2024</p>
                                <div className="table-left">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='leftText'><strong>Store Code</strong></td>
                                                <td className='rightText'>ST004</td>
                                            </tr>
                                            <tr>
                                                <td className='leftText'><strong>ST004</strong></td>
                                                <td className='rightText'>Showroom 4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="nps-right gap-2 df">
                                <div style={{ width: "11rem" }} className="view-Ai d-flex gap-1 justify-content-center align-items-center">
                                    <div className="iconStar my-2">
                                        <i className="bi bi-stars"></i>
                                    </div>
                                    <p className='my-2'>View AI Insights</p>
                                </div>
                                <div className="view-report df">
                                    <p className='my-3'>View Report</p>
                                </div>
                            </div>
                        </div>

                        <div className="hero-forth mt-3">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour"
                                            aria-expanded="true"
                                            aria-controls="collapseFour"
                                        >
                                            <div className="audit-details d-flex" style={{ backgroundColor: "transparent" }}>
                                                <p className="ms-2">Report Summary</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFour"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body1 summary text-start d-flex align-items-center">
                                            <p>
                                                The rickshaw driver was not satisfied with the quality of the auto
                                                Rickshaw. He was facing some mechanical issues with it. The seats were
                                                not so comfortable.
                                            </p>
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

export default AI
