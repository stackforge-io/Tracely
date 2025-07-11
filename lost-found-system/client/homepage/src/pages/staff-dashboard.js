// src/pages/StaffDashboard.js
import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./staff-dashboard.css";

const StaffDashboard = () => {
  return (
    <div className="staff-dashboard">
      <main className="dashboard-content">
        <h2>Staff Dashboard</h2>
        <div className="grid-container">
          <Link to="/ReportList">
            <button className="action-btn">New Lost Reports</button>
          </Link>

          <Link to="/FoundItemsList">
            <button className="action-btn"> Found Items List </button>
          </Link>

          <Link to="/ManageRoomRequests">
            <button className="action-btn">Manage Room Item Requests</button>
          </Link>

          <Link to="/TrackRoomItem">
            <button className="action-btn">Track Items</button>
          </Link>

        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
