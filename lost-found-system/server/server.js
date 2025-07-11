const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const reportRoutes = require("./routes/reports");
const adminRoutes = require("./routes/admin");


const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
const roomRequestRoutes = require("./routes/roomRequests");
app.use("/api/room-requests", roomRequestRoutes);
const protectedRoutes = require("./routes/protectedTest");
app.use("/api/protected", protectedRoutes);

const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes);
const notificationRoutes = require("./routes/notifications");
app.use("/api/notifications", notificationRoutes);
app.use("/api/auth", require("./routes/auth")); 
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
