import React, { useState } from "react";
import "./Task.css";
import UploadFile from "../../components/UploadFile/UploadFile";

const Task = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className="cardContainer">
        <div className="cards">
          <div className="heading">
            <h2>TASK 1</h2>
            <h3>INTRODUCTION</h3>
          </div>
          <div className="subtasks">
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
          <div className="submit">
            <UploadFile
              task={{ id: 1, title: "TASK 1", subtitle: "INTRODUCTION" }}
            />
          </div>
        </div>
        <div className="cards">
          <div className="heading">
            <h2>TASK 2</h2>
            <h3> SURVEY OF TECHNOLOGIES</h3>
          </div>
          <div className="subtasks">
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              survey 1
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              survey 2
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              survey 3
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              survey 4
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              survey 5
            </label>
          </div>
          <div className="submit">
            <UploadFile
              task={{
                id: 2,
                title: "TASK 2",
                subtitle: "SURVEY OF TECHNOLOGIES",
              }}
            />
          </div>
        </div>

        <div className="cards">
          <div className="heading">
            <h2>TASK 3</h2>
            <h3> REQUIREMENTS AND ANALYSIS </h3>
          </div>
          <div className="subtasks">
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Problem Definition
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Requirements Specification
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Planning and Scheduling
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Software and Hardware Requirements
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Conceptual Models
            </label>
          </div>
          <div className="submit">
            <UploadFile
              task={{
                id: 2,
                title: "TASK 3",
                subtitle: "REQUIREMENTS AND ANALYSIS",
              }}
            />
          </div>
        </div>
        <div className="cards">
          <div className="heading">
            <h2>TASK 4</h2>
            <h3> SYSTEM DESIGN</h3>
          </div>
          <div className="subtasks">
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Basic Modules
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Data Design
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Procedural Design
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              User interface design
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Security Issues
            </label>
            <label htmlFor="subtask1">
              <input type="checkbox" name="subtask1" id="" />
              Test Cases Design
            </label>
          </div>
          <div className="submit">
            <UploadFile
              task={{
                id: 2,
                title: "TASK 3",
                subtitle: "SYSTEM DESIGN",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
