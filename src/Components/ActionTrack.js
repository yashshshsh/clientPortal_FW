import React from 'react';
import logo from '../Images/Floorwalk logo7x.png';
import styles from '../CSS/ActionTrack.module.css';

const ActionTrack = () => {
    const data = [
        {
            no: 1,
            reportId: "40368",
            personResponsible: "clientdem04@floorwalk.in",
            targetDate: "09 August 2024",
            store: "Showroom 4, Ahmedabad",
            createdBy: "Admin",
            actionPlan: "The reception branding needs to be fixed.",
            status: "Action Taken",
            reportAction: "Report"
        },
        {
            no: 2,
            reportId: "40368",
            personResponsible: "clientdem04@floorwalk.in",
            targetDate: "09 August 2024",
            store: "Showroom 4, Ahmedabad",
            createdBy: "Admin",
            actionPlan: "The reception branding needs to be fixed.",
            status: "Action Pending",
            reportAction: "Mark as Completed"
        }
    ];

    return (
        <div>
            <div className={`${styles.heroSection} px-4 my-4`}>
                <div className={`${styles.repoHead} d-flex align-items-center`}>
                    <div className={styles.reportPara}>
                        <p className="my-2">Action Track</p>
                    </div>
                </div>
                <div className={`${styles.head} d-flex justify-content-between align-items-center`}>
                    <div className={`${styles.auditCycle} d-flex flex-column`}>
                        <select>
                            <option>Nps - June - 2024</option>
                        </select>
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
                            <p className="my-1">Filter</p>
                            <div className={styles.filterIcon}>
                                <i className="bi bi-filter"></i>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.clearFilter} d-flex align-items-center`}>
                        <p className="my-1">Clear Filter</p>
                    </div>
                </div>

                <div className={`${styles.dashTable} my-4 table-responsive `}>
                    <table>
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
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.no}</td>
                                    <td>{row.reportId}</td>
                                    <td>{row.personResponsible}</td>
                                    <td>{row.targetDate}</td>
                                    <td>{row.store}</td>
                                    <td>{row.createdBy}</td>
                                    <td>{row.actionPlan}</td>
                                    <td>
                                        <div className={`${styles.pendingTd} d-flex justify-content-center align-items-center`}>
                                            <div
                                                className={`${styles.status} ${row.status === "Action Taken" ? styles.taken : styles.pending} d-flex align-items-center justify-content-center`}
                                                style={{
                                                    backgroundColor: row.status === "Action Taken" ? "#E9FFEF" : "#FFF2DD",
                                                    borderRadius: "10px",
                                                    width: "135px",
                                                    height: "30px"
                                                }}
                                            >
                                                <i
                                                    style={{
                                                        fontSize: "2.2rem",
                                                        margin: "0",
                                                        color: row.status === "Action Taken" ? "#409261" : "#D98634"
                                                    }}
                                                    className="bi bi-dot"
                                                ></i>
                                                <p
                                                    className="my-2"
                                                    style={{
                                                        fontWeight: "400",
                                                        fontSize: "13px",
                                                        lineHeight: "14px",
                                                        color: row.status === "Action Taken" ? "#409261" : "#D98634"
                                                    }}
                                                >
                                                    {row.status}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.reportAction}>
                                            {row.status === "Action Pending" ? (
                                                <div className={`${styles.penComp} d-flex gap-2 align-items-center justify-content-center`}>
                                                    <button className={styles.markBtn}>Mark as Completed</button>
                                                    <button className={styles.reportBtn}>Report</button>
                                                </div>
                                            ) : (
                                                <button className={styles.reportBt}>Report</button>
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
