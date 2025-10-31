const express = require("express");
const router = express.Router();

// Test route for authentication
router.get("/", (req, res) => {
  res.send("Auth API is working");
});

module.exports = router;
