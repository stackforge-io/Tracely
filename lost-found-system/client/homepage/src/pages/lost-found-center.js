import React from "react";
import "./lost-found-center.css";

function lostfoundcenter() {
  return (
    <div className="lost-found-center">
   
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

export default lostfoundcenter;
