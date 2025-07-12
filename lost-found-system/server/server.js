// 📁 server/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const lostRoutes = require("./routes/lost");
const foundRoutes = require("./routes/found");
const roomRequests = require("./routes/roomRequests");

app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);
app.use("/api/room-requests", roomRequests);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});