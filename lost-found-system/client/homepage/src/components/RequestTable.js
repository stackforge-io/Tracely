// src/components/RequestTable.js
import React from 'react';
import './RequestTable.css';

function RequestTable({ data, onView }) {
  return (
    <table className="request-table">
      <thead>
        <tr>
          <th>Guest</th>
          <th>Room</th>
          <th>Item</th>
          <th>Status</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan="6">No requests found.</td></tr>
        ) : (
          data.map((req) => (
            <tr key={req.id}>
              <td>{req.guestName}</td>
              <td>{req.room}</td>
              <td>{req.item}</td>
              <td>
                <span className={`status-tag ${req.status.toLowerCase()}`}>
                  {req.status}
                </span>
              </td>
              <td>{req.requestDate}</td>
              <td>
                <button onClick={() => onView(req)}>View</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default RequestTable;
