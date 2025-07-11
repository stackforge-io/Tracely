// RoomItemRequestForm.js
import React, { useState } from "react";
import "./App.css";

function Requestitems() {
  const [formData, setFormData] = useState({
    guestName: "",
    roomNumber: "",
    itemRequested: "",
    quantity: 1,
    notes: "",
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const validateForm = () => {
    const { guestName, roomNumber, itemRequested, quantity } = formData;
    if (!guestName || !roomNumber || !itemRequested || quantity <= 0) {
      setError("Please fill in all required fields with valid data.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitted(true);
      setFormData({
        guestName: "",
        roomNumber: "",
        itemRequested: "",
        quantity: 1,
        notes: "",
      });
      setError("");
    } catch (err) {
      console.error("Request failed:", err);
      setError("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="room-item-request-form">
      <h2>Room Item Request Form</h2>
      {submitted && <p className="success">Request submitted successfully!</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Guest Name*:
          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
          />
        </label>

        <label>
          Room Number*:
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Item Requested*:
          <input
            type="text"
            name="itemRequested"
            value={formData.itemRequested}
            onChange={handleChange}
          />
        </label>

        <label>
          Quantity*:
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>

        <label>
          Additional Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default Requestitems;
