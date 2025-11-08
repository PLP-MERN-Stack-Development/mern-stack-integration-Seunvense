// server/middleware/auth.js
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = async (req, res, next) => {
  console.log("🛡️ Incoming Auth Check");

  const authHeader = req.headers.authorization;
  console.log("🔑 Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Missing or malformed Authorization header");
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🧾 Extracted Token:", token);

  try {
    console.log("🔐 Using secret:", process.env.JWT_SECRET);

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token verified! Decoded payload:", payload);

    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
};

module.exports = { authenticateUser };
