// server/routes/admin.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const USERS_FILE = path.join(__dirname, "../users.json");
const JWT_SECRET = "secret123";

// 🔐 POST /api/admin/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if users.json exists
  if (!fs.existsSync(USERS_FILE)) {
    return res.status(500).json({ error: "Users file not found ❌" });
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials ❌" });
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ error: "Invalid credentials ❌" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful ✅",
    token,
    user: {
      username: user.username,
      role: user.role,
    },
  });
});

module.exports = router;
