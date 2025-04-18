import React from "react";
import "./TDashboard.css";
import ChartOne from "../../components/Charts/ChartOne.jsx";
import ChartTwo from "../../components/Charts/ChartTwo.jsx";
import ChartThree from "../../components/Charts/ChartThree.jsx";
import BarChart from "../../components/Charts/BarChart.jsx";
import Calendar from "../../components/Charts/CalendarControl.jsx";

const TDashboard = () => {
  return (
    <div className="dash">
      <div class="box box1">
        <div className="text">
          <h2>welcome to</h2>
          <h1>Your Task Management Area</h1>
        </div>
        <img
          src="/images/task-dashboard.jpg"
          alt=""
          style={{ width: "460px", height: "240px" }}
        />
      </div>
      <div class="box box2">
        <div className="text-container">
          <h3>TOTAL STUDENTS</h3>
          <h1>10</h1>
        </div>
        <div className="pie-chart">
          <ChartOne />
        </div>
      </div>
      <div class="box box3">
        <div className="text-container">
          <h3>TOTAL SUBMISSIONS</h3>
          <h1>5</h1>
        </div>
        <div className="pie-chart">
          <ChartTwo />
        </div>
      </div>
      <div class="box box4">
        <div className="text-container">
          <h3>TOTAL COMMENTS</h3>
          <h1>4</h1>
        </div>
        <div className="pie-chart">
          <ChartThree />
        </div>
      </div>
      <div class="box box5">
        <BarChart />
      </div>
      <div class=" box6">
        <Calendar />
      </div>
    </div>
  );
};

export default TDashboard;
