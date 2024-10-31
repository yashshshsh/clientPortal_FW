import React from 'react'
import DashedBarProgress from '../Components/ChartsBars/DashedBarProgress'
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
        <div className='px-3 reo'>
            <div className="audit-details mt-2 d-flex">
                <p className='ms-2'>Audit Cycle</p>
            </div>

            <div className="survey-cards my-3 row">
                {surveyData.map((item, idx) => (
                    <div className="card my-2 shadow-lg mx-auto col-md-4">
                        <p className='sd text-start p-3'>Survey Details</p>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='a-left'>Audit Type</td>
                                        <td className='a-right'>Walk-in Audit</td>
                                    </tr>
                                    <tr>
                                        <td className='a-left'>Audit Date</td>
                                        <td className='a-right'>28/09/2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="dashed-bar df">
                            <DashedBarProgress color={"#8DC63F"} progress={item.score} shadow={false} />
                        </div>
                        <div className="viewReport df mx-auto my-2">
                            <p className='my-2'>View Report</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Report
