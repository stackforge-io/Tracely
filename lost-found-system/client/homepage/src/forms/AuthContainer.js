// src/components/Auth/AuthContainer.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./Auth.css";

function AuthContainer() {
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("guest");
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (role === "guest") {
      navigate("/guest-dashboard");
    } else if (role === "staff") {
      navigate("/staff-dashboard");
    } else if (role === "manager") {
      navigate("/manager-dashboard");
    }
  };

  const renderForm = () => {
    if (activeTab === "login") {
      return <LoginForm role={role} setActiveTab={setActiveTab} onSuccess={handleRedirect} />;
    } else if (activeTab === "signup") {
      return <SignupForm setActiveTab={setActiveTab} role={role} onSuccess={handleRedirect} />;
    } else {
      return <ForgotPasswordForm setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="auth-container">
      <h2>Hotel Authentication</h2>

      <div className="role-selector">
        <label>Login As:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="guest">Guest</option>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <div className="auth-tabs">
        <button onClick={() => setActiveTab("login")} className={activeTab === "login" ? "active" : ""}>Login</button>
        <button onClick={() => setActiveTab("signup")} className={activeTab === "signup" ? "active" : ""}>Sign Up</button>
        <button onClick={() => setActiveTab("forgot")} className={activeTab === "forgot" ? "active" : ""}>Forgot Password</button>
      </div>

      <div className="auth-form-section">{renderForm()}</div>
    </div>
  );
}

export default AuthContainer;
