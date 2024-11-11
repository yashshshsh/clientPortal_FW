import React from 'react';
import logo from '../Images/Floorwalk logo7x.png';
import leftImg from '../Images/Rectangle 1789.png';
import eyeLock from '../Images/visibility_lock.png'
import captcha from '../Images/Frame.png'
import rightImg from '../Images/Rectangle 1790.png';
import '../CSS/Login.css'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleLoginClick = () =>{
    navigate('/dashboard');
  }
  return (
    <div className='hero-main'>
      <nav className="header navbar navbar-expand-lg">
        <div className="container-fluid d-flex">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </nav>

      <div className="main row">
        <div className="leftImg p-0 col-sm-2 col-md-3">
          <img src={leftImg} alt="img" className="img-fluid"/>
        </div>

        <div className="mainDiv col-sm-8 col-md-6">
          <div className="welcome mx-auto mt-5 d-flex flex-column align-items-center">
            <p className='wel'>Welcome to</p>
            <p className='flp'>FloorWalk Client Portal</p>
            <div className="audit-login">
              <p>For auditor login <span className='ms-1'>Auditor login ?</span></p>
            </div>
          </div>

          <div style={{ backgroundColor: "#FCFCFC" }} className="login-div mx-auto mt-3 shadow-lg p-5">
            <div>
              <div className="inner text-center">
                <p><span>Login</span> to your FloorWalk Client Portal</p>
              </div>
              <div className="details mt-4">
                <div class="my-3 lab-inp">
                  <label class="form-label">Email Id</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" />
                </div>
                <div class="my-3 lab-inp">
                  <label class="form-label">Password</label>
                  <div className='df'>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                    <img src={eyeLock} alt='img'></img>
                  </div>
                </div>
                <p className='forPass'>Forgot Password ?</p>
                <div className="robot-div p-2 d-flex shadow-sm align-items-center justify-content-between">
                  <div className="check df">
                    <input type='checkbox'></input>
                    <p className='my-2 ms-2'>I’m not a robot</p>
                  </div>
                  <div className="captcha">
                    <img src={captcha} alt="img" />
                  </div>
                </div>

                <div onClick = {handleLoginClick} className="login-btn my-4 df ms-auto">
                  <p className='my-2'>Log In</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="rightImg col-sm-2 col-md-3">
          <img src={rightImg} alt="img" className="img-fluid"/>
        </div>
      </div>
    </div>
  );
}

export default Login;
