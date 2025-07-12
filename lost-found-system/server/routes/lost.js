const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const LOST_FILE = path.join(__dirname, "../models/lostItems.json");

function loadData() {
  try {
    const data = fs.readFileSync(LOST_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(LOST_FILE, JSON.stringify(data, null, 2));
}

router.post("/", (req, res) => {
  const { itemName, description, reportedBy, dateLost } = req.body;

  if (!itemName || !description || !reportedBy || !dateLost) {
    return res.status(400).json({ error: "Missing required fields ❌" });
  }

  const reports = loadData();
  const newReport = {
    id: Date.now(),
    itemName,
    description,
    reportedBy,
    dateLost,
    createdAt: new Date().toISOString()
  };

  reports.push(newReport);
  saveData(reports);
  res.status(201).json({ message: "✅ Lost item reported", report: newReport });
});

module.exports = router;
