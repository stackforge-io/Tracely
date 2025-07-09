// server/routes/reports.js
const express = require("express");
const fs = require("fs");
const router = express.Router();
const DATA_FILE = "./server/data.json";


// Load data from JSON
const loadData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Save data to JSON
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all reports
router.get("/", (req, res) => {
  const reports = loadData();
  res.json(reports);
});

// POST a lost/found report
router.post("/", (req, res) => {
  const reports = loadData();
  const newReport = {
    id: Date.now(),
    type: req.body.type, // "lost" or "found"
    item: req.body.item,
    room: req.body.room,
    description: req.body.description,
    date: new Date().toISOString(),
  };
  reports.push(newReport);
  saveData(reports);
  res.status(201).json(newReport);
});

module.exports = router;
