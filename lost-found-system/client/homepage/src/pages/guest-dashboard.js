import React from "react";
import { Link } from "react-router-dom";
import "./guest-dashboard.css";

function GuestDashboard() {
  return (
    <div className="guest-dashboard">
      <main className="content">
        <h2>Message</h2>
        <div className="message-grid">
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

          <Link to="/Notification">
            <button className="action-btn">Notifications</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default GuestDashboard;
