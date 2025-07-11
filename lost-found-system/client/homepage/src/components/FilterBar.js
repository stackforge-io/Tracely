// src/components/FilterBar.js
import React from 'react';

function FilterBar({ setFilters }) {
  const handleStatusChange = (e) => {
    setFilters({ status: e.target.value });
  };

  return (
    <div className="filter-bar">
      <label>Status:</label>
      <select onChange={handleStatusChange}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Delivered">Delivered</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}

export default FilterBar;
