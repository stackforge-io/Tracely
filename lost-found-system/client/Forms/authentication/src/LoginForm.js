import React, { useState } from "react";

function LoginForm({ role, setActiveTab }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    console.log("Logging in:", { email, password, role });
    setSuccess(true);

    // Reset form
    setEmail("");
    setPassword("");

    // Optionally: redirect or call prop after login
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h3>
      <label>Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Login</button>
      <p className="link" onClick={() => setActiveTab("forgot")}>Forgot Password?</p>
      {success && <p className="success-msg">Login successful!</p>}
    </form>
  );
}

export default LoginForm;
