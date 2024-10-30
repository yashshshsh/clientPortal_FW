import React, { useState } from 'react'
import logo from '../Images/Floorwalk logo7x.png';
import '../CSS/UpAudits.css'

const UpAudits = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [activeMonth, setActiveMonth] = useState("April");

  return (
    <div>
      <nav className="header navbar navbar-expand-lg">
        <div className="container-fluid d-flex">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="collNav">
            <div className="collInner d-flex justify-content-end">
              <div className="bellIcon mx-1 d-flex align-items-center justify-content-center">
                <i className="bi bi-bell"></i>
              </div>
              <div className="globeIcon mx-3 d-flex align-items-center justify-content-center">
                <i className="bi bi-globe"></i>
                <select className="lang">
                  <option value="en">Eng</option>
                </select>
              </div>
              <div className="logOut d-flex mx-3 align-items-center justify-content-center">
                <p className="my-2">Log Out</p>
                <i className="bi bi-box-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py13">
        <div className="navb d-flex flex-wrap justify-content-evenly align-content-between">
          <div className="dashboard gap-2">
            <div className="iconList">
              <i className="bi bi-list"></i>
            </div>
            <p>Dashboard</p>
          </div>
          <div className="reportBrowser gap-2">
            <div className="iconChart">
              <i className="bi bi-bar-chart"></i>
            </div>
            <p>Report Browser</p>
          </div>
          <div className="actionTrack gap-2">
            <div className="iconAction">
              <i className="bi bi-box-arrow-in-down-right"></i>
            </div>
            <p>Action Track</p>
          </div>
          <div className="upAudits gap-2">
            <div className="iconClock">
              <i className="bi bi-clock"></i>
            </div>
            <p>Upcoming audits</p>
          </div>
          <div className="storeBrowser gap-2">
            <div className="iconStore">
              <i className="bi bi-shop"></i>
            </div>
            <p>Store Browser</p>
          </div>
          <div className="storePer gap-2">
            <div className="iconPer">
              <i className="bi bi-archive-fill"></i>
            </div>
            <p>Store Performance</p>
          </div>
          <div className="AI d-flex gap-2">
            <div className="divAI">
              <i className="bi bi-stars"></i>
            </div>
            <p>AI Insights</p>
          </div>
        </div>
      </div>

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
            <div className="audit-head align-items-center p-3 d-flex">
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

          <div className="hero-right col-md-9 bg-warning">
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpAudits
