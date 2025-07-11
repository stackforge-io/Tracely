const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const USERS_FILE = path.join(__dirname, "../models/users.json");
const JWT_SECRET = "secret123";

// Helper to load users
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE));
  } catch {
    return [];
  }
}

// Helper to save users
function saveUsers(data) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

// ✅ Register (POST /api/auth/register)
router.post("/register", (req, res) => {
  const { username, password, role, email, room } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  const users = loadUsers();

  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: "Username already exists." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: Date.now(),
    username,
    email: email || "",
    room: room || "",
    role: role.toLowerCase(), // guest, staff, manager
    password: hashedPassword
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "Registration successful ✅", user: { username, role: newUser.role } });
});

// ✅ Login (POST /api/auth/login)
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "Invalid credentials ❌" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials ❌" });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
    expiresIn: "2h"
  });

  res.json({
    message: "Login successful ✅",
    token,
    user: { id: user.id, username: user.username, role: user.role }
  });
});

module.exports = router;
