const express = require("express");
const router = express.Router();

// Test route for posts
router.get("/", (req, res) => {
  res.send("Posts API is working");
});

module.exports = router;
