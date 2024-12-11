import React, { useState, useEffect } from 'react';
import downImg from '../Images/vertical_align_bottom.png'
import textImg from '../Images/Text.png'
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import '../CSS/ActionTrack.css'
import { useFetchActionReport } from '../CustomHooks/ActionTrackHook'
import axios from "axios";
import { useFetchQueTypes, useFetchAudCycles } from '../CustomHooks/UseFetchUrl'
import { Link } from 'react-router-dom';

const ActionTrack = () => {

    const { data: queTypesData, isLoading: queTypesLoading, error: queTypesError } = useFetchQueTypes('/questionnaire_types_for_dashboard');
    const { data: cyclesData, isLoading: cyclesLoading, error: cyclesError } = useFetchAudCycles('/audit_cycle_for_dashboard');

    const { data: actionRepData, isLoading: actionRepLoading, error: actionRepError, getApiData: getactionRepApiData } = useFetchActionReport();
    const [tabData, setTabData] = useState([]);

    useEffect(() => {
        if (actionRepData) {
            setTabData(actionRepData);
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
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Filtered Data Export");
    
        const titleRow = worksheet.addRow(["Filtered Data Export"]);
        titleRow.getCell(1).font = { bold: true, size: 20, color: { argb: "FF353E4C" } }; 
        titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
        worksheet.mergeCells(1, 1, 1, 8); 
        worksheet.getRow(1).height = 30;
   
        const headerRow = worksheet.addRow([
            "S No.",
            "Report ID",
            "Person Responsible",
            "Target Date",
            "Store Details",
            "Created By",
            "Action Plan Description",
            "Status"
        ]);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, size: 12, name: "Roboto", color: { argb: "FF353E4C" } }; 
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFF2F2F2" }, 
            };
            cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true }; 
            cell.border = {
                top: { style: "thin", color: { argb: "FFCCCCCC" } },
                left: { style: "thin", color: { argb: "FFCCCCCC" } },
                bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
                right: { style: "thin", color: { argb: "FFCCCCCC" } },
            };
        });
        worksheet.getRow(2).height = 30;
    
        filteredData?.forEach((data, index) => {
            const rowData = [
                index + 1, 
                data.id,
                data.person_responsible,
                data.target_date, 
                data.store_details,
                data.created_by,
                data.action_plan_description, 
                data.status === "TAKEN" ? "Action Taken" : "Action Pending",
            ];
            const newRow = worksheet.addRow(rowData);
            newRow.eachCell((cell) => {
                cell.font = { size: 12, name: "Lato", color: { argb: "FF000000" } }; 
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFFFF" }, 
                };
                cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
                cell.border = {
                    top: { style: "thin", color: { argb: "FFCCCCCC" } },
                    left: { style: "thin", color: { argb: "FFCCCCCC" } },
                    bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
                    right: { style: "thin", color: { argb: "FFCCCCCC" } },
                };
            });
            worksheet.getRow(newRow.number).height = 25;
        });
    
        worksheet.columns = [
            { width: 20 }, 
            { width: 20 }, 
            { width: 35 }, 
            { width: 30 }, 
            { width: 40 }, 
            { width: 30 }, 
            { width: 50 }, 
            { width: 30 },
        ];
    
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(blob, "Filtered_Data_Export.xlsx");
        });
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
        setSelectedOption1(event.target.value, 10);
        getactionRepApiData(`audit_cycle/${selectedId1}/action_reports`);
    };

    const handleMarkAsCompleted = async (id) => {
        try {
            const token = localStorage.getItem("authToken");
            const url = `http://localhost:8000/client/action_report/${id}/change_status`;

            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.status === 200) {
                const updatedData = tabData.map((item) =>
                    item.id === id ? { ...item, status: "TAKEN" } : item
                );
                setTabData(updatedData);
            }
            getactionRepApiData(`audit_cycle/${cycleId}/action_reports`);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredData = tabData.filter((item) => {
        if (statusFilter === 'ALL') return true; 
        return item.status === statusFilter; 
    });

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
                                                setStatusFilter('ALL');
                                                setOpenDropdown(false);
                                            }}>
                                            <p className="my-2">All</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => {
                                                setStatusFilter('PENDING');
                                                setOpenDropdown(false);
                                            }}>
                                            <p className="my-2">Pending</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => {
                                                setStatusFilter('TAKEN');
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
                    <div onClick={() => { setStatusFilter('ALL'); }} className="clearFilter d-flex align-items-center">
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
                            {filteredData.map((row, index) => (
                                <tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td>{row.id}</td>
                                    <td>{row.person_responsible}</td>
                                    <td>{row.target_date}</td>
                                    <td>{row.store_details}</td>
                                    <td>{row.created_by}</td>
                                    <td>{row.action_plan_description}</td>
                                    <td>
                                        <div className="pendingTd d-flex justify-content-center align-items-center">
                                            <div
                                                className={`status ${row.status === "TAKEN" ? "taken" : "pending"
                                                    } d-flex align-items-center justify-content-center`}
                                                style={{
                                                    backgroundColor: row.status === "TAKEN" ? "#E9FFEF" : "#FFF2DD",
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
                                                    {row.status === "TAKEN" ? "Action Taken" : "Action Pending"}
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
                                                    <Link
                                                        to={{
                                                            pathname: "/auditReport",
                                                        }}
                                                        state={{ auditStoreId: row.audit_store_id }}
                                                        className="reportBtn"
                                                    >
                                                        <button className="reportBtn">Report</button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <Link
                                                    to={{
                                                        pathname: "/auditReport",
                                                    }}
                                                    state={{ auditStoreId: row.audit_store_id }}
                                                    className="reportBt"
                                                >
                                                    <button className="reportBt">Report</button>
                                                </Link>
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
