import React, { useState, useEffect } from 'react';
import downImg from '../Images/vertical_align_bottom.png'
import textImg from '../Images/Text.png'
import * as XLSX from "xlsx";
import '../CSS/ActionTrack.css'
import { useFetchActionReport } from '../CustomHooks/ActionTrackHook'
import axios from "axios";
import { useFetchQueTypes, useFetchAudCycles } from '../CustomHooks/UseFetchUrl'

const ActionTrack = () => {

    const { data: queTypesData, isLoading: queTypesLoading, error: queTypesError } = useFetchQueTypes('/questionnaire_types_for_dashboard');
    const { data: cyclesData, isLoading: cyclesLoading, error: cyclesError } = useFetchAudCycles('/audit_cycle_for_dashboard');

    const { data: actionRepData, isLoading: actionRepLoading, error: actionRepError, getApiData: getactionRepApiData } = useFetchActionReport();
    const [tabData, setTabData] = useState([]);

    useEffect(() => {
        if (actionRepData) {
            setTabData(actionRepData); // Update tabData when actionRepData changes
        }
    }, [actionRepData]);

    const queId = queTypesData?.[0]?.id;
    const [cycleId, setCycleId] = useState(null);
    const [selectedQueId, setSelectedQueId] = useState(null);
    const [detailsData, setDetailsData] = useState([]);

    useEffect(() => {
        if (selectedQueId && cycleId) {
            getactionRepApiData(`audit_cycle/${cycleId}/action_reports`);
        }
    }, [cycleId, selectedQueId]);

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

    const [openDropdown, setOpenDropdown] = useState(false);
    const [openNestedDropdowns, setOpenNestedDropdowns] = useState(null);

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

    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedQueId(selectedId);
        setSelectedOption(event.target.value);
    };

    const [selectedOption1, setSelectedOption1] = useState('');
    const handleSelectChange1 = (event) => {
        const selectedId1 = parseInt(event.target.value, 10);
        setSelectedOption1(event.target.value,10);
        getactionRepApiData(`audit_cycle/${selectedId1}/action_reports`);
    };

    const handleMarkAsCompleted = async (id) => {
        try {
            const token = localStorage.getItem("authToken");
            const url = `http://localhost:8080/client/action_report/${id}/change_status`;

            const response = await axios.get(url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.status === 200) {
                // alert("Status updated successfully!");
                // // Update the status in the table
                const updatedData = tabData.map((item) =>
                    item.id === id ? { ...item, status: "TAKEN" } : item
                );
                setTabData(updatedData);
            }
            getactionRepApiData(`audit_cycle/${cycleId}/action_reports`);
        } catch (error) {
            console.error("Error updating status:", error);
            // alert("Failed to update the status. Please try again.");
        }
    };

    return (
        <div>
            {openNestedDropdowns && (
                <div className="d-none">
                    Hii
                </div>
            )}
            <div className="heroSection px-4 my-4">
                <div className="repoHead d-flex align-items-center">
                    <div className="reportPara">
                        <p className="my-2">Action Track</p>
                    </div>
                </div>
                <div className="head d-flex justify-content-between align-items-center">
                    <div className="select my-2 gap-3 d-flex">
                        <p className='my-2'>Questionnaire Type : </p>
                        <select value={selectedOption} onChange={handleSelectChange}>
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
                    <div onClick={downloadTableAsExcelObs} className="exportList d-flex justify-content-center align-items-center">
                        <p className="my-2">Export List</p>
                        <img src={downImg} alt="img" />
                    </div>
                </div>

                <p>Audit Cycle : </p>
                <div className="searchStore d-flex justify-content-between">
                    <div className="searchIn d-flex">
                        {/* <div className={`${styles.inputSearch} p-2 gap-2 d-flex justify-content-between align-items-center`}>
                            <div className='d-flex w-75'>
                                <i className="bi bi-search mx-2"></i>
                                <input className={styles.storeSearch} placeholder="Search store" />
                            </div>
                            <div className='d-flex align-items-center'>
                                <img src={textImg} alt="img" />
                            </div>
                        </div> */}
                        <div className="audit-cycle-inp">

                            <div className="dropdownNes">
                                <select value={selectedOption1} onChange={handleSelectChange1}>
                                    {detailsData?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div onClick={() => setOpenDropdown(!openDropdown)} className="filter gap-2 d-flex justify-content-center align-items-center">
                            <p className="filterText my-1">Filter</p>
                            <div className="filterIcon">
                                <i className="bi bi-filter"></i>
                            </div>
                        </div>
                        {openDropdown && (
                            <div>
                                <ul className="dropdown-menu shadow-lg d-grid gap-1 p-2 rounded-3 mx-0 w-220px">
                                    <li>
                                        <div className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => {
                                                setOpenNestedDropdowns('All');
                                                setOpenDropdown(false);
                                            }}>
                                            <p className="my-2">All</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => {
                                                setOpenNestedDropdowns('Pending');
                                                setOpenDropdown(false);
                                            }}>
                                            <p className="my-2">Pending</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => {
                                                setOpenNestedDropdowns('Action Taken');
                                                setOpenDropdown(false);
                                            }}
                                        >
                                            <p className="my-2">Action Taken</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div onClick={() => { setOpenNestedDropdowns(null) }} className="clearFilter d-flex align-items-center">
                        <p className="my-1">Clear Filter</p>
                    </div>
                </div>

                <div className="dashTable my-4 table-responsive">
                    <table id="table-to-export">
                        <thead>
                            <tr>
                                <th style={{ width: "56px" }}>S no.</th>
                                <th style={{ width: "86px" }}>Report ID</th>
                                <th style={{ width: "185px" }}>Person Responsible</th>
                                <th style={{ width: "119px" }}>Target Date</th>
                                <th style={{ width: "131px" }}>Store</th>
                                <th style={{ width: "84px" }}>Created By</th>
                                <th style={{ width: "267px" }}>Action Plan</th>
                                <th style={{ width: "130px" }}>Status</th>
                                <th style={{ width: "286px" }}>Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabData.map((row, index) => (
                                <tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td>{row.id}</td>
                                    <td>{row.person_responsible}</td>
                                    <td>{row.target_date}</td>
                                    <td>{row.store_details}</td>
                                    <td>{row.created_by}</td>
                                    <td>{row.action_plan_description}</td>
                                    <td>
                                        <div
                                            className="pendingTd d-flex justify-content-center align-items-center"
                                        >
                                            <div
                                                className={`status ${row.status === "TAKEN" ? "taken" : "pending"} d-flex align-items-center justify-content-center`}
                                                style={{
                                                    backgroundColor:
                                                        row.status === "TAKEN" ? "#E9FFEF" : "#FFF2DD",
                                                    borderRadius: "10px",
                                                    width: "135px",
                                                    height: "30px",
                                                }}
                                            >
                                                <i
                                                    style={{
                                                        fontSize: "2.2rem",
                                                        margin: "0",
                                                        color: row.status === "TAKEN" ? "#409261" : "#D98634",
                                                    }}
                                                    className="bi bi-dot"
                                                ></i>
                                                <p
                                                    className="my-2"
                                                    style={{
                                                        fontWeight: "400",
                                                        fontSize: "13px",
                                                        lineHeight: "14px",
                                                        color: row.status === "TAKEN" ? "#409261" : "#D98634",
                                                    }}
                                                >
                                                    {row.status === "TAKEN"
                                                        ? "Action Taken"
                                                        : "Action Pending"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="reportAction">
                                            {row.status === "PENDING" ? (
                                                <div className="penComp d-flex gap-2 align-items-center justify-content-center">
                                                    <button
                                                        className="markBtn"
                                                        onClick={() => handleMarkAsCompleted(row.id)} 
                                                    >
                                                        Mark as Completed
                                                    </button>
                                                    <button className="reportBtn">Report</button>
                                                </div>
                                            ) : (
                                                <button className="reportBt">Report</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    );
};

export default ActionTrack;
