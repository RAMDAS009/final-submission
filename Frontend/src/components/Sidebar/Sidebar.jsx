import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ onItemClick }) => {
  return (
    <div className="sidebar">
      <div className="title">
        <h3>TASK-MASTER</h3>
      </div>
      <div className="menu">
        <div className="option">
          <NavLink
            to="student/dashboard"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            <img src="/images/home.png" alt="Home" />
            <p onClick={() => onItemClick("Dashboard")}>dashboard</p>
          </NavLink>
        </div>
        <div className="option">
          <NavLink
            to="task"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            <img src="/images/checklist.png" alt="Task" />
            <p onClick={() => onItemClick("Task")}>task</p>
          </NavLink>
        </div>
        <div className="option">
          <NavLink
            to="completed"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            <img src="/images/completed.png" alt="Completed" />
            <p onClick={() => onItemClick("Completed")}>completed</p>
          </NavLink>
        </div>
        <div className="option">
          <NavLink
            to="submit"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            <img src="/images/submit.png" alt="Submitted" />
            <p onClick={() => onItemClick("Submitted")}>submitted</p>
          </NavLink>
        </div>
        <div className="option">
          <NavLink
            to="review"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            <img src="/images/review.png" alt="Review" />
            <p onClick={() => onItemClick("Reviews")}>reviews</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
