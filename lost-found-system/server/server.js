// server/server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

// Helper: Load data
function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const jsonData = fs.readFileSync(DATA_FILE);
  return JSON.parse(jsonData);
}

// Helper: Save data
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all reports
app.get('/api/reports', (req, res) => {
  const data = readData();
  res.json(data);
});

// POST new report
app.post('/api/reports', (req, res) => {
  const reports = readData();
  const newReport = { id: Date.now(), ...req.body };
  reports.push(newReport);
  writeData(reports);
  res.status(201).json(newReport);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
