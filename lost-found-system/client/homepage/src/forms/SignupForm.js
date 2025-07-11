// src/components/Auth/SignupForm.js
import React, { useState } from "react";

function SignupForm({ setActiveTab, role, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password) {
      onSuccess();
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign Up as {role}</button>
    </form>
  );
}

export default SignupForm;
