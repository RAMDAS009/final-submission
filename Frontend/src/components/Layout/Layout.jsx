import React, { useState, useEffect } from "react";
import "./Layout.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import TSidebar from "../Sidebar/TSidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user role from localStorage
    const userRole = localStorage.getItem("role");

    if (!userRole) {
      // If no role is found, redirect to login
      navigate("/login");
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="Layout">
      <Navbar activePage={selectedItem} selectedItem={selectedItem} />

      {role === "teacher" ? (
        <TSidebar onItemClick={handleItemClick} />
      ) : (
        <Sidebar onItemClick={handleItemClick} />
      )}
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
