// server/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const reportRoutes = require("./routes/reports");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/reports", reportRoutes);
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
app.get("/", (req, res) => {
  res.send("✅ Backend is working. Use /api/reports to access data.");
});
});
