import React, { useEffect, useRef, useState } from 'react'
import '../CSS/AuditReport.css'
import CircularBar from './ChartsBars/CircularBar';
import ARDashedBar from './ChartsBars/ARDashedBar';
import attachImg from '../Images/Attachments.png'
import downDrop from '../Images/arrow_drop_down (1).png'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import Select from 'react-select';
import 'antd/dist/reset.css'
import 'react-calendar/dist/Calendar.css';
import { useLocation } from 'react-router-dom';
import downImg from '../Images/vertical_align_bottom.png'
import ActionImg from '../Images/CAction.png'
import axios from "axios";
import Section from './Section';
import { useFetchReportId, useFetchSection, useFetchReportSection, useFetchRepAns, useFetchImpFactor, useFetchReportAdmin, useFetchReportAction, useFetchRepAttachemnts, useFetchRepAttachmentsID, useCreateAction, useFetchAiInsights } from '../CustomHooks/IndReport'
import AIModal from './AIModal';
import DemoAIModal from './DemoAIModal';

const AuditReport = () => {

    const location = useLocation();
    const { auditStoreId } = location.state || {};
    const numericAuditStoreId = Number(auditStoreId);

    const [formState, setFormState] = useState({ actionPlan: '', selectedDate: null, calendarVisible: false, selectedPerson: null });

    const { data: storeIdData, isLoading: storeIdLoading, error: storeIdError } = useFetchReportId(`audit_store/${numericAuditStoreId}`);
    const { data: RepSecData, isLoading: RepSecLoading, error: RepSecError } = useFetchReportSection(`audit_store/${numericAuditStoreId}/report_section`);
    const { data: SecData, isLoading: SecLoading, error: SecError } = useFetchSection(`audit_store/${numericAuditStoreId}/section`);
    const { data: ImpFacData, isLoading: ImpFacLoading, error: ImpFacError } = useFetchImpFactor(`audit_store/${numericAuditStoreId}/impact_factor`);
    const { data: AdminData, isLoading: AdminLoading, error: AdminError } = useFetchReportAdmin(`audit_store/${numericAuditStoreId}/admin_and_non_admin_user_for_admin`);
    const { data: repActionData, isLoading: repActionLoading, error: repActionError } = useFetchReportAction(`audit_store/${numericAuditStoreId}/report_action`);
    const { data: attachmentData, isLoading: attachmentLoading, error: attachmentError } = useFetchRepAttachemnts(`audit_store/${numericAuditStoreId}/attachment`);
    const { data: ansData, isLoading: ansLoading, error: ansError } = useFetchRepAns(`audit_store/${numericAuditStoreId}/answer`);
    const { data: createData, isLoading: createLoading, error: createError, postData: postApiData } = useCreateAction();

    const { data: AttachIdData, isLoading: AttachIdLoading, error: AttachIdError, getApiData: getAttachIdApiData } = useFetchRepAttachmentsID();
    const { data: insightsData, isLoading: insightsLoading, error: insightsError, getApiData: getinsightsData } = useFetchRepAttachmentsID();

    useEffect(() => {
        const fetchAttachments = async () => {
            for (const section of SecData) {
                const url = `audit_store/${numericAuditStoreId}/section/${section.id}/attachment`;
                await getAttachIdApiData(url, section.id);
            }
        };
        fetchAttachments();
    }, [SecData]);

    const getProgressColor = (progress) => {
        if (progress < 30) return "#C9727B";
        if (progress >= 30 && progress < 60) return "#C6B83F";
        if (progress >= 60 && progress < 80) return "#B4DA1F";
        return "#8DC63F";
    };

    const formatDate = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            return date.toLocaleDateString();
        }
        return date;
    };


    const [calendarVisible, setCalendarVisible] = useState(false);
    const [prevUrl, setPrevUrl] = useState(null);
    const [directUrl, setDirectUrl] = useState(null);

    const handleDownloadClick = (url) => {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };
    const value = storeIdData?.audit?.store?.get_total_percentage.score || 0;

    const handleActionPlanChange = (e) => {
        setFormState({ ...formState, actionPlan: e.target.value });
    };

    const handleDateSelection = (date) => {
        const formattedDate = new Date(date).toISOString().substring(0, 10);
        setFormState({ ...formState, selectedDate: formattedDate, calendarVisible: false });
    };

    const toggleCalendarVisibility = () => {
        setFormState({ ...formState, calendarVisible: !formState.calendarVisible });
    };

    const handlePersonSelection = (selectedOption) => {
        setFormState({ ...formState, selectedPerson: selectedOption });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            action_plan: formState.actionPlan,
            target_date: formState.selectedDate,
            person: formState.selectedPerson,
        };
        postApiData(`audit_store/${numericAuditStoreId}/report_action`, payload);
        handleClose();
    };

    const [show, setShow] = useState(false);
    const [showSenti, setShowSenti] = useState(false);
    const ref = useRef(null);
    const viewref = useRef(null);
    const handleViewAi = async () => {
        try {
            setShowSenti(true);
            await getinsightsData(`sentiment_data/${numericAuditStoreId}`);
            viewref.current.click();
        } catch (error) {
            console.error("Error fetching AI insights:", error.message);
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <DemoAIModal viewref={viewref} showSenti={showSenti} setShowSenti={setShowSenti} insightsData={insightsData} />
            <Button ref={viewref} variant="dark" className="d-none" onClick={() => setShowSenti(true)}>
                Launch demo modal
            </Button>
            <Button ref={ref} variant="primary d-none" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a Action Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='action-textArea'>
                        <p>Action Plan : </p>
                        <textarea rows="4" cols="50" value={formState.actionPlan} onChange={handleActionPlanChange} />
                    </div>
                    <div>
                        <p className="m-0">Target Date</p>
                        <div className="select-date-container" onClick={toggleCalendarVisibility} style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
                            {formState.selectedDate
                                ? `Selected Date: ${formatDate(new Date(formState.selectedDate))}` // Convert to Date object
                                : 'Select a Target Date'}
                        </div>

                        {formState.calendarVisible && (
                            <div className="calendarContainer df">
                                <Calendar
                                    value={formState.selectedDate}
                                    onChange={handleDateSelection}
                                />
                            </div>
                        )}

                    </div>
                    <div className='my-2'>
                        <p className='m-0'>Person Responsible</p>
                        <Select
                            options={AdminData.map((admin) => ({
                                value: admin.email,
                                label: `${admin.full_name} -- ${admin.email}`,
                            }))}
                            placeholder="Select a person"
                            value={formState.selectedPerson ? {
                                value: formState.selectedPerson,
                                label: `${AdminData.find(admin => admin.email === formState.selectedPerson)?.full_name} -- ${formState.selectedPerson}`
                            } : null}
                            onChange={(selectedOption) => {
                                setFormState({ ...formState, selectedPerson: selectedOption?.value }); // Save only the selected email
                            }}
                        />

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <div style={{ backgroundColor: "white" }} className='my-4 px-4'>
                <div className="audit-first">
                    <div className="rbar px-3 text-start d-flex">
                        <p className='my-2'>Report Browser<span>/Audit Report</span></p>
                    </div>
                </div>

                <div className="audit-heading d-flex align-items-center justify-content-between">
                    <div className="audit-text px-3 d-flex align-items-center">
                        <p className='my-4'>Audit Report</p>
                    </div>
                    <div className="audit-right d-flex gap-3 me-3">
                        <div onClick={() => {
                            ref.current.click();

                        }} className="action d-flex gap-2">
                            <p className='mt-3 create'>Create Action</p>
                            <img src={ActionImg} alt="img" />
                        </div>
                        <div className="export d-flex gap-2">
                            <p className='mt-3 expo'>Export To</p>
                            <img src={downDrop} alt="img" />
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: "#FAFAFA" }} className="hero-audit pt-3 px-3">
                    <div className="audit-details d-flex">
                        <p className='ms-2'>Audit Details</p>
                    </div>

                    <div className="hero-first row d-flex justify-content-around">
                        <div className="hero-left col-md-6">
                            <div className="overall d-flex align-items-center gap-2 mt-2">
                                <p className='my-2'>Overall Score</p>
                                <div className="score-per df ">
                                    <p className='my-2'>{value}%</p>
                                </div>
                            </div>


                            <div className="left-details d-flex">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="leftText"><strong>Client</strong></td>
                                            <td className="rightText">{storeIdData?.audit?.store?.client?.name || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="leftText"><strong>Store Code</strong></td>
                                            <td className="rightText">{storeIdData?.audit?.store?.code || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="leftText"><strong>Store</strong></td>
                                            <td className="rightText">{storeIdData?.audit?.store?.name || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="leftText"><strong>Assigned Date</strong></td>
                                            <td className="rightText">{new Date(storeIdData?.submit_at).toLocaleString() || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="leftText"><strong>Store Address</strong></td>
                                            <td className="rightText">{storeIdData?.audit?.store?.address || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="leftText"><strong>Audit Date</strong></td>
                                            <td className="rightText">{new Date(storeIdData?.audit_date).toLocaleDateString() || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <div onClick={handleViewAi} className="view-Ai my-3 d-flex gap-1 justify-content-center align-items-center">
                                <div className="iconStar my-2">
                                    <i className="bi bi-stars"></i>
                                </div>
                                <p className='my-2'>View AI Insights</p>
                            </div>
                        </div>

                        <div className="hero-right col-md-3 my-2 meter d-flex flex-column align-items-center justify-content-center">
                            <p className='overallPara m-0'>Overall Store Score</p>
                            <CircularBar storeIdData={storeIdData} />
                            <div className="store-score d-flex justify-content-center align-items-center flex-column">
                                <p className='scorePara'>Your Store Score Is Poor</p>
                                <div className="stats">
                                    <p className='m-0'>What these stats mean?</p>
                                </div>
                                <div className="grades-div d-flex flex-wrap gap-2 mt-3">
                                    <div style={{ width: "55px" }} className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                        <p className='grade m-1'>Excellent</p>
                                        <p className='percent m-0'>95% to above</p>
                                        <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#C1FF99" }} className="mt-1 stats-div"></div>
                                    </div>
                                    <div className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                        <p className='grade m-1'>Good</p>
                                        <p className='percent m-0'>80% to 94%</p>
                                        <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#EAFF99" }} className="mt-1 stats-div"></div>
                                    </div>
                                    <div className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                        <p className='grade m-1'>Average</p>
                                        <p className='percent m-0'>70% to 80%</p>
                                        <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#FFFF99" }} className="mt-1 stats-div"></div>
                                    </div>
                                    <div className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                        <p className='grade m-1'>Poor</p>
                                        <p className='percent m-0'>50% to 70%</p>
                                        <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#FFEB99" }} className="mt-1 stats-div"></div>
                                    </div>
                                    <div className="stats-mean d-flex flex-column align-items-center justify-content-center">
                                        <p className='grade m-1'>Bad</p>
                                        <p className='percent m-0'>0% to 50%</p>
                                        <div style={{ width: "41px", height: "8px", borderRadius: "10px", backgroundColor: "#FFC299" }} className="mt-1 stats-div"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    
                    <div className="audit-details-tab my-3 d-flex">
                        <p className='ms-2'>Report Actions</p>
                    </div>
                    <div style={{ height: 'auto' }} className="hero-sec my-2 table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "7vw" }}>S no.</th>
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
                                    <td style={{backgroundColor:"#FAFAFA"}}>1</td>
                                    <td>40368</td>
                                    <td>clientdem04@floorwalk.in</td>
                                    <td>09 August 2024</td>
                                    <td>Admin</td>
                                    <td>The reception branding needs to be fixed.</td>
                                    <td style={{ borderTop: "none", borderLeft: "none" }}>
                                        <div className="pending d-flex align-items-center mx-auto">
                                            <i style={{ fontSize: "2.2rem", margin: "0", color: "#D98634" }} className="bi bi-dot"></i>
                                            <p className='my-2'>Action Pending</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="hero-third my-3">
                        <div className="audit-details d-flex">
                            <p className='ms-2'>Report Sections</p>
                        </div>


                        <div className="dashed-bars my-3 row d-flex">
                            {RepSecData.map((section) => {
                                const progress = Math.floor(section.marks_percentage);
                                const color = getProgressColor(progress);
                                const columnClass = RepSecData.length <= 2 ? 'col-sm-6' : 'col-sm-4';

                                const matchingSection = SecData.find((s) => s.id === section.section);
                                const sectionName = matchingSection ? matchingSection.name : 'Unknown Section';
                                return (
                                    <div key={section.id} className={`d-flex ${columnClass} justify-content-center align-items-center`}>
                                        <ARDashedBar color={color} sectionName={sectionName} progress={progress} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="hero-forth mt-5">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <div style={{ backgroundColor: "transparent" }} className="audit-details d-flex">
                                            <p className='ms-2'>Report Summary</p>
                                        </div>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-bodySum summary text-start d-flex align-items-center">
                                        <div className='body-content p-3'>
                                            <p>{storeIdData.report_summary}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-fifth my-2">
                        <div className="accordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <div style={{ backgroundColor: "transparent" }} className="audit-details d-flex">
                                            <p className='ms-2'>Attachments</p>
                                        </div>
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-bodySum">
                                        <div className='body-content d-flex gap-3'>
                                            {attachmentData.map((attachment, index) => (
                                                <div
                                                    key={index}
                                                    className="attachImg d-flex"
                                                    onClick={() => {
                                                        // If the clicked attachment is already being shown in the preview, hide the preview
                                                        if (prevUrl === attachment.extra.preview_url) {
                                                            setPrevUrl(null);  // Reset to no preview
                                                        } else {
                                                            setPrevUrl(attachment.extra.preview_url);  // Set the preview URL to the clicked attachment
                                                        }
                                                        setDirectUrl(attachment.direct_url);  // Update the direct URL for download
                                                    }}
                                                >
                                                    <img
                                                        src={attachment.extra.thumbnail_url}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        style={{ width: "100px", height: "100px", cursor: "pointer" }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className={`largeImg df flex-column my-3 ${prevUrl ? "" : "d-none"}`}>
                                            {prevUrl && (<img src={prevUrl} alt="Preview" style={{ maxWidth: "500px" }} />)}
                                            <div
                                                className="downPrevImg bg-dark my-3 df gap-1 p-1"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleDownloadClick(directUrl)}
                                            >
                                                <img src={downImg} alt="Download Icon" style={{ width: "20px" }} />
                                                <p className="my-2 text-white">Download</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="head-que text-start">
                    <p className='p-2'>Questionnaire</p>
                </div>

                {SecData.map((section, idx) => (
                    <div key={section.id} className="my-4">
                        <Section section={section} ansData={ansData} idx={idx} RepSecData={RepSecData} AttachIdData={AttachIdData} />
                    </div>
                ))}
            </div>
        </>

    )
}

export default AuditReport
