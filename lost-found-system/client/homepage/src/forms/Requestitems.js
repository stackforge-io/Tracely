// 📄 RequestItems.jsx
import React, { useState } from "react";
import "./requestitems.css";

const RequestItems = () => {
  const [form, setForm] = useState({
    guestName: "",
    roomNumber: "",
    item: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      guestName: form.guestName,
      room: form.roomNumber,
      itemRequested: form.item,
    };

    try {
      const res = await fetch("http://localhost:5000/api/room-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Request Submitted!");
        setForm({ guestName: "", roomNumber: "", item: "" });
      } else {
        setError(data.error || "❌ Failed to submit request.");
      }
    } catch (err) {
      console.error("Request Error:", err);
      setError("❌ Server error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <h2>Guest Item Request</h2>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}

      <input
        name="guestName"
        placeholder="Your Name"
        value={form.guestName}
        onChange={handleChange}
        required
      />
      <input
        name="roomNumber"
        placeholder="Room Number"
        value={form.roomNumber}
        onChange={handleChange}
        required
      />
      <select
        name="item"
        value={form.item}
        onChange={handleChange}
        required
      >
        <option value="">Select Item</option>
        <option value="Towel">Towel</option>
        <option value="Charger">Charger</option>
        <option value="Extra Pillow">Extra Pillow</option>
        <option value="Water Bottle">Water Bottle</option>
        <option value="Toiletries">Toiletries</option>
        <option value="Blanket">Blanket</option>
        <option value="Iron">Iron</option>
        <option value="Hair Dryer">Hair Dryer</option>
        <option value="Remote Control">Remote Control</option>
        <option value="TV Cable">TV Cable</option>
        <option value="Coffee Maker">Coffee Maker</option>
        <option value="Microwave">Microwave</option>
        <option value="Laundry Bag">Laundry Bag</option>
        <option value="Umbrella">Umbrella</option>
        <option value="First Aid Kit">First Aid Kit</option>
        <option value="Stationery">Stationery</option>
        <option value="Books">Books</option>
        <option value="Snacks">Snacks</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RequestItems;
