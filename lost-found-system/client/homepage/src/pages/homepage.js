import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  return (
    <main className="main">
      <h1 className="welcome-title">Welcome Message</h1>
      <div className="search-wrapper">
        <input className="search-input" type="text" placeholder="Search" />
      </div>
      <div className="button-container">
        <Link to="/lostitemform">
          <button className="action-btn">Report Lost</button>
        </Link>
        <Link to="/view-found">
          <button className="action-btn">View Found</button>
        </Link>
        <Link to="/Requestitems">
          <button className="action-btn">Request Items</button>
        </Link>
      </div>
    </main>
  );
}

export default Homepage;