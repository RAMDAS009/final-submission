import React, { useContext } from "react";
import "./TSidebar.css";
import { NavLink } from "react-router-dom";

const TSidebar = ({ onItemClick }) => {
  return (
    <>
      <div className="sidebar">
        <div className="title">
          <h3>TASK-MASTER</h3>
        </div>
        <div className="menu">
          <div className="option">
            <NavLink to="/teacher/dashboard" className="nav">
              <img src="/images/home.png" alt="" />
              <p onClick={() => onItemClick("Dashboard")}>Dashboard</p>
            </NavLink>
          </div>
          <div className="option">
            <NavLink to="/teacher/StudentsList" className="nav">
              <img src="/images/review.png" alt="" />
              <p onClick={() => onItemClick("Students List")}>Students List</p>
            </NavLink>
          </div>
          <div className="option">
            <NavLink to="/teacher/submittions" className="nav">
              <img src="/images/checklist.png" alt="" />
              <p onClick={() => onItemClick("Submittions")}>Submittions</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default TSidebar;
