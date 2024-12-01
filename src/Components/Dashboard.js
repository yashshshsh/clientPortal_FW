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
import { useFetchAudScores, useFetchConfig, useFetchQueTypes, useFetchTimeSeries, useFetchAudCycles, useFetchQueSurvey, useFetchCityTrends, useFetchImprove, useFetchStoreTrends } from '../CustomHooks/UseFetchUrl'
import { useFetchUpAudits } from '../CustomHooks/UpComingHook'

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

    useEffect(() => {
        if (queId) {
            setSelectedQueId(queId);
        }
    }, [queId]);

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

    // const handleSelectChange2 = (event) => {
    //     const selectedId2 = parseInt(event.target.value, 10);
    //     getImpApiData(`dashboard/questionnaire_type/${selectedQueId}/audit_cycle/${selectedId2}/improvable_questions`);
    // };
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

        const titleRow = worksheet.addRow(["NPS June 2024 Improvable"]);
        titleRow.getCell(1).font = { bold: true, size: 20, color: { argb: "FF4F81BD" } }; // Blue bold font
        titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" }; // Center alignment
        worksheet.mergeCells(1, 1, 1, 5); // Merge cells across the width of the table
        worksheet.getRow(1).height = 30;

        // Add header row with custom styles
        const headerRow = worksheet.addRow(["S No.", "Section", "Questions", "Obtained Marks/Total Marks", "Marks Lost"]);

        headerRow.eachCell((cell) => {
            cell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } }; // White text
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF4F81BD" }, // Blue background
            };
            cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
        });

        worksheet.getRow(1).height = 50; // Set header row height

        // Add data rows
        const data = [
            [1, "Customer Arrival and Staff Grooming Analysis", "Was the in-store branding like wall branding, pillar branding, drop down headers, glass branding, category drop downs, etc. maintained well? 1/ 5 4", "1/5", 4],
            [2, "Customer Arrival and Staff Grooming Analysis", "Was the in-store branding...?", "1/5", 4],
        ];

        data.forEach((row, index) => {
            const newRow = worksheet.addRow(row);

            // Apply styles to each cell in the row
            newRow.eachCell((cell) => {
                cell.font = { size: 14 }; // Font size for data rows
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: index % 2 === 0 ? "FFFFFF00" : "FFFFC0CB" }, // Yellow for even, pink for odd
                };
                cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
            });

            // Set the row height to 20 for all data rows
            worksheet.getRow(newRow.number).height = 40;
        });

        // Adjust column widths
        worksheet.columns = [
            { width: 10 }, // S No.
            { width: 30 }, // Section
            { width: 50 }, // Questions
            { width: 30 }, // Obtained Marks/Total Marks
            { width: 20 }, // Marks Lost
        ];

        // Download the file
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "NPS_June_2024_Improvable.xlsx";
            link.click();
        });
    };

    const downloadTableAsExcelQue = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Question Summary");

        const titleRow = worksheet.addRow(["Question Summary"]);
        titleRow.getCell(1).font = { bold: true, size: 20, color: { argb: "FF4F81BD" } }; // Blue bold font
        titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" }; // Center alignment
        worksheet.mergeCells(1, 1, 1, 5); // Merge cells across the width of the table
        worksheet.getRow(1).height = 30;

        const headerRow = worksheet.addRow(["S No.", "Questions", "Marks Lost"]);

        headerRow.eachCell((cell) => {
            cell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } }; // White text
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF4F81BD" }, // Blue background
            };
            cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
        });

        worksheet.getRow(1).height = 50;
        const data = [
            [1, "Was the in-store branding like wall branding, pillar branding, drop down headers, glass branding, category drop downs, etc. maintained well? 1/ 5 4", "1/5", 4],
            [2, "Was the in-store branding...?", "1/5", 4],
        ];

        data.forEach((row, index) => {
            const newRow = worksheet.addRow(row);

            // Apply styles to each cell in the row
            newRow.eachCell((cell) => {
                cell.font = { size: 14 }; // Font size for data rows
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: index % 2 === 0 ? "FFFFFF00" : "FFFFC0CB" }, // Yellow for even, pink for odd
                };
                cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
            });

            // Set the row height to 20 for all data rows
            worksheet.getRow(newRow.number).height = 40;
        });

        worksheet.columns = [
            { width: 10 }, // S No.
            { width: 80 }, // Questions
            { width: 50 }, // Marks Lost
        ];

        // Download the file
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Question Summary";
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

    return (
        <div>
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
                        <div className="firstHeading mb-2 text-start">
                            <p>Upcoming Audits</p>
                        </div>
                        <div className="divCalender">
                            <AuditCalendar />
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px" }} className="dashSecond px-4 pt-4 mt-4">
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
                                    <li>
                                        <div className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => toggleNestedDropdown('survey-details')}>
                                            <p className="my-2">Survey Details</p>
                                            <i className={`bi ${openNestedDropdowns.includes('survey-details') ? 'bi-dash' : 'bi-plus'}`}></i>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropList d-flex justify-content-between align-items-center"
                                            onClick={() => toggleNestedDropdown('nps-survey')}>
                                            <p className="my-2">NPS Survey</p>
                                            <i className={`bi ${openNestedDropdowns.includes('nps-survey') ? 'bi-dash' : 'bi-plus'}`}></i>
                                        </div>
                                    </li>
                                </ul>
                            )}</div>

                        </div>
                    </div>

                    <div className="dashSecHero justify-content-center align-items-center row d-flex">
                        <div ref={barChartRef} className="secHeroLeft col-sm-9">
                            <BarChart tsData={tsData} />
                        </div>

                        <div className="secHeroSection col-sm-3">
                            <div className="secHead">
                                <p>Section</p>
                            </div>
                            <div className="section1">
                                <p style={{ color: "#003C5D" }} className="perPara">60%</p>
                                <p style={{ color: "#003C5D" }} className="secPara">Customer Arrival and Staff Grooming Analysis</p>
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
                                        <td>{index + 1}</td> {/* Serial number */}
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
                                                <td>{index + 1}</td>
                                                <td>{question.question_txt}</td>
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
        </div >
    )
}

export default Dashboard
