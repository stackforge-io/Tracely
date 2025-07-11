const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_FILE = path.join(__dirname, "../feedback.json");

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

// ✅ GET all feedback
router.get("/", (req, res) => {
  const feedback = loadData();
  res.json(feedback);
});

// ✅ POST new feedback
router.post("/", (req, res) => {
  const feedback = loadData();
  const newFeedback = {
    id: Date.now(),
    name: req.body.name,
    room: req.body.room || "",
    email: req.body.email || "",
    rating: req.body.rating,
    category: req.body.category,
    comments: req.body.comments,
    date: new Date().toISOString()
  };

  feedback.push(newFeedback);
  saveData(feedback);
  res.status(201).json({ message: "Thank you for your feedback ✅", feedback: newFeedback });
});

module.exports = router;
