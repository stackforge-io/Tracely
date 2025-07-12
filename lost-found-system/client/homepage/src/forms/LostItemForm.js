import React, { useState } from "react";

const ReportLostItem = () => {
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    reportedBy: "",
    dateLost: "",
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

    try {
      const res = await fetch("http://localhost:5000/api/lost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("✅ Lost item reported successfully!");
        setForm({ itemName: "", description: "", reportedBy: "", dateLost: "" });
        setError("");
      } else {
        const data = await res.json();
        setError(data.error || "❌ Failed to report lost item.");
        setMessage("");
      }
    } 
    catch (err) {
      console.error("Error reporting lost item:", err);
      setError("❌ An error occurred while reporting the lost item.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Report Lost Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="itemName"
          placeholder="Item Name"
          value={form.itemName}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="reportedBy"
          placeholder="Your Name"
          value={form.reportedBy}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateLost"
          value={form.dateLost}
          onChange={handleChange}
          required
        />
        <button type="submit">Report</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ReportLostItem;