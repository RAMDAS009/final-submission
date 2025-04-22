import React, { useEffect, useState } from "react";
import "./StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/project/students", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStudents(data.students);
        } else {
          console.error("Failed to fetch students");
        }
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div className="container">
      <h2>Student Project Details</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Roll Number</th>
            <th>Project Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.username}</td>
              <td>{student.rollNo || "N/A"}</td>
              <td>{student.projectName || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
