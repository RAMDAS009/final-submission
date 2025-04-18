import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Student", // Default to Student
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Login successful!", data);

        // Store role (and token/username if needed)
        localStorage.setItem("role", formData.role.toLowerCase()); // student / teacher
        localStorage.setItem("username", data.user.username); // from backend
        localStorage.setItem("projectName", data.user.projectName); // from backend

        // Redirect based on role
        if (formData.role === "Student") {
          navigate("/student/dashboard");
        } else if (formData.role === "Teacher") {
          navigate("/teacher/dashboard");
        }
      } else {
        console.error("Login failed: ", data.error || data.message);
        alert(data.error || data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>

        <button type="submit">Login</button>

        <div className="login-switch">
          <p>
            Not a user? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
