// src/components/Auth/LoginForm.js
import React, { useState } from "react";

function LoginForm({ role, setActiveTab, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy authentication logic
    if (email && password) {
      // Call the redirect function passed from parent
      onSuccess();
    } else {
      alert("Enter credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login as {role}</button>
    </form>
  );
}

export default LoginForm;
