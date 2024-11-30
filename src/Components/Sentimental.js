import React from 'react'
import sentimentImg from '../Images/SentimentImg.png'
import '../CSS/Sentimental.css'

const Sentimental = () => {
    return (
        <div className='px-5 my-3 main-senti'>
            <div className="senti-head d-flex justify-content-between align-items-center text-start">
                <p className="my-3">Sentimental Analysts</p>
                <i className="bi bi-x"></i>
            </div>

            <div className="hero-forth mt-5">
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

            <div className="hero-forth mt-5">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseSec"
                                aria-expanded="true"
                                aria-controls="collapseSec"
                            >
                                <div className="audit-details d-flex" style={{ backgroundColor: "transparent" }}>
                                    <p className="ms-2">Report word cloud</p>
                                </div>
                            </button>
                        </h2>
                        <div
                            id="collapseSec"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-bodyImg df summary text-start d-flex align-items-center">
                                <img className='my-3' src={sentimentImg} alt="img"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-forth mt-5">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThird"
                                aria-expanded="true"
                                aria-controls="collapseThird"
                            >
                                <div className="audit-details d-flex" style={{ backgroundColor: "transparent" }}>
                                    <p className="ms-2">Report word cloud</p>
                                </div>
                            </button>
                        </h2>
                        <div
                            id="collapseThird"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body3 df summary text-start d-flex align-items-center">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sentimental
