import React from 'react'
import img from '../Images/Attachments.png'
import '../CSS/Proof.css'

const Proof = () => {
    return (
        <div>
            <p className='proof-head my-5'>Please select tag for Audit Cycle Wise Comparison</p>
            <div className="main">
                <div className="tags mx-auto df">
                    <div className="bills">
                        <i class="bi bi-currency-dollar"></i>
                        <p>Bill</p>
                    </div>
                    <div className="entrance">
                        <i class="bi bi-door-closed-fill"></i>
                        <p>Entrance</p>
                    </div>
                    <div className="cash-counter">
                        <i class="bi bi-cash"></i>
                        <p>Cash Counter</p>
                    </div>
                    <div className="interior">
                        <i class="bi bi-box-fill"></i>
                        <p>Interior</p>
                    </div>
                    <div className="exterior">
                        <i class="bi bi-house"></i>
                        <p>Exterior</p>
                    </div>
                    <div className="display">
                        <i class="bi bi-tv"></i>
                        <p>Product Display</p>
                    </div>
                </div>

                <div className="proof-lower my-4 row">
                    <div className="lower-survey col-md-4 gradient-border">
                        <p>Survey Details</p>
                        <img src={img} alt="img" />
                    </div>  
                    <div className="nps col-md-4 gradient-border">
                        <p>NPS - June - 2024</p>
                        <img src={img} alt="img" />
                    </div>
                    <div className="nps col-md-4 gradient-border">
                        <p>NPS - June - 2024</p>
                        <img src={img} alt="img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Proof
