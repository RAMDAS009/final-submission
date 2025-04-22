import React, { useContext } from "react";
import "./Dashboard.css";
import ChartOne from "../../components/Charts/ChartOne";
import ChartTwo from "../../components/Charts/ChartTwo";
import ChartThree from "../../components/Charts/ChartThree";
import BarChart from "../../components/Charts/BarChart";
import Calendar from "../../components/Charts/CalendarControl.jsx";
import { SubmissionContext } from "../../context/SubmissionContext";

const Dashboard = () => {
  const { submittedCount, completedCount } = useContext(SubmissionContext); // ✅ include completedCount

  return (
    <div className="dash">
      <div className="box box1">
        <div className="text">
          <h2>Welcome to</h2>
          <h1>Your Task Management Area</h1>
        </div>
        <img
          src="/images/task-dashboard.jpg"
          alt=""
          style={{ width: "460px", height: "240px" }}
        />
      </div>

      <div className="box box2">
        <div className="text-container">
          <h3>COMPLETED TASK</h3>
          <h1>{completedCount}</h1> {/* ✅ Live count */}
        </div>
        <div className="pie-chart">
          <ChartOne />
        </div>
      </div>

      <div className="box box3">
        <div className="text-container">
          <h3>SUBMITTED TASK</h3>
          <h1>{submittedCount}</h1>
        </div>
        <div className="pie-chart">
          <ChartTwo />
        </div>
      </div>

      <div className="box box4">
        <div className="text-container">
          <h3>PENDING TASK</h3>
          <h1>{4 - submittedCount}</h1> {/* Optional: Dynamic pending */}
        </div>
        <div className="pie-chart">
          <ChartThree />
        </div>
      </div>

      <div className="box box5">
        <BarChart />
      </div>

      <div className="box6">
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;
