import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import Notification from './notification/App';
import GuestDashboard from './guest-dashboard/App';
import StaffDashboard from './staffdashboard/App';
import ManagerDashboard from './manager-dashboard/App';
import LostFoundCenter from './lost-found-center/App';
import HomePage from './homepage/App';
import LostItemForm from './Forms/App';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guest-dashboard" element={<GuestDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/lost-found-center" element={<LostFoundCenter />} />
        <Route path="/notification" element={<App />} />
        <Route path="/report-lost" element={<LostItemForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
