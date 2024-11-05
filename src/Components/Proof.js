import React from 'react'
import img from '../Images/Attachments.png'
import '../CSS/Proof.css'

const Proof = () => {
    return (
        <div className='px-4 my-4'>
            <p className='proof-head'>Please select tag for Audit Cycle Wise Comparison</p>
            <div className="main">
                <div className="tags mx-auto df">
                    <div className="bills d-flex flex-column align-items-center">
                        <i class="bi bi-currency-dollar"></i>
                        <p>Bill</p>
                    </div>
                    <div className="entrance d-flex flex-column align-items-center">
                        <i class="bi bi-door-closed-fill"></i>
                        <p>Entrance</p>
                    </div>
                    <div className="cash-counter d-flex flex-column align-items-center">
                        <i class="bi bi-cash"></i>
                        <p>Cash Counter</p>
                    </div>
                    <div className="interior d-flex flex-column align-items-center">
                        <i class="bi bi-box-fill"></i>
                        <p>Interior</p>
                    </div>
                    <div className="exterior d-flex flex-column align-items-center">
                        <i class="bi bi-house"></i>
                        <p>Exterior</p>
                    </div>
                    <div className="display d-flex flex-column align-items-center">
                        <i class="bi bi-tv"></i>
                        <p>Product Display</p>
                    </div>
                </div>

                <div className="proof-lower my-3 row">
                    <div className="lower-survey col-md-3 gradient-border">
                        <p>Survey Details</p>
                        <img src={img} alt="img" />
                    </div>  
                    <div className="nps col-md-3 gradient-border">
                        <p>NPS - June - 2024</p>
                        <img src={img} alt="img" />
                    </div>
                    <div className="nps col-md-3 gradient-border">
                        <p>NPS - June - 2024</p>
                        <img src={img} alt="img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Proof
