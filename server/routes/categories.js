const express = require("express");
const router = express.Router();
const { getCategories, createCategory } = require("../controllers/categories");

// Add logs to confirm route activation
console.log("✅ categories.js route file loaded");

router.get("/", (req, res) => {
  console.log("📥 GET /api/categories hit");
  getCategories(req, res);
});

router.post("/", (req, res) => {
  console.log("📤 POST /api/categories hit");
  createCategory[1](req, res);
});

module.exports = router;
