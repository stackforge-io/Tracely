import React, { useEffect, useState } from "react";
 
import "./ReportList.css";

const PAGE_SIZE = 5;

function ReportList({ type }) {
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const endpoint = type === "found" ? "found-items" : "lost-items";

 

  useEffect(() => {
    let result = [...reports];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (item) =>
          item.itemName?.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (dateRange.from && dateRange.to) {
      result = result.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(dateRange.from) && itemDate <= new Date(dateRange.to);
      });
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [query, reports, statusFilter, dateRange]);

  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div className="report-list">
      <h2>📥 {type === "found" ? "Found" : "Lost"} Reports</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search item/location"
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

        <div className="date-filters">
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
      </div>

      {paginated.map((item) => (
        <div key={item._id} className="report-card">
          <h3>{item.itemName}</h3>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {item.date}</p>
          {item.room && <p><strong>Room:</strong> {item.room}</p>}
          {item.reportedBy && <p><strong>Reported By:</strong> {item.reportedBy}</p>}
          {item.imageUrl && (
            <img src={item.imageUrl} alt="Item" className="item-image" />
          )}
          {item.status && (
            <span className={`status-badge ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          )}
        </div>
      ))}

      {/* Pagination Controls */}
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

export default  ReportList;
