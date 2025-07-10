const express = require("express");
const router = express.Router();

const ADMIN = {
  username: "admin",
  password: "12345"
};

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    return res.status(200).json({ message: "Login successful ✅", token: "fake-auth-token-123" });
  }

  return res.status(401).json({ error: "Invalid credentials ❌" });
});

module.exports = router;
