// src/components/RequestModal.js
import React from 'react';
import './RequestModal.css';

function RequestModal({ request, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Request Details</h2>
        <p><strong>Guest:</strong> {request.guestName}</p>
        <p><strong>Room:</strong> {request.room}</p>
        <p><strong>Item:</strong> {request.item}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p><strong>Date:</strong> {request.requestDate}</p>
        <p><strong>Notes:</strong> {request.notes}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default RequestModal;
