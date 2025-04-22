import React, { useState, useEffect } from "react";
import "./Task.css";
import UploadFile from "../../components/UploadFile/UploadFile";

const Task = () => {
  // Initialize state with all checkboxes
  const [checkboxes, setCheckboxes] = useState({
    "task1-subtask1": false,
    "task1-subtask2": false,
    "task1-subtask3": false,
    "task1-subtask4": false,
    "task1-subtask5": false,
    "task2-subtask1": false,
    "task2-subtask2": false,
    "task2-subtask3": false,
    "task2-subtask4": false,
    "task2-subtask5": false,
    "task3-subtask1": false,
    "task3-subtask2": false,
    "task3-subtask3": false,
    "task3-subtask4": false,
    "task3-subtask5": false,
    "task4-subtask1": false,
    "task4-subtask2": false,
    "task4-subtask3": false,
    "task4-subtask4": false,
    "task4-subtask5": false,
    "task4-subtask6": false,
  });

  // Load saved checkboxes from localStorage on component mount
  useEffect(() => {
    const savedCheckboxes = localStorage.getItem("taskCheckboxes");
    if (savedCheckboxes) {
      setCheckboxes(JSON.parse(savedCheckboxes));
    }
  }, []);

  // Save checkboxes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskCheckboxes", JSON.stringify(checkboxes));
  }, [checkboxes]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <>
      <div className="cardContainer">
        <div className="cards">
          <div className="heading">
            <h2>TASK 1</h2>
            <h3>INTRODUCTION</h3>
          </div>
          <div className="subtasks">
            <label htmlFor="task1-subtask1">
              <input
                type="checkbox"
                name="task1-subtask1"
                id="task1-subtask1"
                checked={checkboxes["task1-subtask1"]}
                onChange={handleCheckboxChange}
              />
              Background
            </label>
            <label htmlFor="task1-subtask2">
              <input
                type="checkbox"
                name="task1-subtask2"
                id="task1-subtask2"
                checked={checkboxes["task1-subtask2"]}
                onChange={handleCheckboxChange}
              />
              Objectives
            </label>
            <label htmlFor="task1-subtask3">
              <input
                type="checkbox"
                name="task1-subtask3"
                id="task1-subtask3"
                checked={checkboxes["task1-subtask3"]}
                onChange={handleCheckboxChange}
              />
              Purpose, Scope, and Applicability
            </label>
            <label htmlFor="task1-subtask4">
              <input
                type="checkbox"
                name="task1-subtask4"
                id="task1-subtask4"
                checked={checkboxes["task1-subtask4"]}
                onChange={handleCheckboxChange}
              />
              Achievements
            </label>
            <label htmlFor="task1-subtask5">
              <input
                type="checkbox"
                name="task1-subtask5"
                id="task1-subtask5"
                checked={checkboxes["task1-subtask5"]}
                onChange={handleCheckboxChange}
              />
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
            <label htmlFor="task2-subtask1">
              <input
                type="checkbox"
                name="task2-subtask1"
                id="task2-subtask1"
                checked={checkboxes["task2-subtask1"]}
                onChange={handleCheckboxChange}
              />
              survey 1
            </label>
            <label htmlFor="task2-subtask2">
              <input
                type="checkbox"
                name="task2-subtask2"
                id="task2-subtask2"
                checked={checkboxes["task2-subtask2"]}
                onChange={handleCheckboxChange}
              />
              survey 2
            </label>
            <label htmlFor="task2-subtask3">
              <input
                type="checkbox"
                name="task2-subtask3"
                id="task2-subtask3"
                checked={checkboxes["task2-subtask3"]}
                onChange={handleCheckboxChange}
              />
              survey 3
            </label>
            <label htmlFor="task2-subtask4">
              <input
                type="checkbox"
                name="task2-subtask4"
                id="task2-subtask4"
                checked={checkboxes["task2-subtask4"]}
                onChange={handleCheckboxChange}
              />
              survey 4
            </label>
            <label htmlFor="task2-subtask5">
              <input
                type="checkbox"
                name="task2-subtask5"
                id="task2-subtask5"
                checked={checkboxes["task2-subtask5"]}
                onChange={handleCheckboxChange}
              />
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
            <label htmlFor="task3-subtask1">
              <input
                type="checkbox"
                name="task3-subtask1"
                id="task3-subtask1"
                checked={checkboxes["task3-subtask1"]}
                onChange={handleCheckboxChange}
              />
              Problem Definition
            </label>
            <label htmlFor="task3-subtask2">
              <input
                type="checkbox"
                name="task3-subtask2"
                id="task3-subtask2"
                checked={checkboxes["task3-subtask2"]}
                onChange={handleCheckboxChange}
              />
              Requirements Specification
            </label>
            <label htmlFor="task3-subtask3">
              <input
                type="checkbox"
                name="task3-subtask3"
                id="task3-subtask3"
                checked={checkboxes["task3-subtask3"]}
                onChange={handleCheckboxChange}
              />
              Planning and Scheduling
            </label>
            <label htmlFor="task3-subtask4">
              <input
                type="checkbox"
                name="task3-subtask4"
                id="task3-subtask4"
                checked={checkboxes["task3-subtask4"]}
                onChange={handleCheckboxChange}
              />
              Software and Hardware Requirements
            </label>
            <label htmlFor="task3-subtask5">
              <input
                type="checkbox"
                name="task3-subtask5"
                id="task3-subtask5"
                checked={checkboxes["task3-subtask5"]}
                onChange={handleCheckboxChange}
              />
              Conceptual Models
            </label>
          </div>
          <div className="submit">
            <UploadFile
              task={{
                id: 3,
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
            <label htmlFor="task4-subtask1">
              <input
                type="checkbox"
                name="task4-subtask1"
                id="task4-subtask1"
                checked={checkboxes["task4-subtask1"]}
                onChange={handleCheckboxChange}
              />
              Basic Modules
            </label>
            <label htmlFor="task4-subtask2">
              <input
                type="checkbox"
                name="task4-subtask2"
                id="task4-subtask2"
                checked={checkboxes["task4-subtask2"]}
                onChange={handleCheckboxChange}
              />
              Data Design
            </label>
            <label htmlFor="task4-subtask3">
              <input
                type="checkbox"
                name="task4-subtask3"
                id="task4-subtask3"
                checked={checkboxes["task4-subtask3"]}
                onChange={handleCheckboxChange}
              />
              Procedural Design
            </label>
            <label htmlFor="task4-subtask4">
              <input
                type="checkbox"
                name="task4-subtask4"
                id="task4-subtask4"
                checked={checkboxes["task4-subtask4"]}
                onChange={handleCheckboxChange}
              />
              User interface design
            </label>
            <label htmlFor="task4-subtask5">
              <input
                type="checkbox"
                name="task4-subtask5"
                id="task4-subtask5"
                checked={checkboxes["task4-subtask5"]}
                onChange={handleCheckboxChange}
              />
              Security Issues
            </label>
            <label htmlFor="task4-subtask6">
              <input
                type="checkbox"
                name="task4-subtask6"
                id="task4-subtask6"
                checked={checkboxes["task4-subtask6"]}
                onChange={handleCheckboxChange}
              />
              Test Cases Design
            </label>
          </div>
          <div className="submit">
            <UploadFile
              task={{
                id: 4,
                title: "TASK 4",
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
