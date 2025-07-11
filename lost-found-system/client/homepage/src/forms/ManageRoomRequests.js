import React, { useEffect, useState } from "react";
 
import "./ManageRoomRequests.css";

const PAGE_SIZE = 5;

function ManageRoomRequests() {
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);

 
     

  const filtered = requests.filter((req) => {
    const matchQuery =
      req.itemName.toLowerCase().includes(query.toLowerCase()) ||
      req.room.toLowerCase().includes(query.toLowerCase());

    const inDateRange =
      (!dateRange.from || new Date(req.date) >= new Date(dateRange.from)) &&
      (!dateRange.to || new Date(req.date) <= new Date(dateRange.to));

    return matchQuery && inDateRange;
  });

  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div className="room-request-list">
      <h2>🛏️ Room Item Requests</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search item or room"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label>From:</label>
        <input
          type="date"
          value={dateRange.from}
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
        />
        <label>To:</label>
        <input
          type="date"
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
        />
      </div>

      {paginated.map((req) => (
        <div className="request-card" key={req._id}>
          <h3>{req.itemName}</h3>
          <p><strong>Room:</strong> {req.room}</p>
          <p><strong>Date:</strong> {req.date}</p>
          <p><strong>Status:</strong> 
            <span className={`status-tag ${req.status.toLowerCase()}`}>{req.status}</span>
          </p>

           
        </div>
      ))}

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageRoomRequests;
