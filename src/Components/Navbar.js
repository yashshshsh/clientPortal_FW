import React, { useState, useEffect } from 'react'
import logo from '../Images/Floorwalk logo7x.png';
import '../CSS/Navbar.css'
import { useNavigate } from 'react-router-dom';
import CustomSelect from './CustomSelect';
import dashIcon from '../Images/space_dashboard.png'
import reportIcon from '../Images/insert_chart (1).png'
import actionIcon from '../Images/bottom_right_click.png'
import upcomingIcon from '../Images/chronic.png'
import storeIcon from '../Images/store.png'
import sBrowserIcon from '../Images/pivot_table_chart (1).png'
import logOut from '../Images/Log Out.png'

const Navbar = () => {
    const [active, setActive] = useState("dashboard");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [isDrop, setIsDrop] = useState(window.innerWidth <= 760);
    const [menuClicked, setMenuClicked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResizeMob = () => {
            setIsMobile(window.innerWidth <= 500);
        };

        const handleResizeDrop = () => {
            setIsDrop(window.innerWidth <= 760);
        };

        window.addEventListener('resize', handleResizeMob);
        window.addEventListener('resize', handleResizeDrop);
    }, []);

    const handleActive = (active) => {
        setActive(active);
        navigate('/' + active);
    }

    const handleMenu = () => {
        setMenuClicked(!menuClicked);
    }

    return (
        <div>
            <nav className="header navbar navbar-expand-lg">
                <div className="container-fluid d-flex">
                <img src={logo} alt="Logo" className='logo ms-4' />

                    {!isMobile ? (<div className="collNav">
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
                                <img className='mx-1' src={logOut} alt='img' />
                            </div>
                        </div>
                    </div>) : (<div onClick={handleMenu} className="bar">
                        <i style={{ fontSize: "2rem" }} class="bi bi-list"></i>
                    </div>)}
                </div>
            </nav>

            {isDrop ? (<CustomSelect />) : (<div className="py13">
                <div className="navb mx-auto">
                    <div className='d-flex flex-wrap justify-content-evenly align-content-between'>
                        <div onClick={() => { handleActive("dashboard") }} className={`dashboard gap-2 ${active === "dashboard" ? "bg-active" : ""}`}>
                            <div className="iconList df">
                                <img src={dashIcon} alt="img" />
                            </div>
                            <p>Dashboard</p>
                        </div>
                        <div onClick={() => { handleActive("reportBrowser") }} className={`reportBrowser gap-2 ${active === "reportBrowser" ? "bg-active" : ""}`}>
                            <div className="iconChart df">
                                <img src={reportIcon} alt="img" />
                            </div>
                            <p>Report Browser</p>
                        </div>
                        <div onClick={() => { handleActive("actionTrack") }} className={`actionTrack gap-2 ${active === "actionTrack" ? "bg-active" : ""}`}>
                            <div className="iconAction df">
                                <img src={actionIcon} alt="img" />
                            </div>
                            <p>Action Track</p>
                        </div>
                        <div onClick={() => { handleActive("upAudits") }} className={`upAudits gap-2 ${active === "upAudits" ? "bg-active" : ""}`}>
                            <div className="iconClock df">
                                <img src={upcomingIcon} alt="img" />
                            </div>
                            <p>Upcoming audits</p>
                        </div>
                        <div onClick={() => { handleActive("storeBrowser") }} className={`storeBrowser gap-2 ${active === "storeBrowser" ? "bg-active" : ""}`}>
                            <div className="iconStore df">
                                <img src={storeIcon} alt="img" />
                            </div>
                            <p>Store Browser</p>
                        </div>
                        <div onClick={() => { handleActive("storePerformance") }} className={`storePer gap-2 ${active === "storePerformance" ? "bg-active" : ""}`}>
                            <div className="iconPer df">
                                <img src={sBrowserIcon} alt="img" />
                            </div>
                            <p>Store Performance</p>
                        </div>


                        {active === "AI" ? (<div className="view-Ai d-flex gap-1 my-2 justify-content-center align-items-center">
                            <div className="iconStar my-2">
                                <i className="bi bi-stars"></i>
                            </div>
                            <p className='my-2'>AI Insights</p>
                        </div>) : (<div onClick={() => { handleActive("AI") }} className="ai df">
                            <i className="bi bi-stars"></i>
                            <p className='my-2'>AI Insights</p>
                        </div>)
                        }
                    </div>
                </div>
            </div>)}

            <div className={`sidebar ${menuClicked ? 'sidebar-open' : ''}`}>
                <div onClick={handleMenu} style={{ borderBottom: "3px solid #CCC" }} className="bar my-2 text-end">
                    <i style={{ fontSize: "2rem" }} class="bi bi-list"></i>
                </div>
                <div style={{ height: "90%" }} className="collInner">
                    <div style={{ height: "3rem" }} className="bellIcon text-start d-flex align-items-center">
                        <i style={{ marginBottom: "0.3rem" }} className="bi bi-bell"></i>
                        <p className='my-2'>Notification</p>
                    </div>
                    <div style={{ height: "3rem" }} className="globeIcon text-start d-flex align-items-center">
                        <i className="bi bi-globe"></i>
                        <select className="lang">
                            <option value="en">Eng</option>
                        </select>
                    </div>
                    <div style={{ height: "3rem" }} className="logOut text-start d-flex align-items-center">
                        <p style={{ color: "black" }} className="my-2">Log Out</p>
                        <i style={{ color: "black" }} className="bi bi-box-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar
