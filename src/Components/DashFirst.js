import React from 'react'
import AuditCalendar from '../Components/AuditCalender'

const DashFirst = ({handleSelectChange,queTypesData,renderBars}) => {
    return (
        <div>
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
        </div>
    )
}

export default DashFirst
