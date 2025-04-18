import React from "react";
import "./StudentList.css";

const StudentList = () => {
  const students = [
    { rollNo: 101, name: "Amit Sharma", project: "AI Chatbot" },
    { rollNo: 102, name: "Priya Verma", project: "E-commerce Website" },
    { rollNo: 103, name: "Rahul Gupta", project: "Student Management System" },
    { rollNo: 104, name: "Sneha Patel", project: "IoT Smart Home" },
    { rollNo: 105, name: "Vikram Singh", project: "Blockchain Voting System" },
  ];

  return (
    <div className="container">
      <h2>Student Project Details</h2>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Project Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.project}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
