import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Student",
    rollNo: "",
    projectGuide: "",
    projectName: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for student role
    if (formData.role === "Student") {
      if (!formData.rollNo.trim()) {
        setError("Roll number is required for students");
        return;
      }
      if (!formData.projectGuide) {
        setError("Please select a project guide");
        return;
      }
      if (!formData.projectName.trim()) {
        setError("Project name is required");
        return;
      }
    }

    try {
      // Prepare the data to send to backend
      const requestBody = {
        username: formData.username,
        password: formData.password,
        role: formData.role,
        ...(formData.role === "Student" && {
          rollNo: formData.rollNo,
          projectGuide: formData.projectGuide,
          projectName: formData.projectName,
        }),
      };

      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        if (formData.role === "Student") {
          const studentUser = {
            name: formData.username,
            rollNo: formData.rollNo,
          };
          localStorage.setItem("currentUser", JSON.stringify(studentUser));
        }

        alert("Signup successful! Please log in.");
        navigate("/login");
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            pattern="[A-Za-z0-9]+"
            title="Letters and numbers only"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="role">Role</label>
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

          {formData.role === "Student" && (
            <>
              <label htmlFor="rollNo">Roll Number</label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                required
                pattern="[A-Za-z0-9]+"
                title="Letters and numbers only"
              />

              {/* <label htmlFor="projectGuide">Select Guide</label>
              <select
                id="projectGuide"
                name="projectGuide"
                value={formData.projectGuide}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your Guide
                </option>
                <option value="Guide A">Guide A</option>
                <option value="Guide B">Guide B</option>
                <option value="Guide C">Guide C</option>
                <option value="Guide D">Guide D</option>
              </select> */}

              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit">Sign Up</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="signup-switch">
          <p>
            Already a user? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
