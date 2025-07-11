import React from "react";
import "./Notification.css";

const Notification = () => {
  const notifications = [
    { id: 1, title: "Lost item reported", time: "2 hours ago" },
    { id: 2, title: "New guest feedback submitted", time: "5 hours ago" },
    { id: 3, title: "Room 102 requested towels", time: "Yesterday" },
    { id: 4, title: "Item found in lobby", time: "2 days ago" },
  ];

  return (
    <div className="notification-page">
      <header className="notification-header">
        <h2>🔔 Notifications</h2>
      </header>

      <section className="notification-list">
        {notifications.map((note) => (
          <div key={note.id} className="notification-card">
            <div className="notification-title">{note.title}</div>
            <div className="notification-time">{note.time}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Notification;
