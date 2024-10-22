import React, { useState } from 'react';
import '../CSS/AuditCalender.css';

const auditData = [
  {
    date: '11',
    day: 'Wed',
    audit: {
      cycle: 'Competition Audits - Store Type 2 - Feb - 2023',
      city: 'Indore',
      location: 'Showroom 5 (Near Amusement park)',
      type: 'Walk In',
    },
  },
  {
    date: '12',
    day: 'Thu',
    audit: {
      cycle: 'Competition Audits - Store Type 2 - Feb - 2023',
      city: 'Indore',
      location: 'Showroom 5 (Near Amusement park)',
      type: 'Walk In',
    },
  },
  {
    date: '13',
    day: 'Fri',
    audit: {
      cycle: 'Competition Audits - Store Type 2 - Feb - 2023',
      city: 'Indore',
      location: 'Showroom 5 (Near Amusement park)',
      type: 'Walk In',
    },
  },
  {
    date: '14',
    day: 'Sat',
    audit: {
      cycle: 'Competition Audits - Store Type 2 - Feb - 2023',
      city: 'Indore',
      location: 'Showroom 5 (Near Amusement park)',
      type: 'Walk In',
    },
  },
  {
    date: '15',
    day: 'Sun',
    audit: {
      cycle: 'Competition Audits - Store Type 2 - Feb - 2023',
      city: 'Indore',
      location: 'Showroom 5 (Near Amusement park)',
      type: 'Walk In',
    },
  },
  // More dates can be added here...
];

const AuditCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(auditData[2]); // Initially selecting 13th

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-container d-flex justify-content-center align-items-center shadow-lg">
      <div className="date-column">
        {auditData.map((item, index) => (
          <div
            key={index}
            className={`date-box shadow ${selectedDate.date === item.date ? 'selected' : ''}`}
            onClick={() => handleDateClick(item)}
          >
            <div className='iDate'>{item.date}</div>
            <div className='iDay'>{item.day}</div>
          </div>
        ))}
      </div>

      <div className="audit-info d-flex align-items-center">
        <div className="audit-box d-flex justify-content-between">
          <div className="box-left text-start">
            <p><strong>Audit Cycle</strong></p>
            <p><strong>City</strong></p>
            <p><strong>Location</strong></p>
            <p><strong>Audit Type</strong></p>
          </div>
          <div className="box-left text-start">
            <p>{selectedDate.audit.cycle}</p>
            <p>{selectedDate.audit.city}</p>
            <p>{selectedDate.audit.location}</p>
            <p>{selectedDate.audit.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditCalendar;
