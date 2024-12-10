import React, { useState, useRef, useEffect } from 'react'
import '../CSS/Dashboard.css'
import DashedProgressBar from '../Components/ChartsBars/DashedBarProgress'
import AuditCalendar from '../Components/AuditCalender'
import BarChart from './ChartsBars/BarChart'
import StoreWiseBarChart from './ChartsBars/StoreWiseBarChart'
import OverallPerformance from './ChartsBars/OverallPerformance'
import downImg from '../Images/vertical_align_bottom.png'
import html2canvas from "html2canvas";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useFetchAudScores, useFetchConfig, useFetchQueTypes, useFetchTimeSeries, useFetchAudCycles, useFetchQueSurvey, useFetchCityTrends, useFetchImprove, useFetchStoreTrends } from '../CustomHooks/UseFetchUrl'
import { useFetchUpAudits } from '../CustomHooks/UpComingHook'
import ShimmerSimpGallery from './Shimmers/ShimmerSimpGallery'

const Dashboard = () => {

    const { data: queTypesData, isLoading: queTypesLoading, error: queTypesError } = useFetchQueTypes('/questionnaire_types_for_dashboard');
    const { data: cyclesData, isLoading: cyclesLoading, error: cyclesError } = useFetchAudCycles('/audit_cycle_for_dashboard');
    const { data: upAudsData, isLoading: upLoading, error: upError } = useFetchUpAudits('/audit_store/upcoming');
    const { data: configData, isLoading: configLoading, error: configError } = useFetchConfig('/config');

    const queId = queTypesData?.[0]?.id;
    const [cycleId, setCycleId] = useState(null);
    const [selectedQueId, setSelectedQueId] = useState(null);
    const [detailsData, setDetailsData] = useState([]);

    const { data: scoresData, isLoading: scoresLoading, error: scoresError, getApiData: getScoresApiData } = useFetchAudScores();
    const { data: impData, isLoading: impLoading, error: impError, getApiData: getImpApiData } = useFetchImprove();
    const { data: stData, isLoading: stLoading, error: stError, getApiData: stImpApiData } = useFetchStoreTrends();
    const { data: cityData, isLoading: cityLoading, error: cityError, getApiData: cityImpApiData } = useFetchCityTrends();
    const { data: qeData, isLoading: qeLoading, error: qeError, getApiData: qeImpApiData } = useFetchQueSurvey();
    const { data: tsData, isLoading: tsLoading, error: tsError, getApiData: tsImpApiData } = useFetchTimeSeries();

    // const isMainLoading = queTypesLoading || cyclesLoading || upLoading || configLoading || impLoading || stLoading || cityLoading || qeLoading || tsLoading;

    const isMainLoading = false;    
    useEffect(() => {
        if (queId) {
            setSelectedQueId(queId);
        }
    }, [queId]);

    useEffect(() => {
        if (impData) {
            console.log("IMPDATA  : ", impData);
        }
    }, [impData])

    useEffect(() => {
        if (selectedQueId && cycleId) {
            getScoresApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle_scores`);
            getImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${cycleId}/improvable_questions`);
            stImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${cycleId}/store_trends`);
            cityImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${cycleId}/city_trends`);
            qeImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${cycleId}/questionnaire_survey`);
            tsImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${cycleId}/time_series`);
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


    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedQueId(selectedId);
    };

    const handleSelectChange1 = (event) => {
        const selectedId1 = parseInt(event.target.value, 10);
        tsImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${selectedId1}/time_series`);
        getImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${selectedId1}/improvable_questions`);
        cityImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${selectedId1}/city_trends`);
        qeImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${selectedId1}/questionnaire_survey`);
    };

    const getProgressColor = (progress) => {
        if (progress < 30) return "#C9727B";
        if (progress >= 30 && progress < 60) return "#C6B83F";
        if (progress >= 60 && progress < 80) return "#B4DA1F";
        return "#8DC63F";
    };

    const toggleDropdown = () => {
        setIsSectionDropOpen((prev) => !prev);
    };

    const toggleNestedDropdown = (item) => {
        setOpenNestedDropdowns((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    const downloadBarChartAsPNG = (chartRef) => {
        html2canvas(chartRef.current).then((canvas) => {
            const imageUrl = canvas.toDataURL("image/png");

            // Trigger the download
            const link = document.createElement("a");
            link.href = imageUrl;
            link.setAttribute("download", "bar-chart.png");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up
        });
    };

    const downloadTableAsExcelObs = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("NPS June 2024 Improvable");

        // Title Row
        const titleRow = worksheet.addRow(["NPS June 2024 Improvable"]);
        titleRow.getCell(1).font = { bold: true, size: 20, color: { argb: "FF353E4C" } }; // Dark gray font
        titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" }; // Center alignment
        worksheet.mergeCells(1, 1, 1, 5); // Merge cells for title
        worksheet.getRow(1).height = 50;

        // Header Row
        const headerRow = worksheet.addRow(["S No.", "Section", "Questions", "Obtained Marks/Total Marks", "Marks Lost"]);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, size: 12, name: "Roboto", color: { argb: "FF353E4C" } }; // Dark gray font
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFF2F2F2" }, // Light gray background
            };
            cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true }; // Centered text
            cell.border = {
                top: { style: "thin", color: { argb: "FFCCCCCC" } },
                left: { style: "thin", color: { argb: "FFCCCCCC" } },
                bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
                right: { style: "thin", color: { argb: "FFCCCCCC" } },
            };
        });
        worksheet.getRow(2).height = 40; // Header row height

        // Table Data Rows
        impData?.forEach((data, index) => {
            const rowData = [
                index + 1, // S No.
                data.question_section, // Section
                data.question_txt, // Questions
                `${data.obtained_marks}/${data.total_marks}`, // Obtained Marks/Total Marks
                data.lost_marks, // Marks Lost
            ];
            const newRow = worksheet.addRow(rowData);
            newRow.eachCell((cell, colIndex) => {
                if (colIndex === 5) {
                    // For the "Marks Lost" column, set red background
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "D9534F" }, // Red background for marks lost
                    };
                    cell.font = { size: 12, bold: true, color: { argb: "FFFFFFFF" } }; // White bold text
                } else {
                    cell.font = { size: 12, name: "Lato", color: { argb: "FF000000" } }; // Black text for other columns
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FFFFFFFF" }, // White background
                    };
                }
                cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
                cell.border = {
                    top: { style: "thin", color: { argb: "FFCCCCCC" } },
                    left: { style: "thin", color: { argb: "FFCCCCCC" } },
                    bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
                    right: { style: "thin", color: { argb: "FFCCCCCC" } },
                };
            });
            worksheet.getRow(newRow.number).height = 30; // Row height
        });

        // Adjust Column Widths
        worksheet.columns = [
            { width: 20 }, // S No.
            { width: 50 }, // Section
            { width: 70 }, // Questions
            { width: 70 }, // Obtained Marks/Total Marks
            { width: 20 }, // Marks Lost
        ];

        // Download the Excel File
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, "NPS_June_2024_Improvable.xlsx");
        });
    };


    const downloadTableAsExcelQue = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Question Summary");

        // Add the title row
        const titleRow = worksheet.addRow(["Question Summary"]);
        titleRow.getCell(1).font = { bold: true, size: 20, color: { argb: "FF353E4C" } }; // Blue bold font
        titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" }; // Center alignment
        worksheet.mergeCells(1, 1, 1, 3); // Merge cells across the width of the table
        worksheet.getRow(1).height = 50;

        // Add the header row
        const headerRow = worksheet.addRow(["S No.", "Questions", "Marks Lost"]);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, size: 12, name: "Roboto", color: { argb: "FF353E4C" } }; // Dark gray font
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFF2F2F2" }, // Light gray background
            };
            cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true }; // Centered text
            cell.border = {
                top: { style: "thin", color: { argb: "FFCCCCCC" } },
                left: { style: "thin", color: { argb: "FFCCCCCC" } },
                bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
                right: { style: "thin", color: { argb: "FFCCCCCC" } },
            };
        });
        worksheet.getRow(2).height = 40;
        // Dynamically fetch data from the `qeData` array
        qeData
            .filter((item) => item.type === "question")
            .forEach((question, index) => {
                const marksLost = question.options_list
                    .map((option) => `${option.option_name}: ${option.percentage}%`)
                    .join(", "); // Combine options and percentages into a single string

                const row = worksheet.addRow([index + 1, question.question_txt, marksLost]);

                // Apply styling to each row
                row.eachCell((cell, colNumber) => {
                    cell.font = { size: 12 }; // Font size for data rows
                    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FFFFFFFF" }, // White background
                    };
                    cell.border = {
                        top: { style: "thin", color: { argb: "FFCCCCCC" } },
                        left: { style: "thin", color: { argb: "FFCCCCCC" } },
                        bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
                        right: { style: "thin", color: { argb: "FFCCCCCC" } },
                    };
                });
                worksheet.getRow(row.number).height = 40; // Set row height
            });

        // Adjust column widths
        worksheet.columns = [
            { width: 10 }, // S No.
            { width: 100 }, // Questions
            { width: 70 }, // Marks Lost
        ];

        // Trigger Excel download
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Question_Summary.xlsx";
            link.click();
        });
    };

    const renderBars = () => {
        if (scoresData.length === 0) {
            return <p>No data available for the selected type.</p>;
        }
        return scoresData.map((item, id) => (
            <div key={item.id} className="l1 col-sm-6 d-flex justify-content-center align-items-center">
                <DashedProgressBar color={getProgressColor(item.get_total_percentage)} progress={item.get_total_percentage} shadow={true} />
            </div>
        ));
    };

    const barChartRef = useRef(null);
    const barChartRef1 = useRef(null);
    const barChartRef2 = useRef(null);
    const [isSectionDropOpen, setIsSectionDropOpen] = useState(false);
    const [openNestedDropdowns, setOpenNestedDropdowns] = useState([]);
    const [checkedSections, setCheckedSections] = useState({});
    const [sectionData, setSectionData] = useState([]);

    useEffect(() => {
        if (tsData && tsData.section_master) {
            setCheckedSections(
                tsData.section_master.reduce((acc, section) => {
                    acc[section] = true;
                    return acc;
                }, {})
            );

            const data = tsData.section_master.map((section, index) => ({
                name: section,
                percentage: tsData.values[0][index]?.value || 0,
            }));
            setSectionData(data);
        }
    }, [tsData]);

    // Handle checkbox toggles
    const toggleCheckbox = (section) => {
        setCheckedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const [filteredData, setFilteredData] = useState(null);
    useEffect(() => {
        if (tsData && tsData.section_master) {
            const filteredData = {
                section_master: tsData.section_master.filter(
                    (section) => checkedSections[section]  // assuming section.id is a unique identifier
                ),
                values: [
                    tsData.values[0].filter((_, index) =>
                        checkedSections[tsData.section_master[index]]  // assuming section.id is a unique identifier
                    ),
                ],
            };

            setFilteredData(filteredData);  // Save the filtered data to the state
        }
    }, [tsData, checkedSections]);

    return (
        <div>
            {isMainLoading ? (<ShimmerSimpGallery />) :
                (<>
                    <div style={{ backgroundColor: "#FAFAFA" }} className="heroDashboard my-3">
                        <p className="dashHeading px-4 m-0">Dashboard</p>

                        <div style={{ backgroundColor: "white" }} className="dashFirst px-4 row d-flex">
                            <div className="firstLeft col-md-6">
                                <div className="firstHeading my-2 text-start">
                                    <p>Latest Audit Cycle Score</p>
                                </div>

                                <div className="auditCycle d-flex mt-3 flex-column">
                                    <select onChange={handleSelectChange}>
                                        {queTypesData?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="l1First">
                                    <div className="row">{renderBars()}</div>
                                </div>
                            </div>

                            <div className="firstRight col-md-6">
                                <div className="firstHeading mb-3 text-start">
                                    <p>Upcoming Audits</p>
                                </div>
                                <div className="divCalender">
                                    <AuditCalendar />
                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px" }} className="dashSecond px-4 pt-4 mt-3">
                            <div className="dashSecHead flex-wrap d-flex">
                                <div className="auditCycle d-flex flex-column">
                                    <p className="text-start">Audit Cycle</p>
                                    <select onChange={handleSelectChange1}>
                                        {detailsData?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='ms-auto'>
                                    <div className="auditCycleRight my-2 ms-auto gap-4 d-flex align-items-center">
                                        <div onClick={toggleDropdown} className="addSection d-flex gap-2 justify-content-center align-items-center">
                                            <p>Add Section</p>
                                            <i className="bi bi-plus-square"></i>
                                        </div>

                                        <div className="downIcon" onClick={() => downloadBarChartAsPNG(barChartRef)}>
                                            <img src={downImg} alt="img" />
                                        </div>
                                    </div>
                                    <div>

                                        {isSectionDropOpen && (
                                            <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                                {tsData.section_master.map((section, index) => (
                                                    <li key={index}>
                                                        <div style={{ cursor: "default" }} className="dropList d-flex justify-content-between align-items-center">
                                                            <p className="my-2">{section}</p>
                                                            <input type="checkbox" checked={checkedSections[section]} onChange={() => toggleCheckbox(section)} />
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}</div>

                                </div>
                            </div>

                            <div className="dashSecHero justify-content-center row d-flex">
                                <div ref={barChartRef} className="secHeroLeft col-sm-9">
                                    <BarChart filteredData={filteredData} />
                                </div>

                                <div className="secHeroSection mt-4 col-sm-3">
                                    <div className="secHead">
                                        <p>{tsData.title}</p>
                                    </div>
                                    {sectionData.map((section, index) => {
                                        const isFiltered = filteredData?.section_master.includes(section.name);
                                        return (
                                            <div key={index} className="section1" style={{ color: isFiltered ? "#003C5D" : "#9CA3AF"}}>
                                                <p className="perPara"
                                                    style={{
                                                        color: isFiltered ? "#003C5D" : "#9CA3AF",
                                                    }}
                                                >
                                                    {`${section.percentage}%`}
                                                </p>
                                                <p
                                                    className="secPara"
                                                    style={{
                                                        color: isFiltered ? "#003C5D" : "#9CA3AF",
                                                    }}
                                                >
                                                    {section.name}
                                                </p>
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: "white" }} className="dashThird mt-3 px-4 pt-4">
                            <div className="dashThirdHead flex-wrap d-flex">
                                <div className="improvement d-flex flex-column">
                                    <p className='text-start'>Improvement areas based on observation</p>
                                </div>
                                <div className="improvementRight ms-auto d-flex justify-content-center align-items-center">
                                    <div onClick={downloadTableAsExcelObs} className="downIcon">
                                        <img src={downImg} alt="img" />
                                    </div>
                                </div>
                            </div>

                            <div className="dashThirdHero my-3">
                                <table className='dth-table' id="table-to-export">
                                    <thead>
                                        <tr>
                                            <th>S no.</th>
                                            <th>Section</th>
                                            <th>Questions</th>
                                            <th>Obtained Marks/Total Marks</th>
                                            <th>Marks Lost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {impData.map((data, index) => (
                                            <tr key={data.question_id}>
                                                <td style={{backgroundColor : "#f2f2f2",width : "5vw"}}>{index + 1}</td> {/* Serial number */}
                                                <td>{data.question_section}</td> {/* Section */}
                                                <td>{data.question_txt}</td> {/* Question text */}
                                                <td>{`${data.obtained_marks}/${data.total_marks}`}</td> {/* Marks obtained and total */}
                                                <td>
                                                    <div className="tScore">{data.lost_marks}</div> {/* Marks lost */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>  
                        </div>

                        <div style={{ backgroundColor: "white" }} className="dashForth px-4 py-3 mt-3">
                            <div className="dashThirdHead my-3 flex-wrap d-flex">
                                <div className="improvement d-flex flex-column">
                                    <p className='text-start'>Improvement areas based on observation</p>
                                </div>
                                <div className="improvementRight ms-auto d-flex justify-content-center align-items-center">
                                    <div className="downIcon d-none">
                                        <img src={downImg} alt="img" />
                                    </div>
                                </div>
                            </div>

                            <div className="forthCharts row d-flex">
                                <div className="dashForthLeft col-md-6">
                                    <StoreWiseBarChart stData={stData} downloadBarChartAsPNG={() => downloadBarChartAsPNG(barChartRef1)}
                                        barChartRef={barChartRef1} />
                                </div>

                                <div className="dashForthLeft col-md-6">
                                    <OverallPerformance cityData={cityData} downloadBarChartAsPNG={() => downloadBarChartAsPNG(barChartRef2)}
                                        barChartRef={barChartRef2} />
                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: "white" }} className="dashFifth">
                            <div className="dashThirdHead mt-3 px-4 pt-4 flex-wrap d-flex">
                                <div className="improvement d-flex flex-column">
                                    <p className='text-start'>Question Summary</p>
                                </div>
                                <div className="improvementRight ms-auto d-flex justify-content-center align-items-center">
                                    <div onClick={downloadTableAsExcelQue} className="downIcon">
                                        <img src={downImg} alt="img" />
                                    </div>
                                </div>
                            </div>

                            <div className="fifthHero px-4 mt-3">
                                <div className="customerArr">
                                    <p>Customer Arrival and Staff Grooming Analysis</p>
                                </div>
                                <div className="fifthTable">
                                    <table id="table-to-export-que" style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>S no.</th>
                                                <th>Questions</th>
                                                <th>Marks Lost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {qeData
                                                .filter((item) => item.type === "question")
                                                .map((question, index) => (
                                                    <tr key={question.question_id}>
                                                        <td style={{backgroundColor : "#f2f2f2",width : "5vw"}}>{index + 1}</td>
                                                        <td className='text-start'>{question.question_txt}</td>
                                                        <td className="marksLost">
                                                            {question.options_list.map((option, optIndex) => (
                                                                <div key={optIndex} className="tdFirst d-flex align-items-center justify-content-between">
                                                                    <div className="tTf">{option.option_name}</div>
                                                                    <div className="tPer d-flex align-items-center justify-content-center"
                                                                    >
                                                                        {option.percentage}%
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>    
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}
        </div >
    )
}

export default Dashboard
