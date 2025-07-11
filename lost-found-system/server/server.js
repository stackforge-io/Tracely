const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const reportRoutes = require("./routes/reports");
const adminRoutes = require("./routes/admin");


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
const roomRequestRoutes = require("./routes/roomRequests");
app.use("/api/room-requests", roomRequestRoutes);

const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes);
const notificationRoutes = require("./routes/notifications");
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
