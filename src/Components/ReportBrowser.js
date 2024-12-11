import React, { useState, useEffect, useContext } from 'react';
import '../CSS/ReportBrowser.css'
import * as XLSX from "xlsx";
import downImg from '../Images/vertical_align_bottom.png'
import textImg from '../Images/Text.png'
import actionImg from '../Images/bottom_right_click.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useFetchQueTypes, useFetchAudCycles } from '../CustomHooks/UseFetchUrl'
import { useFetchAuditstores, useFetchReportAttributes } from '../CustomHooks/ReportHook'
import { Link } from 'react-router-dom';
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import SelectContext from '../Context/SelectContext'

const ReportBrowser = () => {

    const context = useContext(SelectContext);
    const { selectedOption, setSelectedOption, selectedOption1, setSelectedOption1, selectedQueId, setSelectedQueId, flag, setFlag } = context;

    const { data: queTypesData, isLoading: queTypesLoading, error: queTypesError } = useFetchQueTypes('/questionnaire_types_for_dashboard');
    const { data: cyclesData, isLoading: cyclesLoading, error: cyclesError } = useFetchAudCycles('/audit_cycle_for_dashboard');

    const { data: storesData, isLoading: storesLoading, error: storesError, getApiData: getstoresApiData } = useFetchAuditstores();
    const { data: reportAttData, isLoading: reportAttLoading, error: reportAttError, getApiData: getreportAttApiData } = useFetchReportAttributes();

    const queId = queTypesData?.[0]?.id;
    const [cycleId, setCycleId] = useState(null);

    const [detailsData, setDetailsData] = useState([]);

    useEffect(() => {
        if (selectedQueId && cycleId) {
            getstoresApiData(`/report/audit_cycle/${cycleId}/audit_store`);
            getreportAttApiData(`/audit_cycle/${cycleId}/report_attribute`);
            console.log("CYCLE ID : ", cycleId);
        }
    }, [cycleId]);

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
        if (queId && flag) {
            setSelectedQueId(queId);
            setFlag(false);
        }
    }, [queId]);

    const [value] = useState(new Date());
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openNestedDropdowns, setOpenNestedDropdowns] = useState([]);
    const [calenderOpen1, setCalenderOpen1] = useState(false);
    const [calenderOpen2, setCalenderOpen2] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const toggleNestedDropdown = (item) => {
        setOpenNestedDropdowns((prev) => {
            if (prev.includes(item)) {
                if (item === 'state') setSelectedState(null);
                if (item === 'city') setSelectedCity(null);
                if (item === 'startDate') setStartDate(null);
                if (item === 'endDate') setEndDate(null);
                return prev.filter((i) => i !== item);
            } else {
                return [...prev, item];
            }
        });
    };

    const toggleDropdown = (item) => {
        setOpenDropdown((prev) => {
            if (prev === item) {
                setSelectedState(null);
                setSelectedCity(null);
                setStartDate(null);
                setEndDate(null);
            }
            return prev === item ? null : item;
        });
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const downloadTableAsExcelObs = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reports");

        const titleRow = worksheet.addRow(["Reports"]);
        titleRow.getCell(1).font = { bold: true, size: 20, color: { argb: "FF353E4C" } };
        titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
        worksheet.mergeCells(1, 1, 1, 5);
        worksheet.getRow(1).height = 50;

        const headers = ["S No.", "Store Code", "Date", "Total Marks"];
        if (storesData[0]?.sections) {
            storesData[0].sections.forEach((section) => {
                headers.push(section.section);
            });
        }
        headers.push("Report");

        const headerRow = worksheet.addRow(headers);
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
        worksheet.getRow(2).height = 40;

        finalFilteredStores.forEach((row, rowIndex) => {
            const rowData = [
                rowIndex + 1,
                row.store_code || "N/A",
                row.audit_date,
                `${row.total_score.percentage}%`,
            ];

            row.sections.forEach((section) => {
                rowData.push(section.percentage === null ? "null" : `${section.percentage}%`);
            });

            rowData.push("Report");

            const newRow = worksheet.addRow(rowData);
            newRow.eachCell((cell, colIndex) => {
                cell.font = { size: 12, name: "Lato", color: { argb: "FF000000" } };
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFFF" } };
                cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
                cell.border = {
                    top: { style: "thin", color: { argb: "FFCCCCCC" } },
                    left: { style: "thin", color: { argb: "FFCCCCCC" } },
                    bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
                    right: { style: "thin", color: { argb: "FFCCCCCC" } },
                };
            });

            worksheet.getRow(newRow.number).height = 30;
        });

        worksheet.columns = [
            { width: 20 },
            { width: 40 },
            { width: 40 },
            { width: 30 },
            ...finalFilteredStores[0]?.sections.map(() => ({ width: 40 })),
            { width: 40 },
        ];

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, "Audit_Summary_Report.xlsx");
        });


    };

    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedQueId(selectedId);
        setSelectedOption(event.target.value);
    };

    const handleSelectChange1 = (event) => {
        const selectedId1 = parseInt(event.target.value, 10);
        setSelectedOption1(event.target.value);
        getstoresApiData(`/report/audit_cycle/${selectedId1}/audit_store`);
    };

    const states = [...new Set(storesData.map((store) => store.state))];
    const allCities = [...new Set(storesData.map((store) => store.city_name))];
    const citiesByState = storesData.reduce((acc, store) => {
        if (!acc[store.state]) acc[store.state] = [];
        if (!acc[store.state].includes(store.city_name)) acc[store.state].push(store.city_name);
        return acc;
    }, {});

    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [filteredStores, setFilteredStores] = useState([]);

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedCity("");
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    useEffect(() => {
        if (filteredStores.length === 0) {
            setStartDate(null);
            setEndDate(null);
            return;
        }
    
        const filteredDates = filteredStores.map((store) => new Date(store.audit_date));
        setStartDate(new Date(Math.min(...filteredDates)));
        setEndDate(new Date(Math.max(...filteredDates)));
    }, [filteredStores]);

    const handleClearFilters = () => {
        setSelectedState(null);
        setSelectedCity(null);
        setStartDate(null);
        setEndDate(null);
        setSelectedOption1(null);
        setOpenNestedDropdowns([]);
        setOpenDropdown(null);
        getstoresApiData('/report/audit_cycle/all/audit_store');
    };

    useEffect(() => {
        const updatedFilteredStores = storesData.filter((store) => {
            const isStateMatch = selectedState ? store.state === selectedState : true;
            const isCityMatch = selectedCity ? store.city_name === selectedCity : true;
            return isStateMatch && isCityMatch;
        });

        setFilteredStores(updatedFilteredStores);
    }, [storesData, selectedState, selectedCity]);


    const finalFilteredStores = filteredStores.filter((store) => {
        const auditDate = new Date(store.audit_date);
        return auditDate >= startDate && auditDate <= endDate;
    });

    

    return (
        <div>
            <div className="hero-section my-1 px-4">
                <div className="head d-flex justify-content-between align-items-center">
                    <div className="repoHead d-flex justify-content-center align-items-center">
                        <div className="reportPara">
                            <p className="my-2">Report Browser</p>
                        </div>
                    </div>
                    <div onClick={downloadTableAsExcelObs} className="exportList d-flex justify-content-center align-items-center">
                        <p className="my-2">Export List</p>
                        <img src={downImg} alt="img" />
                    </div>
                </div>

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

                <p>Audit Cycle : </p>
                <div className="searchStore d-flex justify-content-between">
                    <div className="searchIn d-flex align-items-center">
                        {/* <div className={`${styles.inputSearch} p-2 gap-2 d-flex justify-content-between align-items-center`}>
                            <div className="d-flex w-75">
                                <i className="bi bi-search mx-2"></i>
                                <input className={styles.storeSearch} placeholder="Search store" />
                            </div>
                            <div className="d-flex align-items-center">
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
                        <div>
                            <div className="filterParent d-flex align-items-center gap-3">
                                <div onClick={() => toggleDropdown('filter')} className="filter gap-2 d-flex justify-content-center align-items-center">
                                    <p className="filterText my-1">Filter</p>
                                    <div className="filterIcon">
                                        <i className="bi bi-filter"></i>
                                    </div>
                                </div>

                                {openNestedDropdowns.includes('state') && (
                                    <div className="dropdownNes">
                                        <select name="state" value={selectedState} onChange={handleStateChange}>
                                            <option value="">Select a state</option>
                                            {states.map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {openNestedDropdowns.includes('city') && (
                                    <div className="dropdownNes">
                                        <select name="City" value={selectedCity} onChange={handleCityChange}>
                                            <option value="">Select a city</option>
                                            {(!selectedState
                                                ? allCities
                                                : citiesByState[selectedState] || []
                                            ).map((city) => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {openNestedDropdowns.includes('startDate') && (
                                    <div className="dropdownNes">
                                        <div onClick={() => {
                                            setCalenderOpen1((prev) => !prev);
                                            setOpenDropdown((prev) => !prev);
                                        }}
                                            className="startDateP df"
                                        >
                                            <p className='my-1'>{startDate ? formatDate(startDate) : "Select a start date"}</p>
                                        </div>

                                        {calenderOpen1 && (
                                            <div className="calendarContainer">
                                                <Calendar
                                                    value={startDate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        setCalenderOpen1(false);
                                                    }}
                                                    tileDisabled={({ date }) =>
                                                        startDate && (date < startDate || date > endDate)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                                {openNestedDropdowns.includes('endDate') && (
                                    <div className="dropdownNes">
                                        <div onClick={() => {
                                            setCalenderOpen2((prev) => !prev);
                                            setOpenDropdown((prev) => !prev);
                                        }}
                                            className="startDateP df"
                                        >
                                            <p className='my-1'>{endDate ? formatDate(endDate) : "Select a end date"}</p>
                                        </div>

                                        {calenderOpen2 && (
                                            <div className="calendarContainer">
                                                <Calendar
                                                    value={endDate}
                                                    onChange={(date) => {
                                                        setEndDate(date);
                                                        setCalenderOpen2(false);
                                                    }}
                                                    tileDisabled={({ date }) =>
                                                        startDate && (date < startDate || date > endDate)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {openDropdown === 'filter' && (
                                <div>
                                    <ul className="dropdown-menu shadow-lg d-grid gap-1 p-2 rounded-3 mx-0 w-220px">
                                        <li>
                                            <div className="dropList d-flex justify-content-between align-items-center"
                                                onClick={() => toggleNestedDropdown('state')}>
                                                <p className="my-2">State</p>
                                                <i className={`bi ${openNestedDropdowns.includes('state') ? 'bi-dash' : 'bi-plus'}`}></i>
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
                                                    toggleNestedDropdown('startDate');
                                                }}
                                            >
                                                <p className="my-2">Start Date</p>
                                                <i onClick={() => {

                                                }} className={`bi ${openNestedDropdowns.includes('startDate') ? 'bi-dash' : 'bi-plus'}`}></i>
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className="dropList d-flex justify-content-between align-items-center"
                                                onClick={() => {
                                                    toggleNestedDropdown('endDate');
                                                }}
                                            >
                                                <p className="my-2">End Date</p>
                                                <i onClick={() => {

                                                }} className={`bi ${openNestedDropdowns.includes('endDate') ? 'bi-dash' : 'bi-plus'}`}></i>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div onClick={handleClearFilters} className="clearFilter d-flex align-items-center">
                        <p className="my-1">Clear Filter</p>
                    </div>

                </div>
            </div>

            <div className="dashTable my-4 df table-responsive">
                <table style={{ width: "95%" }} id="table-to-export">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "#f2f2f2", width: "5vw" }}>S no.</th>
                            <th>Store Code</th>
                            <th style={{ width: "9vw" }}>Date</th>
                            <th>Total Marks</th>
                            {storesData[0]?.sections.map((section, index) => (
                                <th key={index} style={{ width: "11vw" }}>
                                    <p className="m-1">{section.section}</p>
                                </th>
                            ))}
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {finalFilteredStores.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td style={{ backgroundColor: "#f2f2f2", width: "5vw" }}>{rowIndex + 1}</td>
                                <td>{row.store_code || "N/A"}</td>
                                <td>{row.audit_date}</td>
                                <td>
                                    <div className="marksContainer">{row.total_score.percentage}%</div>
                                </td>
                                {row.sections.map((section, sectionIndex) => (
                                    <td key={sectionIndex}>
                                        <div className="progressBarContainer">
                                            <span>{section.percentage === null ? "null" : section.percentage + "%"}</span>
                                            <div
                                                className={`dash1 ${section.percentage === null ? "d-none" : ""}`}
                                                style={{
                                                    background: `linear-gradient(to right, #8DC63F ${parseInt(section.percentage)}%, #e6e6e6 ${100 - parseInt(section.percentage)}%)`,
                                                }}
                                            ></div>
                                        </div>
                                    </td>
                                ))}
                                <td>
                                    <Link to={`/auditReport`} state={{ auditStoreId: row.audit_store_id }} className="reportBtn">
                                        <button className="reportBtn">Report</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportBrowser;
