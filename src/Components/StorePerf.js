import React, { useRef } from 'react'
import '../CSS/StorePerf.css'
import textImg from '../Images/Text.png'
import { useNavigate } from 'react-router-dom';

const StorePerf = ({ setState }) => {
    const tableData = [
        {
            sNo: 1,
            audit: "Competition Audits - Store Type 2 - Feb - 2023",
            maxMarks: 1,
            customerArrival1: 1,
            interactionWithStaff1: 0,
            customerArrival2: 1,
            interactionWithStaff2: 0,
            customerArrival3: 1,
            interactionWithStaff3: 1,
        },
        {
            sNo: 2,
            audit: "Competition Audits - Store Type 2 - Feb - 2023",
            maxMarks: 5,
            customerArrival1: 0,
            interactionWithStaff1: 1,
            customerArrival2: 1,
            interactionWithStaff2: 4,
            customerArrival3: 0,
            interactionWithStaff3: 0,
        },
    ];

    const tableDataM = [
        { sNo: 1, storeCode: "SST-001", showroomName: "Showroom 1", city: "Indore", insights: "Insights" },
        { sNo: 2, storeCode: "SST-001", showroomName: "Showroom 2", city: "Indore", insights: "Insights" }
    ];

    const navigate = useNavigate();
    const ref = useRef();

    const handleInsights = () => {
        ref.current.click();
        setTimeout(() => {
            setState("reports");
            navigate('/storeBrowserInsights');
        }, 300);
    };

    return (
        <div className='px-4'>
            <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "833px" }}>
                    <div style={{ backgroundColor: "#F6F6F6" }} className="modal-content p-2">
                        <div className="modal-header" style={{ border: "none" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Competition Audits - Store Type 2 - Feb - 2023</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="mx-auto" style={{ width: "90%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#004a7c", color: "#fff" }}>
                                        <th>S no.</th>
                                        <th>Store Code</th>
                                        <th>Showroom Name</th>
                                        <th>City</th>
                                        <th>Insights</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableDataM.map((row, index) => (
                                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff" }}>
                                            <td>{row.sNo}</td>
                                            <td>{row.storeCode}</td>
                                            <td>{row.showroomName}</td>
                                            <td>{row.city}</td>
                                            <td>
                                                <button onClick={handleInsights} className="reportBtn">Insights</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="perf-head text-start my-4">
                <p className='sp'>Store Performance</p>
                <p className='perf-p my-3'>Use this dashboard to get stores which have scored less than optimal value. You can enter the optimal value in the input box above between 1-100</p>
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
            </div>
            <div className="perf-lower my-3">
                <p className='text-start'>Top Score Performer Stores</p>

                <div className="table-bordered table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th className='SNO'>S no.</th>
                                <th className="audit" style={{ minWidth: "270px" }}>Audit</th>
                                <th style={{ minWidth: "90px" }}>Max Marks</th>
                                <th style={{ minWidth: "140px" }}>Customer Arrival and Staff Grooming Analysis</th>
                                <th style={{ minWidth: "140px" }}>Interaction with Staff</th>
                                <th style={{ minWidth: "140px" }}>Customer Arrival and Staff Grooming Analysis</th>
                                <th style={{ minWidth: "140px" }}>Interaction with Staff</th>
                                <th style={{ minWidth: "140px" }}>Customer Arrival and Staff Grooming Analysis</th>
                                <th style={{ minWidth: "140px" }}>Interaction with Staff</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.sNo}</td>
                                    <td>{row.audit}</td>
                                    <td className="max-marks">
                                        <div className="row-maxmarks mx-auto df">
                                            {row.maxMarks}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div onClick={() => row.customerArrival1 !== 0 && ref.current.click()} className={`row-marks mx-auto df ${row.customerArrival1 !== 0 ? "highlight" : ""}`}>
                                            {row.customerArrival1}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div onClick={() => row.interactionWithStaff1 !== 0 && ref.current.click()} className={`row-marks mx-auto df ${row.interactionWithStaff1 !== 0 ? "highlight" : ""}`}>
                                            {row.interactionWithStaff1}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div onClick={() => row.customerArrival2 !== 0 && ref.current.click()} className={`row-marks mx-auto df ${row.customerArrival2 !== 0 ? "highlight" : ""}`}>
                                            {row.customerArrival2}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div onClick={() => row.interactionWithStaff2 !== 0 && ref.current.click()} className={`row-marks mx-auto df ${row.interactionWithStaff2 !== 0 ? "highlight" : ""}`}>
                                            {row.interactionWithStaff2}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div onClick={() => row.customerArrival3 !== 0 && ref.current.click()} className={`row-marks mx-auto df ${row.customerArrival3 !== 0 ? "highlight" : ""}`}>
                                            {row.customerArrival3}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div onClick={() => row.interactionWithStaff3 !== 0 && ref.current.click()} className={`row-marks mx-auto df ${row.interactionWithStaff3 !== 0 ? "highlight" : ""}`}>
                                            {row.interactionWithStaff3}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StorePerf
