import React from 'react';
import '../CSS/AuditReport.css';

const Question = ({ questionData, questionType }) => {
    const { questionLabel, questionText, maxMarks, options, answer } = questionData;

    const selectedAnswers = questionType === 'MULTISELECT' ? (answer?.answer_text || "").split(",") : [];

    return (
        <div style={{backgroundColor:"white"}} className="question p-4 my-2 text-start">
            <div className="que">
                <p className="q">{questionLabel}</p>
                <p className="a">{questionText}</p>
            </div>
            
            {questionType === 'PLAIN' && (
                <div className="ans">
                    <p className="q">Answer</p>
                    <p className="a">{answer ? answer.answer_text : 'No answer provided'}</p>
                </div>
            )}

            {questionType === 'MUTEX' && (
                <>
                    <div className="ans">
                        <p className="a">Options</p>
                    </div>
                    <div className="options d-flex flex-column">
                        <div className="options-upper row d-flex">
                            {options?.map((option, index) => (
                                <div key={index} className={`option${index + 1} d-flex align-items-center justify-content-center col-md-6`}>
                                    <div className={`inner-op-div ${answer?.answer_text === option.value ? 'selected' : ''} d-flex align-items-center`}>
                                        <p className="alpha df m-3">{String.fromCharCode(65 + index)}</p>
                                        <p className="op-text mt-3">{option.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {questionType === 'MULTISELECT' && (
                <>
                    <div className="ans">
                        <p className="a">Options</p>
                    </div>
                    <div className="options d-flex flex-column">
                        <div className="options-upper row d-flex">
                            {options?.map((option, index) => (
                                <div key={index} className={`option${index + 1} d-flex align-items-center justify-content-center col-md-6`}>
                                    <div className={`inner-op-div ${selectedAnswers.includes(option.value) ? 'selected' : ''} d-flex align-items-center`}>
                                        <p className="alpha df m-3">{String.fromCharCode(65 + index)}</p>
                                        <p className="op-text mt-3">{option.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

{questionType === 'OPINION_SCALE' && (
    <div className="rating flex-column d-flex justify-content-center align-items-center">
        <div>
            <div className="icon-div d-flex gap-2">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className={`${
                            answer?.marks_obtained === i + 1 ? 'c1-selected' : 'c1'
                        } d-flex justify-content-center align-items-center`}
                    >
                        <p className='my-2'>{i + 1}</p>
                    </div>
                ))}
            </div>
            <div className="rate-comment d-flex justify-content-between align-items-center">
                <p>Least Likely</p>
                <p>Neutral</p>
                <p>Most Likely</p>
            </div>
        </div>
    </div>
)}


            {questionType === 'RATING' && (
                <div className="rating flex-column d-flex justify-content-center align-items-center">
                    <div>
                        <div className="icon-div d-flex gap-2">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`star d-flex justify-content-center align-items-center ${answer?.marks_obtained >= i + 1 ? 'selected' : ''}`}
                                >
                                    <span style={{backgroundColor:"#FAFAFA"}} className="star-icon">&#9733;</span> 
                                </div>
                            ))}
                        </div>
                        <div className="rate-comment d-flex justify-content-between align-items-center">
                            <p>1 Star</p>
                            <p>3 Stars</p>
                            <p>5 Stars</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="que-footer justify-content-between d-flex">
                <div className="f-marks gap-4 d-flex align-items-center">
                    <p className="p-marks mt-3">Marks</p>
                    <div className="marks-num d-flex justify-content-center align-items-center">
                        <p className="mt-3">{answer?.marks_obtained || 0}</p>
                    </div>
                </div>
                <div className="max-marks gap-4 d-flex align-items-center">
                    <p className="p-max-marks mt-3">Maximum marks</p>
                    <div className="max-div d-flex justify-content-center align-items-center">
                        <p className="mt-3">{maxMarks}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question;
