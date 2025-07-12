import React, { useState } from "react";
import "./founditem.css"; // Optional: add your styling here

function FoundItemForm() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    date: "",
    room: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const MAX_WORDS = 200;
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      setError("Image must be smaller than 2MB.");
      return;
    }
    setError("");
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const validateForm = () => {
    const { itemName, description, location, date, room } = formData;
    if (!itemName || !description || !location || !date) {
      setError("All fields marked * are required.");
      return false;
    }

    const wordCount = description.trim().split(/\s+/).length;
    if (wordCount > MAX_WORDS) {
      setError(`Description should be under ${MAX_WORDS} words.`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        payload.append(key, formData[key]);
      }
    }

  try {
  const response = await fetch("http://localhost:5000/api/found", {
    method: "POST",
    body: payload,
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const result = await response.json();
  console.log("Submitted:", result);
  setSubmitted(true);
  setError("");

  // Clear form
  setFormData({
    itemName: "",
    description: "",
    location: "",
    date: "",
    room: "",
    image: null,
  });
} catch (err) {
  console.error("Submission error:", err);
  setError("Something went wrong. Please try again.");
}

  };

  return (
    <div className="found-item-form">
      <h2>Found Item Report Form</h2>
      {submitted && <p className="success">Report submitted successfully!</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Item Name*:
          <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} />
        </label>

        <label>
          Description* (under {MAX_WORDS} words):
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>

        <label>
          Location Found*:
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label>

        <label>
          Room Number:
          <input type="text" name="room" value={formData.room} onChange={handleChange} />
        </label>

        <label>
          Date Found*:
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </label>

        <label>
          Upload Image (Max 2MB):
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default FoundItemForm;