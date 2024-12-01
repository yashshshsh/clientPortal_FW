import React, { useRef, useState, useEffect } from 'react'
import * as XLSX from "xlsx";
import '../CSS/StorePerf.css'
import downImg from '../Images/vertical_align_bottom.png'
import textImg from '../Images/Text.png'
import { useNavigate } from 'react-router-dom';
import { useFetchQueTypes, useFetchAudCycles } from '../CustomHooks/UseFetchUrl';


const StorePerf = ({ setState }) => {

    const { data: queTypesData, isLoading: queTypesLoading, error: queTypesError } = useFetchQueTypes('/questionnaire_types_for_dashboard');
    const { data: cyclesData, isLoading: cyclesLoading, error: cyclesError } = useFetchAudCycles('/audit_cycle_for_dashboard');

    const queId = queTypesData?.[0]?.id;
    const [cycleId, setCycleId] = useState(null);
    const [selectedQueId, setSelectedQueId] = useState(null);
    const [detailsData, setDetailsData] = useState([]);

    useEffect(() => {
        if (cyclesData && selectedQueId) {
            const filteredCycles = cyclesData.filter(cycle => cycle.questionnaire_type.id === selectedQueId);
            setDetailsData(filteredCycles);
            if (filteredCycles.length > 0) {
                setCycleId(filteredCycles[0].id);
            } else {
                setCycleId(null);
            }
        }
    }, [cyclesData, selectedQueId]);

    useEffect(() => {
        if (queId) {
            setSelectedQueId(queId);
        }
    }, [queId]);

    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedQueId(selectedId);
    };

    const handleSelectChange1 = (event) => {
        const selectedId1 = parseInt(event.target.value, 10);
        // getstoresApiData(`/report/audit_cycle/${selectedId1}/audit_store`);
    };

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

    const [openDropdown, setOpenDropdown] = useState(null); // For parent dropdown
    const [openNestedDropdowns, setOpenNestedDropdowns] = useState([]);

    const toggleNestedDropdown = (item) => {
        setOpenNestedDropdowns((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };
    const toggleDropdown = (item) => {
        setOpenDropdown((prev) => (prev === item ? null : item));
    };

    const downloadTableAsExcelObs = () => {
        const table = document.getElementById("table-to-export");

        const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

        // Create a binary string from the workbook
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

        // Create a buffer for the binary string
        const s2ab = (s) => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
            return buf;
        };

        // Create a download link and trigger it
        const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "table-report.xlsx"; // Set the file name
        link.click();
    };


    return (
        <div className='px-4'>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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

            <div className="select my-2 gap-3 d-flex">
                <p className='my-2'>Questionnaire Type : </p>
                <select onChange={handleSelectChange}>
                    {queTypesData?.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {/* <select onChange={handleSelectChange1}>
                        {detailsData?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select> */}
            </div>

            <p>Audit Cycle : </p>
            <div className="searchStore d-flex justify-content-between">
                <div className="searchIn d-flex align-items-center">
                    {/* <div className="inputSearch p-2 gap-2 d-flex justify-content-between align-items-center">
                        <div className='d-flex w-75'>
                            <i className="bi bi-search mx-2"></i>
                            <input className="storeSearch" placeholder="Search store" />
                        </div>
                        <div className='d-flex align-items-center'>
                            <img src={textImg} alt="img" />
                        </div>
                    </div> */}

                    <div className="audit-cycle-inp">
                        <div className="dropdownNes">
                            <select onChange={handleSelectChange1}>
                                {detailsData?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="filterParent d-flex align-items-center gap-3" >
                            <div onClick={() => toggleDropdown('filter')} className="filter gap-2 d-flex justify-content-center align-items-center">
                                <p className="filterText my-1">Filter</p>
                                <div className="filterIcon">
                                    <i className="bi bi-filter"></i>
                                </div>
                            </div>

                            {openNestedDropdowns.includes('code') && (
                                <div className="dropdownNes dropdownNes-storeCode">
                                    <input type='text' placeholder='Store Code' />
                                </div>
                            )}
                            {openNestedDropdowns.includes('city') && (
                                <div className="dropdownNes">
                                    <select name="City" defaultValue="">
                                        <option value="" disabled>
                                            Select a City
                                        </option>
                                        <option value="mp">Madhya Pradesh</option>
                                        <option value="gujarat">Gujarat</option>
                                        <option value="rajasthan">Rajasthan</option>
                                    </select>
                                </div>
                            )}
                            {openNestedDropdowns.includes('percentage') && (
                                <div className="dropdownNes df gap-3">
                                    <p className='my-2'>Percentage</p>
                                    <div className='per-inputDiv'>
                                        <input type='text' />
                                    </div>
                                    <p className='my-2'>To</p>
                                    <div className='per-inputDiv'>
                                        <input type='text' />
                                    </div>

                                </div>
                            )}
                        </div>
                        {openDropdown === 'filter' && (
                            <div>
                                <ul className={` dropdown-menu shadow-lg d-grid gap-1 p-2 rounded-3 mx-0 w-220px`}>
                                    <li>
                                        <div className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => toggleNestedDropdown('code')}>
                                            <p className="my-2">Store Code</p>
                                            <i className={`bi ${openNestedDropdowns.includes('code') ? 'bi-dash' : 'bi-plus'}`}></i>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => toggleNestedDropdown('city')}
                                        >
                                            <p className="my-2">City</p>
                                            <i className={`bi ${openNestedDropdowns.includes('city') ? 'bi-dash' : 'bi-plus'}`}></i>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => {
                                                toggleNestedDropdown('percentage');
                                            }}
                                        >
                                            <p className="my-2">Percentage</p>
                                            <i onClick={() => {

                                            }} className={`bi ${openNestedDropdowns.includes('percentage') ? 'bi-dash' : 'bi-plus'}`}></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className='df gap-3'>
                    <div onClick={() => {
                        setOpenNestedDropdowns([]);
                        setOpenDropdown(null);
                    }} className="clearFilter d-flex align-items-center">
                        <p className="my-1">Clear Filter</p>
                    </div>

                    <div onClick={downloadTableAsExcelObs} className="exportList d-flex justify-content-center align-items-center">
                    <p className="my-2">Export List</p>
                    <img src={downImg} alt="img" />
                    </div>
                </div>

            </div>
            <div className="perf-lower my-3">
                <p className='text-start'>Top Score Performer Stores</p>

                <div className="table-bordered table-responsive">
                    <table id="table-to-export">
                        <thead>
                            <tr>
                                <th className='SNO'>S no.</th>
                                <th className="audit" style={{ minWidth: "270px" }}>Audit</th>
                                <th style={{ minWidth: "90px" }}>Max Marks</th>
                                <th style={{ width: "11vw" }}>
                                    Customer Arrival and Staff Gromming Analysis
                                </th>
                                <th style={{ width: "11vw" }}>
                                    Interaction with Staff
                                </th>
                                <th style={{ width: "11vw" }}>
                                    Customer Arrival and Staff Gromming Analysis
                                </th>
                                <th style={{ width: "11vw" }}>
                                    Interaction with Staff
                                </th>
                                <th style={{ width: "11vw" }}>
                                    Customer Arrival and Staff Gromming Analysis
                                </th>
                                <th style={{ width: "11vw" }}>
                                    Interaction with Staff</th>
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
