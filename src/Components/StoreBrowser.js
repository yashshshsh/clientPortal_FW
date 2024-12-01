import React, { useState, useEffect } from 'react'
import textImg from '../Images/Text.png'
import downImg from '../Images/vertical_align_bottom.png'
import '../CSS/StoreBrowser.css'
import { useNavigate } from 'react-router-dom'
import * as XLSX from "xlsx";
import { useFetchLaststores, useFetchAudYearList } from '../CustomHooks/StoreBrHook';
import { useFetchQueTypes, useFetchAudCycles } from '../CustomHooks/UseFetchUrl';


const StoreBrowser = () => {
    const { data: queTypesData, isLoading: queTypesLoading, error: queTypesError } = useFetchQueTypes('/questionnaire_types_for_dashboard');
    const { data: cyclesData, isLoading: cyclesLoading, error: cyclesError } = useFetchAudCycles('/audit_cycle_for_dashboard');
    const { data: lastStoreData, isLoading: lastStoreLoading, error: lastStoreError } = useFetchLaststores('/store?lastStoreId=');
    const { data: audYearData, isLoading: audYearLoading, error: audYearError } = useFetchAudYearList('/audit_cycle_year_list');

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

    const data = lastStoreData?.stores_list?.map((store) => ({
        id: store.id,
        storeCode: store.code || "N/A",
        showroomName: store.name,
        address: store.address,
        city: store.city.name,
        rank: store.get_store_rank,
        totalScore: store.get_total_percentage.score,
    })) || [];

    const navigate = useNavigate();

    const handleReportBtn = () => {
        navigate('/storeBrowserInsights');
    }

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
            <div className="head d-flex justify-content-between align-items-center">
                <div className="repoHead d-flex justify-content-center align-items-center">
                    <div className="reportPara">
                        <p className="my-2">Store Browser</p>
                    </div>
                </div>
                <div onClick={downloadTableAsExcelObs} className="exportList d-flex justify-content-center align-items-center">
                    <p className="my-2">Export List</p>
                    <img src={downImg} alt="img" />
                </div>
            </div>

            <div className="select my-2 gap-3 d-flex">
                {/* <p className='my-2'>Questionnaire Type : </p>
                <select onChange={handleSelectChange}>
                    {queTypesData?.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select> */}

                {/* <select onChange={handleSelectChange1}>
                        {detailsData?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select> */}
            </div>
            {/* 
            <p>Audit Cycle : </p> */}
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
                    {/* <div className="audit-cycle-inp">
                        <div className="dropdownNes">
                            <select onChange={handleSelectChange1}>
                                {detailsData?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div> */}
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
                <div onClick={() => {
                    setOpenNestedDropdowns([]);
                    setOpenDropdown(null);
                }} className="clearFilter d-flex align-items-center">
                    <p className="my-1">Clear Filter</p>
                </div>
            </div>

            <div className="table table-responsive my-3">
                <table id="table-to-export">
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
