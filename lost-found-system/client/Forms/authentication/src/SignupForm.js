import React, { useState } from "react";

function SignupForm({ setActiveTab }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    password: "", confirmPassword: "", roomNumber: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Replace with actual API call
    console.log("Registering Guest:", formData);
    setSuccess(true);

    // Reset form
    setFormData({
      name: "", email: "", phone: "",
      password: "", confirmPassword: "", roomNumber: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Guest Registration</h3>
      <label>Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>Phone:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <label>Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <label>Confirm Password:
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      </label>
      <label>Room Number:
        <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required />
      </label>
      <button type="submit">Register</button>
      <p className="link" onClick={() => setActiveTab("login")}>Back to Login</p>
      {success && <p className="success-msg">Registration successful!</p>}
    </form>
  );
}

export default SignupForm;
