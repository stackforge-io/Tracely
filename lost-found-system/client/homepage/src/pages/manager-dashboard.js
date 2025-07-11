// src/pages/ManagerDashboard.js
import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./manager-dashboard.css";

const ManagerDashboard = () => {
  return (
    <div className="manager-dashboard">
      <main className="dashboard-content">
        <h2>Manager Dashboard</h2>
        <div className="grid-container">
          <Link to="/LostItemForm">
            <button className="action-btn">Lost Items</button>
          </Link>

          <Link to="/FoundItemForm">
            <button className="action-btn">Found Items</button>
          </Link>

          <Link to="/RequestItems">
            <button className="action-btn">Request Items</button>
          </Link>

          <Link to="/TrackRoomItem">
            <button className="action-btn">Track Items</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
