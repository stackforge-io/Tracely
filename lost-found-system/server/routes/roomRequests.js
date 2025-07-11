const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_FILE = path.join(__dirname, "../roomRequests.json");

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

// ✅ GET all room requests
router.get("/", (req, res) => {
  const requests = loadData();
  res.json(requests);
});

// ✅ POST a new room request (by guest)
router.post("/", (req, res) => {
  const requests = loadData();
  const newRequest = {
    id: Date.now(),
    guestName: req.body.guestName,
    room: req.body.room,
    item: req.body.item,
    status: "Pending",
    requestTime: new Date().toISOString()
  };
  requests.push(newRequest);
  saveData(requests);
  res.status(201).json(newRequest);
});

// ✅ PATCH: Update request status (by staff)
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const requests = loadData();
  const index = requests.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Request not found ❌" });
  }

  requests[index].status = req.body.status || requests[index].status;
  saveData(requests);
  res.json({ message: "Request status updated ✅", request: requests[index] });
});

module.exports = router;
