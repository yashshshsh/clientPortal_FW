import React from 'react'
import '../CSS/StorePerf.css'

const StorePerf = () => {
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

    return (
        <div>
            <div className="perf-head text-start my-3 px-5">
                <p className='sp'>Store Performance</p>
                <p className='perf-p my-3'>Use this dashboard to get stores which have scored less than optimal value. You can enter the optimal value in the input box above between 1-100</p>
            </div>

            <div className="searchIn d-flex px-5">
                <div className="inputSearch p-2 gap-2 d-flex justify-content-center align-items-center">
                    <i className="bi bi-search"></i>
                    <input className="storeSearch" placeholder="Enter percentage" />
                </div>
                <div className="filter gap-2 d-flex justify-content-center align-items-center">
                    <p className="my-1 filterText">Filter</p>
                    <div className="filterIcon">
                        <i className="bi bi-filter"></i>
                    </div>
                </div>
            </div>

            <div className="perf-lower px-5 my-3">
                <p className='text-start'>Top Score Performer Stores</p>

                <div className="table-bordered table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ minWidth: "46px" }}>S no.</th>
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
                                    <td className="max-marks df">
                                        <div className="row-maxmarks df">
                                            {row.maxMarks}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div className={`row-marks mx-auto df ${row.customerArrival1 !== 0 ? "highlight" : ""}`}>
                                            {row.customerArrival1}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div className={`row-marks mx-auto df ${row.interactionWithStaff1 !== 0 ? "highlight" : ""}`}>
                                            {row.interactionWithStaff1}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div className={`row-marks mx-auto df ${row.customerArrival2 !== 0 ? "highlight" : ""}`}>
                                            {row.customerArrival2}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div className={`row-marks mx-auto df ${row.interactionWithStaff2 !== 0 ? "highlight" : ""}`}>
                                            {row.interactionWithStaff2}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div className={`row-marks mx-auto df ${row.customerArrival3 !== 0 ? "highlight" : ""}`}>
                                            {row.customerArrival3}
                                        </div>
                                    </td>
                                    <td className="marks">
                                        <div className={`row-marks mx-auto df ${row.interactionWithStaff3 !== 0 ? "highlight" : ""}`}>
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
