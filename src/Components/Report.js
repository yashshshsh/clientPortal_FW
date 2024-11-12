import React from 'react'
import ReportBars from './ChartsBars/ReportBars';
import '../CSS/Report.css'

const Report = () => {
    const surveyData = [
        {
            auditType: "Walk-in Audit",
            auditDate: "28/09/2024",
            score: 93,
            maxScore: 100,
        },
        {
            auditType: "Walk-in Audit",
            auditDate: "28/09/2024",
            score: 93,
            maxScore: 100,
        },
        {
            auditType: "Walk-in Audit",
            auditDate: "28/09/2024",
            score: 93,
            maxScore: 100,
        },
        {
            auditType: "Walk-in Audit",
            auditDate: "28/09/2024",
            score: 93,
            maxScore: 100,
        },
        {
            auditType: "Walk-in Audit",
            auditDate: "28/09/2024",
            score: 93,
            maxScore: 100,
        },
        {
            auditType: "Walk-in Audit",
            auditDate: "28/09/2024",
            score: 93,
            maxScore: 100,
        },
    ];

    return (
        <div style={{backgroundColor:"#FAFAFA"}} className='reo my-4 px-4'>
            <div className="audit-details d-flex">
                <p className='ms-2'>Audit Cycle</p>
            </div>

            <div className="survey-cards mx-auto my-3 row">
                {surveyData.map((item, idx) => (
                    <div className="card shadow-lg my-2 pb-3 mx-auto col-md-4 ">
                        <p className='sd text-start px-4 pt-3'>Survey Details</p>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='a-left ps-4 text-start'>Audit Type</td>
                                        <td className='a-right text-start'>Walk-in Audit</td>
                                    </tr>
                                    <tr>
                                        <td className='a-left ps-4 text-start'>Audit Date</td>
                                        <td className='a-right text-start'>28/09/2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="dashed-bar df">
                            <ReportBars color={"#8DC63F"} progress={item.score} shadow={false} />
                        </div>
                        <div className="viewReport df my-2 mx-auto">
                            <p className='my-2'>View Report</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Report
