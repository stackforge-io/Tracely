import React from "react";
import "./staffdashboard.css";

const App = () => {
  return (
    <div className="staff-dashboard">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">🏨</div>
          <div className="brand">HotelStaff</div>
          <ul className="menu">
            <li>Dashboard</li>
            <li>Manage Requests</li>
            <li>Reports</li>
            <li>Support</li>
          </ul>
        </div>
        <div className="nav-right">
          <button className="login-btn">Login</button>
          <span className="icon">🔔</span>
          <span className="icon">👤</span>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="dashboard-content">
        <h2>Staff Dashboard</h2>
        <div className="grid-container">
          <a href="/dashboard" className="card">Box 1</a>
          <a href="/manage-requests" className="card">Box 2</a>
          <a href="/reports" className="card">Box 3</a>
          <div className="grid-container1"> 
            <a href="/support" className="card1">Box 4</a>
            <a href="/profile" className="card1">Box 5</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
