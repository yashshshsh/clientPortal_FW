import React from 'react'
import textImg from '../Images/Text.png'
import downImg from '../Images/vertical_align_bottom.png'
import '../CSS/StoreBrowser.css'
import { useNavigate } from 'react-router-dom'

const StoreBrowser = () => {
    const data = [
        {
            id: 1,
            storeCode: "SST-001",
            showroomName: "Showroom 1",
            address: "Near Janakpuri metro station",
            city: "Indore",
            rank: 4,
            totalScore: "95%",
            insights: "Insights"
        },
        {
            id: 2,
            storeCode: "SST-001",
            showroomName: "Showroom 2",
            address: "Near Janakpuri metro station",
            city: "Indore",
            rank: 1,
            totalScore: "95%",
            insights: "Insights"
        }
    ];

    const navigate = useNavigate();

    const handleReportBtn = () => {
        navigate('/storeBrowserInsights');
    }

    return (
        <div className='px-4'>
            <div className="head d-flex justify-content-between align-items-center">
                <div className="repoHead d-flex justify-content-center align-items-center">
                    <div className="reportPara">
                        <p className="my-2">Store Browser</p>
                    </div>
                </div>
                <div className="exportList d-flex justify-content-center align-items-center">
                    <p className="my-2">Export List</p>
                    <div className="downIcon">
                        <img src={downImg} alt="img" />
                    </div>
                </div>
            </div>

            <div className="searchStore d-flex justify-content-between">
                <div className="searchIn d-flex">
                    <div className="inputSearch p-2 gap-2 d-flex justify-content-between align-items-center">
                        <div className='d-flex w-75'>
                            <i className="bi bi-search mx-2"></i>
                            <input className="storeSearch" placeholder="Search store" />
                        </div>
                        <div className='d-flex align-items-center'>
                            <img src={textImg} alt="img" />
                        </div>
                    </div>
                    <div className="filter gap-2 d-flex justify-content-center align-items-center">
                        <p className="filterText my-1">Filter</p>
                        <div className="filterIcon">
                            <i className="bi bi-filter"></i>
                        </div>
                    </div>
                </div>
                <div className="clearFilter d-flex align-items-center">
                    <p className="my-1">Clear Filter</p>
                </div>
            </div>

            <div className="table table-responsive my-3">
                <table>
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>Store Code</th>
                            <th>Showroom Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Rank</th>
                            <th>Total Score Till Date</th>
                            <th>Insights</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={row.id}>
                                <td>{index + 1}</td>
                                <td>{row.storeCode}</td>
                                <td>{row.showroomName}</td>
                                <td>{row.address}</td>
                                <td>{row.city}</td>
                                <td>{row.rank}</td>
                                <td>
                                    <div className="progressBarContainer pt-1">
                                        <span>{row.totalScore}</span>
                                        <div
                                            className="dash1"
                                            style={{
                                                background: `linear-gradient(to right, #8DC63F ${parseInt(row.totalScore)}%, #e6e6e6 ${100 - parseInt(row.totalScore)}%)`,
                                            }}
                                        ></div>
                                    </div>
                                </td>
                                <td>
                                    <button onClick={handleReportBtn} className="reportBtn">Insights</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StoreBrowser
