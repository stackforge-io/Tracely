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

// ✅ GET all reports or filter by type
router.get("/", (req, res) => {
  const { type } = req.query;
  let reports = loadData();

  if (type) {
    reports = reports.filter((r) => r.type.toLowerCase() === type.toLowerCase());
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

// ✅ DELETE all reports
router.delete("/clear", (req, res) => {
  try {
    saveData([]);
    res.status(200).json({ message: "All reports cleared ✅" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear reports ❌" });
  }
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

// ✅ PATCH update report by ID
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


// 🔥 NEW: Get total report count
router.get("/summary/count", (req, res) => {
  const reports = loadData();
  res.json({ totalReports: reports.length });
});

// 🔥 NEW: Get count by type
router.get("/summary/type-count", (req, res) => {
  const reports = loadData();
  const typeCount = {};

  reports.forEach((report) => {
    const type = report.type;
    typeCount[type] = (typeCount[type] || 0) + 1;
  });

  res.json(typeCount);
});

// 🔥 NEW: Get latest 5 reports
router.get("/summary/latest", (req, res) => {
  const reports = loadData();
  const latest = reports.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  res.json(latest);
});
// 🔥 NEW: Count by Room Number
router.get("/summary/room-count", (req, res) => {
  const reports = loadData();
  const roomCount = {};

  reports.forEach((report) => {
    const room = report.room || "Unknown";
    roomCount[room] = (roomCount[room] || 0) + 1;
  });

  res.json(roomCount);
});

// 🔥 NEW: Total Lost/Found in Last 7 Days
router.get("/summary/week-activity", (req, res) => {
  const reports = loadData();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  let lost = 0;
  let found = 0;

  reports.forEach((report) => {
    const reportDate = new Date(report.date);
    if (reportDate >= oneWeekAgo) {
      if (report.type.toLowerCase() === "lost") lost++;
      if (report.type.toLowerCase() === "found") found++;
    }
  });

  res.json({ lostLastWeek: lost, foundLastWeek: found });
});


module.exports = router;
