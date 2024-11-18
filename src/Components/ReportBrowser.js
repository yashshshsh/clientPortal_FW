import React, { useState } from 'react';
import styles from '../CSS/ReportBrowser.module.css';
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import downImg from '../Images/vertical_align_bottom.png'
import textImg from '../Images/Text.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ReportBrowser = () => {
    const data = [
        {
            no: 1,
            storeCode: "SST-001",
            date: "09 August 2024",
            totalMarks: "90%",
            storeExterior: "95%",
            customerArrival: "95%",
            storeInterior: "95%",
            interactionWithStaff: "95%",
            cashCounter: "95%",
            overallExperience: "95%"
        },
        {
            no: 2,
            storeCode: "SST-001",
            date: "09 August 2024",
            totalMarks: "90%",
            storeExterior: "95%",
            customerArrival: "95%",
            storeInterior: "95%",
            interactionWithStaff: "95%",
            cashCounter: "95%",
            overallExperience: "95%"
        }
    ];

    const navigate = useNavigate();

    const handleReportBtn = () => {
        navigate('/auditReport');
    }
    const [value] = useState(new Date());
    const [openDropdown, setOpenDropdown] = useState(null); // For parent dropdown
    const [openNestedDropdowns, setOpenNestedDropdowns] = useState([]);
    const [calenderOpen1, setCalenderOpen1] = useState(false);
    const [calenderOpen2, setCalenderOpen2] = useState(false);
    const [selectedDate1, setSelectedDate1] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);

    const toggleNestedDropdown = (item) => {
        setOpenNestedDropdowns((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };
    const toggleDropdown = (item) => {
        setOpenDropdown((prev) => (prev === item ? null : item));
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options); // Example: "November 17, 2024"
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
        <div>
            <div className="hero-section my-1 px-4">
                <div className={`${styles.head} d-flex justify-content-between align-items-center`}>
                    <div className={`${styles.repoHead} d-flex justify-content-center align-items-center`}>
                        <div className={styles.reportPara}>
                            <p className="my-2">Report Browser</p>
                        </div>
                    </div>
                    <div onClick={downloadTableAsExcelObs} className={`${styles.exportList} d-flex justify-content-center align-items-center`}>
                        <p className="my-2">Export List</p>
                        <div className={styles.downIcon}>
                            <img src={downImg} alt="img" />
                        </div>
                    </div>
                </div>

                <div className={`${styles.searchStore} d-flex justify-content-between`}>
                    <div className={`${styles.searchIn} d-flex`}>
                        <div className={`${styles.inputSearch} p-2 gap-2 d-flex justify-content-between align-items-center`}>
                            <div className="d-flex w-75">
                                <i className="bi bi-search mx-2"></i>
                                <input className={styles.storeSearch} placeholder="Search store" />
                            </div>
                            <div className="d-flex align-items-center">
                                <img src={textImg} alt="img" />
                            </div>
                        </div>
                        <div>
                            <div className={`${styles.filterParent} d-flex align-items-center gap-3`}   >
                                <div onClick={() => toggleDropdown('filter')} className={`${styles.filter} gap-2 d-flex justify-content-center align-items-center`}>
                                    <p className={`${styles.filterText} my-1`}>Filter</p>
                                    <div className={styles.filterIcon}>
                                        <i className="bi bi-filter"></i>
                                    </div>
                                </div>

                                {openNestedDropdowns.includes('state') && (
                                    <div className={`${styles.dropdownNes}`}>
                                        <select name="state" defaultValue="">
                                            <option value="" disabled>
                                                Select a State
                                            </option>
                                            <option value="mp">Madhya Pradesh</option>
                                            <option value="gujarat">Gujarat</option>
                                            <option value="rajasthan">Rajasthan</option>
                                        </select>
                                    </div>
                                )}
                                {openNestedDropdowns.includes('city') && (
                                    <div className={`${styles.dropdownNes}`}>
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
                                {openNestedDropdowns.includes('startDate') && (
                                    <div className={`${styles.dropdownNes}`}>
                                        <div onClick={() => {
                                            setCalenderOpen1((prev) => !prev);
                                            setOpenDropdown((prev) => !prev);
                                        }}
                                            className={`${styles.startDateP} df`}
                                        >
                                            <p className='my-1'>{selectedDate1 ? formatDate(selectedDate1) : "Select a start date"}</p>
                                        </div>

                                        {calenderOpen1 && (
                                            <div className={`${styles.calendarContainer} `}>
                                                <Calendar
                                                    value={value}
                                                    onChange={(newDate) => {
                                                        setSelectedDate1(newDate); // Update selected date
                                                        setCalenderOpen1(false); // Close calendar
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                                {openNestedDropdowns.includes('endDate') && (
                                    <div className={`${styles.dropdownNes}`}>
                                        <div onClick={() => {
                                            setCalenderOpen2((prev) => !prev);
                                            setOpenDropdown((prev) => !prev);
                                        }}
                                            className={`${styles.startDateP} df`}
                                        >
                                            <p className='my-1'>{selectedDate2 ? formatDate(selectedDate2) : "Select a end date"}</p>
                                        </div>

                                        {calenderOpen2 && (
                                            <div className={`${styles.calendarContainer} `}>
                                                <Calendar
                                                    value={value}
                                                    onChange={(newDate) => {
                                                        setSelectedDate2(newDate); // Update selected date
                                                        setCalenderOpen2(false); // Close calendar
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {openDropdown === 'filter' && (
                                <div>
                                    <ul className={` dropdown-menu shadow-lg d-grid gap-1 p-2 rounded-3 mx-0 w-220px`}>
                                        <li>
                                            <div className={`${styles.dropList} d-flex justify-content-between align-items-center`}
                                                onClick={() => toggleNestedDropdown('state')}>
                                                <p className="my-2">State</p>
                                                <i className={`bi ${openNestedDropdowns.includes('state') ? 'bi-dash' : 'bi-plus'}`}></i>
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className={`${styles.dropList} d-flex justify-content-between align-items-center`}
                                                onClick={() => toggleNestedDropdown('city')}
                                            >
                                                <p className="my-2">City</p>
                                                <i className={`bi ${openNestedDropdowns.includes('city') ? 'bi-dash' : 'bi-plus'}`}></i>
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className={`${styles.dropList} d-flex justify-content-between align-items-center`}
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
                                                className={`${styles.dropList} d-flex justify-content-between align-items-center`}
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
                </div>
            </div>

            <div className={`${styles.dashTable} my-4 table-responsive`}>
                <table id="table-to-export">
                    <thead>
                        <tr>
                            <th style={{ width: "3rem" }}>S no.</th>
                            <th>Store Code</th>
                            <th style={{ width: "9vw" }}>Date</th>
                            <th>Total Marks</th>
                            <th>Store Exterior</th>
                            <th style={{ width: "11vw" }}>
                                <p className='m-1'>Customer Arrival and</p>
                                <p className='m-0'>Staff Gromming</p>
                                <p className='m-1'>Analysis</p>
                            </th>
                            <th style={{ width: "10vw" }}>
                                <p className='m-1'>Store Interior and</p>
                                <p className='m-0'>Product Display</p>
                            </th>
                            <th style={{ width: "9vw" }}>
                                <p className='m-1'>Interaction with</p>
                                <p className='m-0'>staff</p></th>
                            <th style={{ width: "9vw" }}>
                                <p className='m-1'>Cash Counter</p>
                                <p className='m-0'>and Billing</p></th>
                            <th style={{ width: "11vw" }}>
                                <p className='m-1'>Overall Consumer</p>
                                <p className='m-0'>Experience Analysis</p></th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.no}</td>
                                <td>{row.storeCode}</td>
                                <td>{row.date}</td>
                                <td>
                                    <div className={styles.marksContainer}>{row.totalMarks}</div>
                                </td>
                                <td>
                                    <div className={styles.progressBarContainer}>
                                        <span>{row.storeExterior}</span>
                                        <div
                                            className={styles.dash1}
                                            style={{
                                                background: `linear-gradient(to right, #8DC63F ${parseInt(row.storeExterior)}%, #e6e6e6 ${100 - parseInt(row.storeExterior)}%)`,
                                            }}
                                        ></div>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.progressBarContainer}>
                                        <span>{row.customerArrival}</span>
                                        <div
                                            className={styles.dash1}
                                            style={{
                                                background: `linear-gradient(to right, #8DC63F ${parseInt(row.customerArrival)}%, #e6e6e6 ${100 - parseInt(row.customerArrival)}%)`,
                                            }}
                                        ></div>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.progressBarContainer}>
                                        <span>{row.storeInterior}</span>
                                        <div
                                            className={styles.dash1}
                                            style={{
                                                background: `linear-gradient(to right, #8DC63F ${parseInt(row.storeInterior)}%, #e6e6e6 ${100 - parseInt(row.storeInterior)}%)`,
                                            }}
                                        ></div>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.progressBarContainer}>
                                        <span>{row.interactionWithStaff}</span>
                                        <div
                                            className={styles.dash1}
                                            style={{
                                                background: `linear-gradient(to right, #8DC63F ${parseInt(row.interactionWithStaff)}%, #e6e6e6 ${100 - parseInt(row.interactionWithStaff)}%)`,
                                            }}
                                        ></div>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.progressBarContainer}>
                                        <span>{row.cashCounter}</span>
                                        <div
                                            className={styles.dash1}
                                            style={{
                                                background: `linear-gradient(to right, #8DC63F ${parseInt(row.cashCounter)}%, #e6e6e6 ${100 - parseInt(row.cashCounter)}%)`,
                                            }}
                                        ></div>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.progressBarContainer}>
                                        <span>{row.overallExperience}</span>
                                        <div
                                            className={styles.dash1}
                                            style={{
                                                background: `linear-gradient(to right, #8DC63F ${parseInt(row.overallExperience)}%, #e6e6e6 ${100 - parseInt(row.overallExperience)}%)`,
                                            }}
                                        ></div>
                                    </div>
                                </td>
                                <td>
                                    <button onClick={handleReportBtn} className={styles.reportBtn}>Report</button>
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
