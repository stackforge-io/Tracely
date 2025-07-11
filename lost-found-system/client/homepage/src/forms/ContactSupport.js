import React, { useState } from "react";
import "./ContactSupport.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
  room: "",
  category: "",
  message: "",
};

export default function ContactSupport() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const categories = ["WiFi", "AC", "Room Service", "Other"];

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (formData.phone && !/^[\d\s()+-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number.";
    }

    if (formData.room && isNaN(formData.room)) {
      newErrors.room = "Room number must be numeric.";
    }

    if (!formData.category) newErrors.category = "Pick a category.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.table(formData);
    setFormData(initialState);
    setErrors({});
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-heading">Contact Support</h2>

      {submitted && <p className="success-message">Form submitted successfully!</p>}

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="form-input"
      />
      {errors.name && <p className="form-error">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="form-input"
      />
      {errors.email && <p className="form-error">{errors.email}</p>}

      <input
        name="phone"
        placeholder="Phone Number (optional)"
        value={formData.phone}
        onChange={handleChange}
        className="form-input"
      />
      {errors.phone && <p className="form-error">{errors.phone}</p>}

      <input
        name="room"
        placeholder="Room Number (optional)"
        value={formData.room}
        onChange={handleChange}
        className="form-input"
      />
      {errors.room && <p className="form-error">{errors.room}</p>}

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="form-input"
      >
        <option value="">-- Select Issue Category --</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {errors.category && <p className="form-error">{errors.category}</p>}

      <textarea
        name="message"
        placeholder="Describe your issue"
        value={formData.message}
        onChange={handleChange}
        className="form-textarea"
      />
      {errors.message && <p className="form-error">{errors.message}</p>}

      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
}