const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_FILE = path.join(__dirname, "../notifications.json");

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

// ✅ GET all notifications or by userId
router.get("/", (req, res) => {
  const { userId } = req.query;
  let notifications = loadData();

  if (userId) {
    notifications = notifications.filter(n => n.userId === parseInt(userId));
  }

  res.json(notifications);
});

// ✅ POST new notification
router.post("/", (req, res) => {
  const notifications = loadData();

  const newNotification = {
    id: Date.now(),
    userId: req.body.userId,
    type: req.body.type,
    message: req.body.message,
    is_read: false,
    timestamp: new Date().toISOString()
  };

  notifications.push(newNotification);
  saveData(notifications);
  res.status(201).json({ message: "Notification created ✅", notification: newNotification });
});

// ✅ PATCH mark as read
router.patch("/:id/read", (req, res) => {
  const id = parseInt(req.params.id);
  const notifications = loadData();
  const index = notifications.findIndex(n => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Notification not found ❌" });
  }

  notifications[index].is_read = true;
  saveData(notifications);
  res.json({ message: "Notification marked as read ✅" });
});

module.exports = router;
