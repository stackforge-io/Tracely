import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">🌐</div>
          <span className="brand-name">MySite</span>
          <ul className="menu">
            <li>Message</li>
            <li>Profile Management</li>
            <li>Feedback & Suggestions</li>
            <li>Contact Support</li>
          </ul>
        </div>
        <div className="nav-right">
          <button className="login-btn">Login</button>
          <span className="icon">🔔</span>
          <span className="icon">👤</span>
        </div>
      </nav>

      {/* Message Section */}
      <main className="content">
        <h2>Message</h2>
        <div className="message-grid">
          <button className="message-box">Box 1</button>
          <button className="message-box">Box 2</button>
          <button className="message-box">Box 3</button>
          <button className="message-box">Box 4</button>
        </div>
      </main>
    </div>
  );
}

export default App;
