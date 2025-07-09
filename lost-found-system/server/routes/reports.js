const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_FILE = path.resolve(__dirname, "../data.json");

// Load from data.json
function loadData() {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Save to data.json
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ✅ GET all reports or filter by type
router.get("/", (req, res) => {
  const { type } = req.query;
  let reports = loadData();

  if (type) {
    reports = reports.filter(
      (r) => r.type.toLowerCase() === type.toLowerCase()
    );
  }

  res.json(reports);
});

// ✅ GET one report by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const reports = loadData();
  const report = reports.find((r) => r.id === id);

  if (!report) {
    return res.status(404).json({ error: "Report not found ❌" });
  }

  res.json(report);
});

// ✅ POST new report
router.post("/", (req, res) => {
  const { type, item, room, description } = req.body;

  if (!type || !item || !room || !description) {
    return res.status(400).json({ error: "Missing required fields ❌" });
  }

  const reports = loadData();
  const newReport = {
    id: Date.now(),
    type,
    item,
    room,
    description,
    date: new Date().toISOString()
  };

  reports.push(newReport);
  saveData(reports);
  res.status(201).json(newReport);
});

// ✅ PATCH (edit) one report by ID
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let reports = loadData();
  const index = reports.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Report not found ❌" });
  }

  reports[index] = { ...reports[index], ...req.body };
  saveData(reports);
  res.status(200).json({ message: "Report updated ✅", report: reports[index] });
});

// ✅ DELETE one report by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let reports = loadData();
  const index = reports.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Report not found ❌" });
  }

  reports.splice(index, 1);
  saveData(reports);
  res.status(200).json({ message: `Report with id ${id} deleted ✅` });
});

// ✅ DELETE all reports
router.delete("/clear", (req, res) => {
  try {
    saveData([]);
    res.status(200).json({ message: "All reports cleared ✅" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear reports ❌" });
  }
});

module.exports = router;
