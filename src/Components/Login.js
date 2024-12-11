import React, { useState, useEffect } from 'react';
import logo from '../Images/Floorwalk logo7x.png';
import leftImg from '../Images/Rectangle 1789.png';
import eyeLock from '../Images/visibility_lock.png'
import rightImg from '../Images/Rectangle 1790.png';
import ReCAPTCHA from "react-google-recaptcha";
import '../CSS/Login.css';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './Service/utils';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(!!value);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (!credentials.email) {
      handleError("Email can not be empty!");
    }

    if (!credentials.password) {
      handleError("Password can not be empty!");
    }

    // if (!captchaValue) {
    //   handleError("Please complete the captcha!");
    // }

    if(credentials.email && credentials.password){
      setLoading(true);
      const fullUrl = "http://localhost:8000/client/web_login_api";
      try {
        const formData = new FormData();
        formData.append('username', credentials.email);
        formData.append('password', credentials.password);
  
        const response = await axios.post(fullUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
        localStorage.setItem("authToken",response.data.token);
        handleSuccess("Login successful");
        setTimeout(() => navigate('/dashboard'), 800);
      } catch (error) {
        console.error('An error occurred:', error);
        handleError("Invalid credentials");
      } finally {
        setLoading(false);
      }
    }
  }

  return (

    <div>
      <nav className='header ps-3'>
        <img src={logo} alt="Logo" className='logo ms-4' />
      </nav>

      <div className="hero-section d-flex">
        <div className="leftImg">
          <img src={leftImg} alt="img" className={`${screenWidth < 1024 ? "img-fluid" : ""}`} />
        </div>

        <div className="mainDiv mt-5 mb-4">
          <div className="welcome mx-auto d-flex flex-column align-items-center">
            <p className='wel'>Welcome to</p>
            <p className='flp'>FloorWalk Client Portal</p>
            <div className="audit-login">
              <p>For auditor login <span className='ms-1'>Auditor login ?</span></p>
            </div>
          </div>

          <div className='out-logDiv' >
            <div style={{ backgroundColor: "#FCFCFC" }} className="login-div mx-auto mt-3 shadow-lg p-5">
              <div className="inner text-center">
                <p><span>Login</span> to your FloorWalk Client Portal</p>
              </div>
              <div className="details mt-4">
                <div className="my-3 lab-inp">
                  <label className="form-label">Email Id</label>
                  <input type="email" name='email' className="form-control" onChange={handleChange} id="exampleInputEmail1" />
                </div>
                <div className="my-3 lab-inp">
                  <label className="form-label">Password</label>
                  <div className='df'>
                    <input type={showPassword ? "text" : "password"} className="form-control" name='password' onChange={handleChange} id="exampleInputPassword1" />
                    <img onClick={togglePasswordVisibility} style={{cursor:"pointer"}} src={eyeLock} alt='img'></img>
                  </div>
                </div>
                <p className='forPass'>Forgot Password ?</p>
                <div className="robot-div p-2 df">
                  <div>
                    <ReCAPTCHA className="recaptcha"
                      sitekey="6LdM4moqAAAAAC858IqJxnM_55pq62QM6hznjZht"
                      onChange={handleCaptchaChange}
                    />
                  </div>
                </div>

                <div onClick={handleLoginClick} className="login-btn my-4 df ms-auto">
                  <p className='my-2'>Log In</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rightImg">
          <img src={rightImg} alt="img" className={`${screenWidth < 1024 ? "img-fluid" : ""}`} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
