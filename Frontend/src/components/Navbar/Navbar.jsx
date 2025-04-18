import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ selectedItem }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedProjectName = localStorage.getItem("projectName");

    if (storedUsername) setUsername(storedUsername);
    if (storedProjectName) setProjectName(storedProjectName);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        localStorage.clear(); // ✅ Clear saved user info
        navigate("/login");
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error during logout!");
    }
  };

  return (
    <div className="Navbar">
      <div className="left-side">
        <h3>{selectedItem}</h3>
      </div>
      <div className="middle-side">
        <h3>{projectName || "Project Name"}</h3>
      </div>
      <div className="right-side">
        <p>{username || "User Name"}</p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
