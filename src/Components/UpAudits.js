import React, { useState } from 'react'
import '../CSS/UpAudits.css'

const UpAudits = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [activeMonth, setActiveMonth] = useState("April");

  return (
    <div>
      <div className="heroSection p-3">
        <div className="repoHead d-flex align-items-center">
          <div className="reportPara">
            <p className="my-2">Action Track</p>
          </div>
        </div>

        <div className="date-up d-flex my-3">
          <p className='my-2'>4 April 2024</p>
          <div className="left-arr mx-3 d-flex justify-content-center align-items-center">
            <i class="bi bi-arrow-left"></i>
          </div>
          <div className="left-arr">
            <i class="bi bi-arrow-right"></i>
          </div>
        </div>

        <div className="month-tabs d-flex justify-content-center align-items-center">
          <div className="month-div d-flex justify-content-center align-items-center">
            {months.map((month, index) => (
              <div
                key={index}
                className={`month my-1 ${"January" === month ? "Jan" : ""} justify-content-center align-items-center`}
                onClick={() => setActiveMonth(month)}
              >
                <div className={`month-span ${activeMonth === month ? "active" : ""} d-flex mx-auto`}>
                  <p className='mx-auto m-0'>{month}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-hero row">
          <div className="hero-left col-md-3 ">
            <div style={{backgroundColor:"white"}} className="audit-head align-items-center p-3 d-flex">
              <p className='my-2'>Audit Details</p>
            </div>

            <div className="left-main p-3">
              <div className="acycle text-start my-2">
                <p className='m-0 ac-p'>Audit Cycle</p>
                <p className='m-0 my-2 ac-comp'>Competition Audits - Store Type 2 - Feb - 2023</p>
              </div>
              <div className="acycle text-start my-2">
                <p className='m-0 ac-p'>City</p>
                <p className='m-0 my-2 ac-comp'>Indore</p>
              </div>
              <div className="acycle my-2 text-start">
                <p className='m-0 ac-p'>Location</p>
                <p className='m-0 my-2 ac-comp'>Showroom 5 <span>(Near Amusement park)</span></p>
              </div>
              <div className="acycle my-2 text-start">
                <p className='m-0 ac-p'>Audit Type</p>
                <p className='m-0 my-2 ac-comp'>Walk In</p>
              </div>
            </div>
          </div>

          <div className="hero-right col-md-9">
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpAudits
