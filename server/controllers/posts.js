const Post = require("../models/posts");
const { validatePost } = require("../middleware/validation");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name")
      .populate("category", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.viewCount += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = [
  validatePost,
  async (req, res) => {
    try {
      const post = new Post(req.body);
      await post.save();
      const populated = await Post.findById(post._id)
        .populate("author", "name")
        .populate("category", "name");
      res.status(201).json(populated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

const updatePost = [
  validatePost,
  async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      )
        .populate("author", "name")
        .populate("category", "name");
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
