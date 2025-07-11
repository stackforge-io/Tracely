import React, { useState } from "react";

function ForgotPasswordForm({ setActiveTab }) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending reset link to:", email);
    setSuccess(true);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Reset Password</h3>
      <label>Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Send Reset Link</button>
      <p className="link" onClick={() => setActiveTab("login")}>Back to Login</p>
      {success && <p className="success-msg">Reset link sent to email!</p>}
    </form>
  );
}

export default ForgotPasswordForm;
