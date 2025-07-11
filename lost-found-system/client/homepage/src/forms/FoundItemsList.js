import React, { useEffect, useState } from "react";
 
import "./FoundItemsList.css";

const PAGE_SIZE = 5;

function FoundItemsList() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let result = [...items];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (item) =>
          item.itemName?.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q)
      );
    }

    if (dateRange.from && dateRange.to) {
      result = result.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(dateRange.from) && itemDate <= new Date(dateRange.to);
      });
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [query, dateRange, items]);

  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div className="found-list">
      <h2>📦 Found Items List</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search item or location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
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
        <div key={item._id} className="found-card">
          <h3>{item.itemName}</h3>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {item.date}</p>
          <p><strong>Reported By:</strong> {item.reportedBy}</p>

          {item.imageUrl && (
            <img src={item.imageUrl} alt="item" className="found-image" />
          )}

          <span className={`status-tag ${item.status?.toLowerCase() || "unclaimed"}`}>
            {item.status || "Unclaimed"}
          </span>

           
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

export default FoundItemsList;
