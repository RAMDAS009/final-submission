import React, { useContext } from "react";
import { SubmissionContext } from "../../context/SubmissionContext";
import "./Submit.css";

const Submit = () => {
  const { submittedTasks } = useContext(SubmissionContext);

  return (
    <div>
      {submittedTasks.map((task, index) => (
        <div className="cardss" key={index}>
          <div className="heading">
            <h2>{task.title}</h2>
            <h3>{task.subtitle}</h3>
          </div>
          <div className="subtaskss">
            <p>File uploaded for this task.</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Submit;
