import React, { useState } from "react";
 

const ReportLostItem = () => {
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    reportedBy: "",
    dateLost: "",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    alert("Lost item reported!");
    setForm({ itemName: "", description: "", reportedBy: "", dateLost: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report Lost Item</h2>
      <input name="itemName" placeholder="Item Name" value={form.itemName} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="reportedBy" placeholder="Your Name" value={form.reportedBy} onChange={handleChange} required />
      <input type="date" name="dateLost" value={form.dateLost} onChange={handleChange} required />
      <button type="submit">Report</button>
    </form>
  );
};

export default ReportLostItem;
