const express = require("express");
const router = express.Router();

// Test route for categories
router.get("/", (req, res) => {
  res.send("Categories API is working");
});

module.exports = router;
