import React from 'react'
import logo from '../Images/Floorwalk logo7x.png';
import '../CSS/Footer.css'
import { useFetchConfig } from '../CustomHooks/UseFetchUrl'

const Footer = () => {
    const { data: configData, isLoading: configLoading, error: configError } = useFetchConfig('/config');
    return (
        <div>
            <footer>
                <div className="footer">
                    <div className="logo mx-auto p-0">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="links df">
                        <a href={configData.RHEA_BASE_URL}>floorwalk.in</a>
                        &nbsp;<span>|</span>&nbsp;
                        <a href={"mailto:" + configData.SUPPORT_EMAIL}>contactus@floorwalk.in</a>
                        &nbsp;<span>|</span>&nbsp;
                        <a href={configData.TW_PAGE_URL}>@FloorWalkIndia</a>
                        &nbsp;<span>|</span>&nbsp;
                        <span>v4.0.117</span>
                    </div>
                    <div className='df fw-consultant'>
                        <span>FloorWalk Consultants Pvt. Ltd. © 2014 to Present</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
