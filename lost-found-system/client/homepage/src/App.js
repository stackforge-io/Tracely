import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Notification from "./pages/Notification";
import FoundItemForm from "./forms/FoundItemForm";
import LostItemForm from "./forms/LostItemForm";
import Requestitems from "./forms/Requestitems";
import TrackRoomItem from "./forms/TrackRoomItem";
import AuthContainer from "./forms/AuthContainer";
import SignupForm from "./forms/SignupForm";
import LoginForm from "./forms/LoginForm";
import ForgotPasswordForm from "./forms/ForgotPasswordForm";
import Homepage from "./pages/homepage";
import ContactSupport from "./forms/ContactSupport";
import GuestDashboard from "./pages/guest-dashboard";
import ManagerDashboard from "./pages/manager-dashboard";
import StaffDashboard from "./pages/staff-dashboard";
import ManageRoomRequests from "./forms/ManageRoomRequests";
import ReportList from "./forms/ReportList";
import FoundItemsList from "./forms/FoundItemsList";

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-logo-dot" />
          <span className="nav-logo-text">Lost and Found</span>
        </div>
        <ul className="nav-menu">
  <li>
    <Link to="/homepage" className="nav-link">Home</Link>
  </li>
  <li>
    <Link to="/LostItemForm" className="nav-link">Items</Link>
  </li>
  <li>
    <Link to="/Requestitems" className="nav-link">Requests</Link>
  </li>
  <li>
    <Link to="/view-found" className="nav-link">Report</Link>
  </li>
  <li>
    <Link to="/ContactSupport" className="nav-link">Contact</Link>
  </li>
</ul>
        <Link to="/auth" className="login-view">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/LostItemForm" element={<LostItemForm />} />
        <Route path="/view-found" element={<FoundItemForm />} />
        <Route path="/Requestitems" element={<Requestitems />} />
        <Route path="/TrackRoomItem" element={<TrackRoomItem />} />
        <Route path="/ContactSupport" element={<ContactSupport />} />
        <Route path="/guest-dashboard" element={<GuestDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/FoundItemForm" element={<FoundItemForm />} />
        <Route path="/ReportList" element={<ReportList />} />
        <Route path="/FoundItemsList" element={<FoundItemsList />} />
        <Route path="/ManageRoomRequests" element={<ManageRoomRequests />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}


export default App;