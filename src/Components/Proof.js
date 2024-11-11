import React from 'react'
import img from '../Images/Attachments.png'
import billImg from '../Images/Trends/request_quote.png'
import entranceImg from '../Images/Trends/fullscreen_portrait.png'
import cashImg from '../Images/Trends/payments.png'
import interiorImg from '../Images/Trends/store.png'
import exteriorImg from '../Images/Trends/foundation.png'
import prodImg from '../Images/Trends/category.png'

import '../CSS/Proof.css'

const Proof = () => {
    return (
        <div className='my-4'>
            <p className='proof-head text-center'>Please select tag for Audit Cycle Wise Comparison</p>
            <div className="main">
                <div className="tags mx-auto">
                    <div className="bills d-flex flex-column align-items-center">
                        <img className='mt-2' src={billImg} alt="img" />
                        <p className='my-2'>Bill</p>
                    </div>
                    <div className="entrance d-flex flex-column align-items-center">
                        <img className='mt-2' src={entranceImg} alt="img" />
                        <p className='my-2'>Entrance</p>
                    </div>
                    <div className="cash-counter d-flex flex-column align-items-center">
                        <img className='mt-2' src={cashImg} alt="img" />
                        <p className='my-2'>Cash Counter</p>
                    </div>
                    <div className="interior d-flex flex-column align-items-center">
                        <img className='mt-2' src={interiorImg} alt="img" />
                        <p className='my-2'>Interior</p>
                    </div>
                    <div className="exterior d-flex flex-column align-items-center">
                        <img className='mt-2' src={exteriorImg} alt="img" />
                        <p className='my-2'>Exterior</p>
                    </div>
                    <div className="display d-flex flex-column align-items-center">
                        <img className='mt-2' src={prodImg} alt="img" />
                        <p className='my-2'>Product Display</p>
                    </div>
                </div>

                <div className="proof-lower my-3 mx-auto shadow row">
                    <div className="lower-survey col-sm-3 gradient-border">
                        <p className='text-center m-1'>Survey Details</p>
                        <img src={img} alt="img" />
                    </div>
                    <div className="nps col-sm-3 gradient-border">
                        <p className='text-center m-1'>NPS - June - 2024</p>
                        <img src={img} alt="img" />
                    </div>
                    <div className="nps col-sm-3">
                        <p className='text-center m-1'>NPS - June - 2024</p>
                        <img src={img} alt="img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Proof
