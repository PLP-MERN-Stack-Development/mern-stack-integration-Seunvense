const express = require("express");
const { authenticateUser } = require("../middleware/auth");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", authenticateUser, createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
