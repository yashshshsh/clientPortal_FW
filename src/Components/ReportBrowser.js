import React from 'react';
import styles from '../CSS/ReportBrowser.module.css';
import { useNavigate } from 'react-router-dom';
import downImg from '../Images/vertical_align_bottom.png'
import textImg from '../Images/Text.png'

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

    return (
        <div>
            <div className="hero-section my-1 px-4">
                <div className={`${styles.head} d-flex justify-content-between align-items-center`}>
                    <div className={`${styles.repoHead} d-flex justify-content-center align-items-center`}>
                        <div className={styles.reportPara}>
                            <p className="my-2">Report Browser</p>
                        </div>
                    </div>
                    <div className={`${styles.exportList} d-flex justify-content-center align-items-center`}>
                        <p className="my-2">Export List</p>
                        <div className={styles.downIcon}>
                            <img src={downImg} alt="img" />
                        </div>
                    </div>
                </div>

                <div className={`${styles.searchStore} d-flex justify-content-between`}>
                    <div className={`${styles.searchIn} d-flex`}>
                        <div className={`${styles.inputSearch} p-2 gap-2 d-flex justify-content-between align-items-center`}>
                            <div className='d-flex w-75'>
                                <i className="bi bi-search mx-2"></i>
                                <input className={styles.storeSearch} placeholder="Search store" />
                            </div>
                            <div className='d-flex align-items-center'>
                                <img src={textImg} alt="img" />
                            </div>
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
                                <th style={{ width: "3rem" }}>S no.</th>
                                <th>Store Code</th>
                                <th style={{ width: "11vw" }}>Date</th>
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
        </div >
    );
};

export default ReportBrowser;
