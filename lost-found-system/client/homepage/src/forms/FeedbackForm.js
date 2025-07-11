// src/components/FeedbackForm.js
import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [form, setForm] = useState({
    name: '',
    room: '',
    email: '',
    rating: '',
    category: '',
    comments: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, rating, category, comments } = form;

    if (!name || !rating || !category || !comments) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage('✅ Thank you for your feedback!');
        setError('');
        setForm({
          name: '',
          room: '',
          email: '',
          rating: '',
          category: '',
          comments: '',
        });
      } else {
        setError('✅ Submission Done.');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Server error. Try again later.');
      setMessage('');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Guest Feedback & Suggestions</h2>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="feedback-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name*"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="room"
          placeholder="Room Number (optional)"
          value={form.room}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={handleChange}
        />
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          required
        >
          <option value="">Rate Your Stay (1–5)*</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Feedback Type*</option>
          <option value="Suggestions">Suggestions</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Staff Behavior">Staff Behavior</option>
          <option value="Food">Food</option>
          <option value="Others">Others</option>
        </select>
        <textarea
          name="comments"
          placeholder="Write your comments or suggestions here*"
          value={form.comments}
          onChange={handleChange}
          rows="4"
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
