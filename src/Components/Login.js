import React from 'react'
import logo from '../Images/Floorwalk logo7x.png'
import leftImg from '../Images/Rectangle 1789.png'
import rightImg from '../Images/Rectangle 1790.png'
import { TbEyeCancel } from "react-icons/tb";
import styles from '../CSS/Login.module.css';
import { FiX } from 'react-icons/fi';

const Login = () => {
  return (
    <div>
      <nav class={`${styles.header} navbar navbar-expand-lg`}>
        <div class="container-fluid">
          <div className={`${styles.logo}`}>
            <img src={logo} alt='img'></img>
          </div>
        </div>
      </nav>

      <div className="hero-section container-fluid d-flex p-0 justify-content-between">
        <div className={`${styles.modalBody} ${styles.leftImg} d-none d-sm-inline-block`}>
          <img src={leftImg} alt="Left" className="img-fluid" />
        </div>

        <div className={`${styles.modalBody} ${styles.heroForm} container`}>
          <div className={`${styles.heroWelcome} mt-5`}>
            <p style={{ color: "#003C5D" }} className={styles.wText}>Welcome to</p>
            <p style={{ color: "#8DC63F" }} className={styles.wText}>FloorWalk Client Portal</p>
            <p style={{ color: "#9CA3AF" }} className={styles.audLog}>
              For auditor login <span className={`${styles.audSpan} mx-1`}>Auditor login?</span>
            </p>
          </div>

          <div className={`${styles.modalBody} ${styles.logForm} shadow-lg mx-auto mt-4 d-flex flex-column align-items-center`}>
            <div className={styles.logUpper}>
              <p><span>Login</span> to your FloorWalk Client Portal</p>
            </div>

            <div className={`${styles.modalBody} ${styles.logLower} d-flex flex-column`}>
              <div className={`${styles.email} d-flex flex-column`}>
                <label className="d-block text-start">Email Id</label>
                <input type="text" className={styles.inputBars} id="email" name="email" />
              </div>

              <div className={`${styles.password} my-2 d-flex flex-column`}>
                <label className="d-block text-start">Password</label>
                <div className={`${styles.passInput} d-flex`}>
                  <input type="password" className={`${styles.inputBars1} w-100`} id="password" name="password" />
                  <TbEyeCancel color="#9CA3AF" size={24} />
                </div>
              </div>

              <div className={styles.forgot}>
                <p className="text-start">Forgot password?</p>
              </div>

              <div className={`${styles.robot} mx-auto my-3`}>
                <div className={`${styles.robotCheck} gap-2 mx-2 d-flex my-2`}>
                  <input type="checkbox" id="checkbox" name="checkbox" />
                  <p className="my-2">I'm not a robot</p>
                </div>
              </div>

              <div className={`${styles.logInBtn} text-end mx-auto`}>
                <button type="button" className={styles.logBtn}>Log In</button>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.modalBody} ${styles.rightImg} d-none d-sm-inline-block`}>
          <img src={rightImg} alt="Right" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Login

