// server/routes/reports.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_FILE = path.resolve(__dirname, "../data.json");

function loadData() {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all reports
router.get("/", (req, res) => {
  const reports = loadData();
  res.json(reports);
});

// POST a report
router.post("/", (req, res) => {
  const reports = loadData();
  const newReport = {
    id: Date.now(),
    type: req.body.type,
    item: req.body.item,
    room: req.body.room,
    description: req.body.description,
    date: new Date().toISOString()
  };
  reports.push(newReport);
  saveData(reports);
  res.status(201).json(newReport);
});
// DELETE all reports (Clear the data.json)
router.delete("/clear", (req, res) => {
  try {
    const emptyData = [];
    fs.writeFileSync(DATA_FILE, JSON.stringify(emptyData, null, 2));
    res.status(200).json({ message: "All reports cleared ✅" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear reports ❌" });
  }
});

module.exports = router;
