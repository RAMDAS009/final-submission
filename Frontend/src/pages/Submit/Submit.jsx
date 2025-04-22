import React, { useContext } from "react";
import { SubmissionContext } from "../../context/SubmissionContext";
import "./Submit.css";

const Submit = () => {
  const { studentSubmissions } = useContext(SubmissionContext);

  if (!Array.isArray(studentSubmissions) || studentSubmissions.length === 0) {
    return <p>No submitted tasks available.</p>;
  }

  return (
    <div>
      {studentSubmissions.map((task, index) => (
        <div className="cardss" key={index}>
          <div className="heading">
            <h2>{task.project}</h2>
            <h3>{task.subtitle}</h3>
            <p>Submission Date: {task.date}</p>
          </div>
          <div className="subtaskss">
            <p>File: {task.file.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Submit;
