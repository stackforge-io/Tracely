// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret123";

// ✅ Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: "Token missing ❌" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add decoded user info to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token ❌" });
  }
}

// ✅ Middleware to check roles
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied ❌" });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
