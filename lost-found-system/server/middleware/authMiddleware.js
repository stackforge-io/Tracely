const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../users.json");
const SECRET_KEY = "secret123"; // Same as in auth.js

function loadUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// ✅ Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token missing ❌" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token ❌" });
  }
}

// ✅ Middleware to check role (e.g., manager only)
function authorizeRoles(...roles) {
  return (req, res, next) => {
    const users = loadUsers();
    const currentUser = users.find((u) => u.id === req.user.id);

    if (!currentUser || !roles.includes(currentUser.role)) {
      return res.status(403).json({ error: "Access denied ❌" });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles
};
