import React, { useState, useRef, useEffect } from 'react'
import '../CSS/Dashboard.css'
import DashedProgressBar from '../Components/ChartsBars/DashedBarProgress'
import StoreWiseBarChart from './ChartsBars/StoreWiseBarChart'
import OverallPerformance from './ChartsBars/OverallPerformance'
import downImg from '../Images/vertical_align_bottom.png'
import html2canvas from "html2canvas";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useFetchAudScores, useFetchConfig, useFetchQueTypes, useFetchTimeSeries, useFetchAudCycles, useFetchQueSurvey, useFetchCityTrends, useFetchImprove, useFetchStoreTrends } from '../CustomHooks/UseFetchUrl'
import { useFetchUpAudits } from '../CustomHooks/UpComingHook'
import ShimmerSimpGallery from './Shimmers/ShimmerSimpGallery'
import DashFirst from './DashFirst'
import DashSecond from './DashSecond'

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

    const downloadBarChartAsPNG = (chartRef) => {
        html2canvas(chartRef.current).then((canvas) => {
            const imageUrl = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = imageUrl;
            link.setAttribute("download", "bar-chart.png");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
        });
    };

    const downloadTableAsExcelObs = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("NPS June 2024 Improvable");

        const titleRow = worksheet.addRow(["NPS June 2024 Improvable"]);
        titleRow.getCell(1).font = { bold: true, size: 20, color: { argb: "FF353E4C" } }; 
        titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
        worksheet.mergeCells(1, 1, 1, 5);
        worksheet.getRow(1).height = 50;

        const headerRow = worksheet.addRow(["S No.", "Section", "Questions", "Obtained Marks/Total Marks", "Marks Lost"]);
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

        impData?.forEach((data, index) => {
            const rowData = [
                index + 1, 
                data.question_section,
                data.question_txt, 
                `${data.obtained_marks}/${data.total_marks}`,
                data.lost_marks,
            ];
            const newRow = worksheet.addRow(rowData);
            newRow.eachCell((cell, colIndex) => {
                if (colIndex === 5) {
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "D9534F" }, 
                    };
                    cell.font = { size: 12, bold: true, color: { argb: "FFFFFFFF" } }; 
                } else {
                    cell.font = { size: 12, name: "Lato", color: { argb: "FF000000" } };
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FFFFFFFF" }, 
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
            worksheet.getRow(newRow.number).height = 30;
        });

        worksheet.columns = [
            { width: 20 },
            { width: 50 }, 
            { width: 70 }, 
            { width: 70 }, 
            { width: 20 }, 
        ];

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, "NPS_June_2024_Improvable.xlsx");
        });
    };


    const downloadTableAsExcelQue = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Question Summary");

        const titleRow = worksheet.addRow(["Question Summary"]);
        titleRow.getCell(1).font = { bold: true, size: 20, color: { argb: "FF353E4C" } };
        titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" }; 
        worksheet.mergeCells(1, 1, 1, 3);
        worksheet.getRow(1).height = 50;

        const headerRow = worksheet.addRow(["S No.", "Questions", "Marks Lost"]);
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
        qeData
            .filter((item) => item.type === "question")
            .forEach((question, index) => {
                const marksLost = question.options_list
                    .map((option) => `${option.option_name}: ${option.percentage}%`)
                    .join(", "); 

                const row = worksheet.addRow([index + 1, question.question_txt, marksLost]);

                row.eachCell((cell, colNumber) => {
                    cell.font = { size: 12 }; 
                    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FFFFFFFF" },
                    };
                    cell.border = {
                        top: { style: "thin", color: { argb: "FFCCCCCC" } },
                        left: { style: "thin", color: { argb: "FFCCCCCC" } },
                        bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
                        right: { style: "thin", color: { argb: "FFCCCCCC" } },
                    };
                });
                worksheet.getRow(row.number).height = 40; 
            });

        worksheet.columns = [
            { width: 10 }, 
            { width: 100 },
            { width: 70 }, 
        ];

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

    return (
        <div>
            {isMainLoading ? (<ShimmerSimpGallery />) :
                (<>
                    <div style={{ backgroundColor: "#FAFAFA" }} className="heroDashboard my-3">
                        <p className="dashHeading px-4 m-0">Dashboard</p>

                        <DashFirst handleSelectChange={handleSelectChange} queTypesData={queTypesData} renderBars={renderBars}/>
                        <DashSecond handleSelectChange1={handleSelectChange1} detailsData={detailsData} tsData={tsData} barChartRef={barChartRef} downloadBarChartAsPNG={downloadBarChartAsPNG}/>

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
                                                <td style={{backgroundColor : "#f2f2f2",width : "5vw"}}>{index + 1}</td> 
                                                <td>{data.question_section}</td>
                                                <td>{data.question_txt}</td> 
                                                <td>{`${data.obtained_marks}/${data.total_marks}`}</td>
                                                <td>
                                                    <div className="tScore">{data.lost_marks}</div> 
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
