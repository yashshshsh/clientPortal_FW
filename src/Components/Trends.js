import React from 'react'
import BarChart from '../Components/ChartsBars/BarChart'
import '../CSS/Trends.css'

const Trends = () => {
    const data = [
        {
            no: 1,
            question: "Was the in-store branding like wall branding, pillar branding, drop-down headers, glass branding, category drop downs, etc. maintained well?",
            maxMarks: "1",
            storeAuditResults: [
                { date: "1 Feb 2023", score: "1" },
                { date: "1 Feb 2023", score: "1" },
                { date: "1 Feb 2023", score: "1" },
                { date: "1 Feb 2023", score: "1" }
            ]
        },
        {
            no: 2,
            question: "Was the in-store branding like wall branding, pillar branding, drop-down headers, glass branding, category drop downs, etc. maintained well?",
            maxMarks: "5",
            storeAuditResults: [
                { date: "1 Feb 2023", score: "4" },
                { date: "1 Feb 2023", score: "3" },
                { date: "1 Feb 2023", score: "3" },
                { date: "1 Feb 2023", score: "3" }
            ]
        }
    ];
    const dashes = 5;
    return (
        <div className='px-4 my-3'>
            <div className="audit-details d-flex">
                    <p className='ms-2'>Store Performance</p>
                </div>
            <div className="dashSecHero justify-content-center align-items-center row d-flex">                
                <div className="secHeroLeft col-sm-9">
                    <BarChart />
                </div>

                <div className="secHeroSection my-3 shadow-lg col-sm-3">
                    <div className="secHead">
                        <p>Section</p>
                    </div>
                    <div className="section1">
                        <p className="perPara">60%</p>
                        <p className="secPara">Customer Arrival and Staff Grooming Analysis</p>
                    </div>
                    <div className="section1">
                        <p className="perPara">60%</p>
                        <p className="secPara">Store Exterior</p>
                    </div>
                    <div className="section1">
                        <p className="perPara">60%</p>
                        <p className="secPara">Store Exterior</p>
                    </div>
                    <div className="section1">
                        <p className="perPara">60%</p>
                        <p className="secPara">Store Exterior</p>
                    </div>
                </div>
            </div>

            <div className="store-details">
                <div className="audit-details d-flex">
                    <p className='ms-2' style={{ color: "#4B5563" }}>Store Performance Details</p>
                </div>

                <div className="table1 my-4">
                    <div className="customerArr">
                        <p>Customer Arrival and Staff Grooming Analysis</p>
                    </div>

                    <div className="fifthTable table-responsive">
                        <table>
                            <thead>
                                <th>S no.</th>
                                <th>Questions</th>
                                <th>Max Marks</th>
                                {data[0].storeAuditResults.map((result, index) => (
                                    <th key={index}>Competition Audits <br /> Store Type <br /> {result.date}</th>
                                ))}
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data[0].no}</td>
                                    <td className='text-start'>{data[0].question}</td>
                                    <td className="maxMarks">
                                        <div className="scoreBox df">{data[0].maxMarks}</div>
                                    </td>
                                    {data[0].storeAuditResults.map((result, idx) => (
                                        <td key={idx} className="competitionAudits">
                                            <div className="scoreIcons df flex-column">
                                                <span>{result.score}</span>
                                                <div
                                                    className="dash1"
                                                    style={{
                                                        background: result.score === "1"
                                                            ? `linear-gradient(to right, #8DC63F ${parseInt(result.score) * 100}%, #e6e6e6 ${100 - parseInt(result.score) * 100}%)`
                                                            : `linear-gradient(to right, red ${parseInt(result.score) * 100}%, #e6e6e6 ${100 - parseInt(result.score) * 100}%)`
                                                    }}
                                                ></div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>{data[1].no}</td>
                                    <td className='text-start'>{data[1].question}</td>
                                    <td className="maxMarks">
                                        <div className="scoreBox df">{data[1].maxMarks}</div>
                                    </td>
                                    {data[1].storeAuditResults.map((result, idx) => (
                                        <td key={idx}>
                                            <span>{result.score}</span>
                                            <div className="dashed df gap-2">
                                                {[...Array(dashes)].map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className="dash-trend"
                                                        style={{
                                                            background: index < result.score
                                                                ? "green"  // Fully filled dash
                                                                : '#e6e6e6'  // Unfilled dash
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="table2 ">
                    <div className="customerArr">
                        <p>Section 2</p>
                    </div>

                    <div className="fifthTable table-responsive">
                        <table className='mb-4'>
                            <thead>
                                <th>S no.</th>
                                <th>Questions</th>
                                <th>Max Marks</th>
                                {data[0].storeAuditResults.map((result, index) => (
                                    <th key={index}>Competition Audits <br /> Store Type <br /> {result.date}</th>
                                ))}
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data[0].no}</td>
                                    <td className='text-start'>{data[0].question}</td>
                                    <td className="maxMarks">
                                        <div className="scoreBox df">{data[0].maxMarks}</div>
                                    </td>
                                    {data[0].storeAuditResults.map((result, idx) => (
                                        <td key={idx} className="competitionAudits">
                                            <div className="scoreIcons df flex-column">
                                                <span>{result.score}</span>
                                                <div
                                                    className="dash1"
                                                    style={{
                                                        background: result.score === "1"
                                                            ? `linear-gradient(to right, #8DC63F ${parseInt(result.score) * 100}%, #e6e6e6 ${100 - parseInt(result.score) * 100}%)`
                                                            : `linear-gradient(to right, red ${parseInt(result.score) * 100}%, #e6e6e6 ${100 - parseInt(result.score) * 100}%)`
                                                    }}
                                                ></div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>{data[1].no}</td>
                                    <td className='text-start'>{data[1].question}</td>
                                    <td className="maxMarks">
                                        <div className="scoreBox df">{data[1].maxMarks}</div>
                                    </td>
                                    {data[1].storeAuditResults.map((result, idx) => (
                                        <td key={idx}>
                                            <span>{result.score}</span>
                                            <div className="dashed df gap-2">
                                                {[...Array(dashes)].map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className="dash2"
                                                        style={{
                                                            background: index < result.score
                                                                ? "green"  // Fully filled dash
                                                                : '#e6e6e6'  // Unfilled dash
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trends
