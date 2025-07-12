const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const FOUND_FILE = path.join(__dirname, "../models/foundItems.json");
const UPLOAD_DIR = path.join(__dirname, "../uploads");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `found-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

function loadData() {
  try {
    const data = fs.readFileSync(FOUND_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(FOUND_FILE, JSON.stringify(data, null, 2));
}

router.post("/", upload.single("image"), (req, res) => {
  const { itemName, description, location, room, date } = req.body;

  if (!itemName || !description || !location || !date) {
    return res.status(400).json({ error: "Missing required fields ❌" });
  }

  const reports = loadData();
  const newReport = {
    id: Date.now(),
    itemName,
    description,
    location,
    room,
    date,
    image: req.file ? req.file.filename : null
  };

  reports.push(newReport);
  saveData(reports);
  res.status(201).json({ message: "✅ Found item reported", report: newReport });
});

module.exports = router;
