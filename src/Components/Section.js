import React, { useState } from 'react';
import '../CSS/AuditReport.css';
import downImg from '../Images/vertical_align_bottom.png';

const Section = ({ section, ansData, RepSecData, AttachIdData, idx }) => {
    const [prevUrl, setPrevUrl] = useState(null); // For preview URL
    const [directUrl, setDirectUrl] = useState(null); // For download URL

    // Get the section data related to the current section id
    const sectionData = RepSecData.find(data => data.section === section.id);

    // Check if any question has 0 marks
    const hasZeroMarks = section.questions.some(question => {
        const answer = ansData.find(ans => ans.question === question.id);
        return answer?.marks_obtained === 0;
    });

    // Set background and text colors based on marks
    const sectionBackgroundColor = hasZeroMarks ? "#ffe0cc" : "#e0ffcc";
    const sectionTextColor = hasZeroMarks ? "#993d00" : "#6fb93f";

    // Handle file download when the download icon is clicked
    const handleDownloadClick = (url) => {
        if (url) {
            const a = document.createElement('a');
            a.href = url;
            a.download = "attachment";
            a.click();
        }
    };

    // Check if there are attachments for the current section
    const hasAttachments = AttachIdData[section.id] && AttachIdData[section.id].length > 0;

    const { totalObtainedMarks, totalMaxMarks } = section.questions.reduce(
        (acc, question) => {
            const answer = ansData.find(ans => ans.question === question.id);
            acc.totalObtainedMarks += answer?.marks_obtained || 0;
            acc.totalMaxMarks += question.max_marks;
            return acc;
        },
        { totalObtainedMarks: 0, totalMaxMarks: 0 }
    );

    return (
        <div className="section-table mt-2">
            {/* Section Name */}
            <div
                className="sec-name d-flex flex-column justify-content-center"
                style={{
                    backgroundColor: sectionBackgroundColor,
                    color: sectionTextColor,
                    borderBottom: `1px solid ${sectionTextColor}`,
                }}
            >
                <p className="ms-3 my-3">{idx + 1}. {section.name}</p>
            </div>

            {/* Table of Questions and Answers */}
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "6vw" }}>#</th>
                        <th className="text-start" style={{ width: "35vw" }}>Question</th>
                        <th className="text-start" style={{ width: "35vw" }}>Answer</th>
                        <th style={{ width: "10vw" }}>Marks</th>
                        <th style={{ width: "10vw" }}>Max. Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {section.questions.map((question, index) => {
                        const answer = ansData.find(ans => ans.question === question.id);
                        const cellBackgroundColor = answer?.marks_obtained === 0 ? "#ffe0cc" : "#f9f9f9";
                        const cellTextColor = answer?.marks_obtained === 0 ? "#993d00" : "inherit";

                        return (
                            <tr key={question.id}>
                                <td>{index + 1}</td>
                                <td className="text-start">{question.question_txt}</td>
                                <td className="text-start">{answer ? answer.answer_text : "No answer provided"}</td>
                                <td style={{ backgroundColor: cellBackgroundColor, color: cellTextColor }}>
                                    {answer?.marks_obtained || 0}
                                </td>
                                <td>{question.max_marks}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* White Blank Spacer */}
            <div style={{ height: "1rem", backgroundColor: "white" }} className="white-blank"></div>

            {/* Section Summary */}
            {sectionData && (
                    <div style={{ backgroundColor: "#f5f5f5" }} className="section-summary my-1 p-3">
                        <div className="marks" style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                            <p>Total Marks: {totalObtainedMarks} out of {totalMaxMarks}</p>
                        </div>
                        <span className="m-0 d-inline-block">Section Summary: </span>
                        <p className="d-inline-block">{sectionData.auditor_comment}</p>
                    </div>
            )}


            {/* Attachments */}
            {hasAttachments && (
                <>
                    <div className="attachHead">
                        <p>Attachments</p>
                    </div>
                    <div className="body-content d-flex gap-3">
                        {AttachIdData[section.id].map((attachment, index) => (
                            <div
                                key={index}
                                className="attachImg d-flex"
                                onClick={() => {
                                    // Toggle the preview URL if the same attachment is clicked again
                                    if (prevUrl === attachment.extra.preview_url) {
                                        setPrevUrl(null);  // Reset preview
                                    } else {
                                        setPrevUrl(attachment.extra.preview_url);  // Set the new preview
                                    }
                                    setDirectUrl(attachment.direct_url);  // Update download URL
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
                </>
            )}

            {/* Preview and Download Section */}
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
    );
};

export default Section;
