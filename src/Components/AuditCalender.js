import React, { useState, useRef } from 'react';
import '../CSS/ChartsBarsCSS/AuditCalender.css';
import calenderData from './Calendar.json';

const AuditCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(calenderData[0].audit_date);
  const dateRef = useRef(null); 
  const auditInfoRef = useRef(null); 

  const formatAuditDate = (audit_date) => {
    const dateObj = new Date(audit_date);
    const options = { weekday: 'short', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    const [day, date] = formattedDate.split(' ');
    return { day, date };
  };

  const handleDateClick = (date, index) => {
    setSelectedDate(date);
    const auditBoxes = auditInfoRef.current.children;
    if (auditBoxes[index]) {
      auditBoxes[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const dateBoxes = dateRef.current.children;
    if (dateBoxes[index]) {
      dateBoxes[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="calendar-container d-flex justify-content-center align-items-center shadow-lg">
      <div className="date-column">
        <div className="divCol" ref={dateRef} style={{ overflowY: 'auto', margin: '1rem 0', height: '340px' }}>
          {calenderData.map((item, index) => {
            const { day, date } = formatAuditDate(item.audit_date);
            return (
              <div
                key={index}
                onClick={() => handleDateClick(item.audit_date, index)}
                className={`date-box my-2 shadow ${selectedDate === item.audit_date ? 'selected' : ''} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className="iDate">{day}</div>
                <div className="iDay">{date}</div>
              </div>
            );
          })}
        </div>
      </div>
          
      <div className="audit-info d-flex flex-column align-items-center" ref={auditInfoRef}>
        {calenderData.map((item, index) => (
          <div
            key={index}
            className={`audit-box p-4 my-2 ${selectedDate === item.audit_date ? 'selected' : ''} d-flex justify-content-between`}
          >
            <div className="box-left text-start">
              <p><strong>Audit Cycle</strong></p>
              <p><strong>City</strong></p>
              <p><strong>Location</strong></p>
              <p><strong>Audit Type</strong></p>
            </div>
            <div className="box-right text-start">
              <p>{item.audit.audit_cycle.name}</p>
              <p>{item.audit.store.city.name}</p>
              <p>{item.audit.store.name} <span>{item.audit.store.address}</span></p>
              <p>{item.audit.audit_cycle.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditCalendar;
