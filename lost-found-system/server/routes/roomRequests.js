const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_FILE = path.join(__dirname, "../models/roomRequests.json");

function loadData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// POST /api/room-requests → Guest creates a request
router.post("/", (req, res) => {
  const { guestName, room, itemRequested, note } = req.body;
  if (!guestName || !room || !itemRequested) {
    return res.status(400).json({ error: "Missing required fields ❌" });
  }

  const requests = loadData();
  const newRequest = {
    id: Date.now(),
    guestName,
    room,
    itemRequested,
    note: note || "",
    status: "Pending",
    createdAt: new Date().toISOString()
  };

  requests.push(newRequest);
  saveData(requests);
  res.status(201).json({ message: "✅ Request submitted", request: newRequest });
});

// GET /api/room-requests → Staff fetch all requests
router.get("/", (req, res) => {
  const data = loadData();
  res.json(data);
});

// PATCH /api/room-requests/:id → Staff update status
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const data = loadData();
  const index = data.findIndex((r) => r.id === id);

  if (index === -1) return res.status(404).json({ error: "Request not found ❌" });

  data[index].status = status || data[index].status;
  saveData(data);
  res.json({ message: "✅ Status updated", request: data[index] });
});

module.exports = router;