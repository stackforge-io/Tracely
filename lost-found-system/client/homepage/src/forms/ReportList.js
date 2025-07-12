// 📄 RoomRequestList.jsx (React)
import React, { useEffect, useState } from "react";
import "./ReportList.css"; // reuse styling

const PAGE_SIZE = 5;

function RoomRequestList() {
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch("http://localhost:5000/api/room-requests");
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Error loading requests:", err);
      }
    }
    fetchRequests();
  }, []);

  const filtered = requests.filter((r) => {
    const q = query.toLowerCase();
    const match =
      r.guestName.toLowerCase().includes(q) ||
      r.itemRequested.toLowerCase().includes(q) ||
      r.room.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return match && matchStatus;
  });

  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div className="report-list">
      <h2>🛎️ Room Item Requests</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search guest/item/room"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Delivered</option>
          <option>Rejected</option>
        </select>
      </div>

      {paginated.map((req) => (
        <div key={req.id} className="report-card">
          <h3>{req.itemRequested}</h3>
          <p><strong>Guest:</strong> {req.guestName}</p>
          <p><strong>Room:</strong> {req.room}</p>
          <p><strong>Note:</strong> {req.note}</p>
          <p><strong>Status:</strong> {req.status}</p>
          <p><strong>Date:</strong> {req.createdAt?.split("T")[0]}</p>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={i + 1 === currentPage ? "active" : ""}
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

export default RoomRequestList;
