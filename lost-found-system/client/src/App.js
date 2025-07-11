// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ type: '', item: '', room: '', description: '' });
  const [idToDelete, setIdToDelete] = useState('');

  // Load reports on page load
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reports');
      setReports(res.data);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitReport = async () => {
    try {
      await axios.post('http://localhost:5000/api/reports', form);
      setForm({ type: '', item: '', room: '', description: '' });
      fetchReports();
    } catch (err) {
      console.error('Error posting report:', err);
    }
  };

  const deleteReportById = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/reports/${idToDelete}`);
      setIdToDelete('');
      fetchReports();
    } catch (err) {
      console.error('Error deleting report:', err);
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete('http://localhost:5000/api/reports/clear');
      fetchReports();
    } catch (err) {
      console.error('Error clearing reports:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧾 Report a Lost/Found Item</h2>
      <input name="type" placeholder="Type (Lost or Found)" value={form.type} onChange={handleChange} /><br />
      <input name="item" placeholder="Item Name" value={form.item} onChange={handleChange} /><br />
      <input name="room" placeholder="Room No." value={form.room} onChange={handleChange} /><br />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />
      <button onClick={submitReport}>Submit</button>

      <h3 style={{ marginTop: '30px' }}>📋 All Reports</h3>
      <ul>
        {reports.map((r) => (
          <li key={r.id}>
            [{r.type}] {r.item} - Room {r.room} - {r.description} ({r.date})
          </li>
        ))}
      </ul>

      <h3>🗑️ Delete a Report by ID</h3>
      <input placeholder="Report ID" value={idToDelete} onChange={(e) => setIdToDelete(e.target.value)} />
      <button onClick={deleteReportById}>Delete</button>

      <h3>🧹 Clear All Reports</h3>
      <button onClick={clearAll}>Clear All</button>
    </div>
  );
}

export default App;
