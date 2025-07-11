import React, { useState } from "react";
 
import "./requestitems.css";

const RequestItems = () => {
  const [form, setForm] = useState({
    guestName: "",
    roomNumber: "",
    item: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    alert("Request Submitted!");
    setForm({ guestName: "", roomNumber: "", item: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Guest Item Request</h2>
      <input name="guestName" placeholder="Your Name" value={form.guestName} onChange={handleChange} required />
      <input name="roomNumber" placeholder="Room Number" value={form.roomNumber} onChange={handleChange} required />
      <select name="item" value={form.item} onChange={handleChange} required>
        <option value="">Select Item</option>
        <option value="Towel">Towel</option>
        <option value="Charger">Charger</option>
        <option value="Extra Pillow">Extra Pillow</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RequestItems;
