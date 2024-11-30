import React, { useState } from 'react';
import Question from './Question';
import downImg from '../Images/vertical_align_bottom.png';
import '../CSS/AuditReport.css';

const Section = ({ section, ansData, RepSecData, AttachIdData }) => {
    const sectionData = RepSecData.find(data => data.section === section.id);
    const [prevUrl, setPrevUrl] = useState(null);
    const [directUrl, setDirectUrl] = useState(null);

    const handleDownloadClick = (url) => {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = ""; // Optional: you can specify a filename here
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    return (
        <div>
            <div className="accordion my-3" id="accordionExample">
                <div className="accordion-item mt-3">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${section.id}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${section.id}`}
                        >
                            <div style={{ backgroundColor: "transparent" }} className="audit-details d-flex">
                                <p className="ms-2">{section.name}</p>
                            </div>
                        </button>
                    </h2>

                    <div
                        id={`collapse-${section.id}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            {/* Render Questions */}
                            {section.questions.map((question) => {
                                const answer = ansData.find(
                                    answer => answer.question === question.id
                                );
                                const questionData = {
                                    questionLabel: `Question ${question.sequence}`,
                                    questionText: question.question_txt,
                                    marks: question.max_marks,
                                    maxMarks: question.max_marks,
                                    ...(question.question_type === 'MUTEX' || question.question_type === 'MULTISELECT'
                                        ? { options: question.question_data.options }
                                        : {}),
                                    answer: answer || null,
                                };
                                return (
                                    <Question
                                        key={question.id}
                                        questionData={questionData}
                                        questionType={question.question_type}
                                    />
                                );
                            })}

                            {sectionData && (
                                <>
                                    <div style={{ backgroundColor: "transparent" }} className="audit-details my-3 d-flex">
                                        <p className="ms-2">Section summary</p>
                                    </div>
                                    <div style={{ backgroundColor: "white" }} className="body-content summary text-start d-flex align-items-center p-3">
                                        <p>{sectionData.auditor_comment}</p>
                                    </div>
                                </>
                            )}

                            <div style={{ backgroundColor: "transparent" }} className="audit-details my-3 d-flex">
                                <p className="ms-2">Attachments</p>
                            </div>

                            <div className='body-content d-flex gap-3'>
                                {AttachIdData && AttachIdData[section.id] && AttachIdData[section.id].length > 0 ? (
                                    AttachIdData[section.id].map((attachment, index) => (
                                        <div
                                            key={index}
                                            className="attachImg d-flex"
                                            onClick={() => {
                                                setPrevUrl(attachment.extra.preview_url);
                                                setDirectUrl(attachment.direct_url);
                                            }}
                                        >
                                            <img src={attachment.extra.thumbnail_url} alt={`Thumbnail ${index + 1}`} />
                                        </div>
                                    ))
                                ) : (
                                    <div className='noAttachments mx-auto mt-3'>
                                        <p>No attachments available for this section.</p>
                                    </div>
                                )}

                            </div>

                            <div className={`largeImg df flex-column my-3 ${prevUrl ? "" : "d-none"}`}>
                                {prevUrl && (<img src={prevUrl} alt="Preview" />)}
                                <div className="downPrevImg bg-dark my-3 df gap-1 p-1" onClick={() => handleDownloadClick(directUrl)}>
                                    <img src={downImg} alt="img" />
                                    <p className='my-2'>Download</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section;
