import React from 'react';
import styles from '../CSS/ReportBrowser.module.css';
import { useNavigate } from 'react-router-dom';

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

    const navigate  = useNavigate();

    const handleReportBtn = () =>{
        navigate('/auditReport');
    }

    return (
        <div>
            <div className="hero-section my-4 px-4">
                <div className={`${styles.head} d-flex justify-content-between align-items-center`}>
                    <div className={`${styles.repoHead} d-flex justify-content-center align-items-center`}>
                        <div className={styles.reportPara}>
                            <p className="my-2">Report Browser</p>
                        </div>
                    </div>
                    <div className={`${styles.exportList} d-flex justify-content-center align-items-center`}>
                        <p className="my-2">Export List</p>
                        <div className={styles.downIcon}>
                            <i className="bi bi-download"></i>
                        </div>
                    </div>
                </div>

                <div className={`${styles.searchStore} d-flex justify-content-between`}>
                    <div className={`${styles.searchIn} d-flex`}>
                        <div className={`${styles.inputSearch} p-2 gap-2 d-flex justify-content-center align-items-center`}>
                            <i className="bi bi-search"></i>
                            <input className={styles.storeSearch} placeholder="Search store" />
                        </div>
                        <div className={`${styles.filter} gap-2 d-flex justify-content-center align-items-center`}>
                            <p className={styles.filterText + " my-1"}>Filter</p>
                            <div className={styles.filterIcon}>
                                <i className="bi bi-filter"></i>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.clearFilter} d-flex align-items-center`}>
                        <p className="my-1">Clear Filter</p>
                    </div>
                </div>

                <div className={`${styles.dashTable} my-4 table-responsive`}>
                    <table>
                        <thead>
                            <tr>
                                <th>S no.</th>
                                <th>Store Code</th>
                                <th style={{ width: "11vw" }}>Date</th>
                                <th>Total Marks</th>
                                <th>Store Exterior</th>
                                <th>Customer Arrival and Staff Grooming Analysis</th>
                                <th>Store Interior and Product Display</th>
                                <th>Interaction with Staff</th>
                                <th>Cash Counter and Billing</th>
                                <th>Overall Consumer Experience Analysis</th>
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
        </div>
    );
};

export default ReportBrowser;
