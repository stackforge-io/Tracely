// server/routes/protectedTest.js
const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/authMiddleware");

// 🔓 Any logged-in user
router.get("/user", authenticateToken, (req, res) => {
  res.json({
    message: `✅ Hello ${req.user.username}, you're logged in as ${req.user.role}`,
  });
});

// 🔐 Only staff and manager
router.get("/staff-only", authenticateToken, authorizeRoles("staff", "manager"), (req, res) => {
  res.json({ message: `✅ Welcome Staff/Manager ${req.user.username}` });
});

// 👑 Only manager
router.get("/manager-only", authenticateToken, authorizeRoles("manager"), (req, res) => {
  res.json({ message: `✅ Welcome Manager ${req.user.username}` });
});

module.exports = router;
