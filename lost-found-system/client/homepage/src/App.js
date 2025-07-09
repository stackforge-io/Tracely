import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-dot"></div>
          <span className="logo-text">Logo</span>
        </div>
        <div className="nav-center">Navigation Bar</div>
        <div className="nav-right">Login</div>
      </nav>

      <main className="main-content">
        <h1 className="welcome">Welcome Message</h1>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search" />
        </div>

        <div className="button-group">
          <button className="btn"> 
            <img src="\lp\WhatsApp Image 2025-05-08 at 10.37.48_60f9b86b.jpg" alt="icon" />
          </button>
          <button className="btn">View Found</button>
          <button className="btn">Request Items</button>
        </div>
      </main>
    </div>
  );
}

export default App;
