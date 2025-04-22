import React, { useContext } from "react";
import { SubmissionContext } from "../../context/SubmissionContext";
import "./Completed.css";

const Completed = () => {
  const { completedTasks } = useContext(SubmissionContext);

  return (
    <div>
      {completedTasks.length === 0 ? (
        <p>No tasks completed yet.</p>
      ) : (
        completedTasks.map((task, index) => (
          <div key={index} className="cardss">
            <div className="heading">
              <h2>{task.title}</h2>
              <h3>{task.subtitle}</h3>
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
        ))
      )}
    </div>
  );
};

export default Completed;
