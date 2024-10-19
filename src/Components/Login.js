import React from 'react'
import logo from '../Images/Floorwalk logo7x.png'
import leftImg from '../Images/Rectangle 1789.png'
import rightImg from '../Images/Rectangle 1790.png'
import captcha from '../Images/Frame (1).png';
import { TbEyeCancel } from "react-icons/tb";
import '../CSS/Login.css'

const Login = () => {
  return (
    <div>
      <div className="header d-flex ">
        <div className="logo">
          <img src={logo}></img>
        </div>
      </div>

      <div className="hero-section container-fluid d-flex p-0 justify-content-between">
        <div className="modal-body leftImg d-none d-sm-inline-block">
          <img src={leftImg} className='img-fluid'></img>
        </div>

        <div className="modal-body hero-form container">
          <div className="hero-welcome mt-5">
            <p style={{ color: "#003C5D" }} className='w-text'>Welcome to</p>
            <p style={{ color: "#8DC63F" }} className='w-text'>FloorWalk Client Portal</p>
            <p style={{ color: "#9CA3AF" }} className='audLog'>For auditor login <span className='audSpan mx-1'>Auditor login ?</span></p>
          </div>

          <div className="modal-body log-form shadow-lg mx-auto mt-4 d-flex flex-column align-items-center">
            <div className="log-upper">
              <p><span>Login</span> to your FloorWalk Client Portal</p>
            </div>

            <div className="modal-body log-lower d-flex flex-column">
              <div className="email d-flex flex-column">
                <label className='d-block text-start'>Email Id</label>
                <input type='text' className='inputBars' id='email' name='email'></input>
              </div>

              <div className="password my-2 d-flex flex-column">
                <label className='d-block text-start'>Password</label>
                <div className="pass-input d-flex">
                  <input type='text' className='inputBars1 w-100' id='password' name='password'></input>
                  <TbEyeCancel color="9CA3AF" size={24} />
                </div>
              </div>

              <div className="forgot">
                <p className='text-start'>Forgot password ?</p>
              </div>

              <div className="robot mx-auto my-3">
                <div className="robot-check gap-2 mx-2 d-flex my-2">
                  <input type="checkbox" id="checkbox" name="checkbox"></input>
                  <p className='my-2'>I'm not a robot</p>
                </div>
              </div>

              <div className="logInBtn text-end mx-auto">
                <button type="button" className="logBtn">Log In</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body rightImg d-none d-sm-inline-block">
          <img src={rightImg} className='img-fluid'></img>
        </div>
      </div>
    </div>
  )
}

export default Login

