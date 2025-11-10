import { createContext, useContext, useState, useEffect } from "react";
import { postService, categoryService } from "../services/api";
import { useAuth } from "./AuthContext";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // ✅ Fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getAllPosts();
      setPosts(data.posts || data);
    } catch (err) {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create a new post (supports image uploads)
  const createPost = async (postData) => {
    try {
      const token = localStorage.getItem("token");
      console.log("👤 Current user:", user);
      console.log("🪪 Token:", token);
      console.log("📝 postData before sending:", postData);

      let payload;
      let isFormData = false;

      // ✅ Use FormData only if there’s an image
      if (postData.image) {
        isFormData = true;
        payload = new FormData();
        payload.append("title", postData.title);
        payload.append("content", postData.content);
        payload.append("category", postData.category);
        payload.append("image", postData.image); // ✅ no author here
        console.log("📦 Sending multipart FormData:", [...payload.entries()]);
      } else {
        payload = {
          title: postData.title,
          content: postData.content,
          category: postData.category,
        };
        console.log("📦 Sending JSON payload:", payload);
      }

      // ✅ Automatically handled by api.js interceptor (with token)
      const newPost = await postService.createPost(payload, isFormData);

      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      console.error(
        "❌ Error creating post:",
        err.response?.data || err.message
      );
      setError("Failed to create post");
      throw err;
    }
  };

  // ✅ Delete post
  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete post");
      fetchPosts(); // Revert UI on error
    }
  };

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("❌ Failed to load categories:", err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        categories,
        loading,
        error,
        fetchPosts,
        fetchCategories,
        createPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
