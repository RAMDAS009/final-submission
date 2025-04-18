import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="LandingPage">
        <div className="navbar">
          <div className="title-name">
            <h3>TASK-MASTER</h3>
          </div>
          <div className="login-side">
            <button className="sign-in" onClick={() => navigate("/login")}>
              LOG IN
            </button>

            <button className="sign-up" onClick={() => navigate("/signup")}>
              REGISTER
            </button>
          </div>
        </div>
        <div className="content-wrapper">
          <h3>MANAGE YOUR TASK</h3>
          <p>
            Welcome to TaskMaster! Easily organize tasks, track progress. and
            boost productivity. Say goodbye to chaos, hello to efficiency.
            <br></br> Get started now!
          </p>
          <div className="contentImage">
            <img src="./images/localhost-dashboard.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
