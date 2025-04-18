import React from "react";
import "./Completed.css";

const Completed = () => {
  return (
    <div>
      <div className="cardss">
        <div className="heading">
          <h2>TASK 1</h2>
          <h3>INTRODUCTION</h3>
        </div>
        <div className="subtaskss">
          <label htmlFor="subtask1">
            <input type="checkbox" name="subtask1" id="" />
            Background
          </label>
          <label htmlFor="subtask1">
            <input type="checkbox" name="subtask1" id="" />
            Objectives
          </label>
          <label htmlFor="subtask1">
            <input type="checkbox" name="subtask1" id="" />
            Purpose, Scope, and Applicability
          </label>
          <label htmlFor="subtask1">
            <input type="checkbox" name="subtask1" id="" />
            Achievements
          </label>
          <label htmlFor="subtask1">
            <input type="checkbox" name="subtask1" id="" />
            Organization report
          </label>
        </div>
      </div>
    </div>
  );
};

export default Completed;
