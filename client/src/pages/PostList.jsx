import { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function PostList() {
  const { posts, loading, error, deletePost, categories } = usePosts();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      !filterCategory || post.category?._id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p className="text-center p-8">Loading posts...</p>;
  if (error) return <p className="text-red-500 text-center p-8">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blog Posts</h1>

      {/* 🔍 Search + Filter controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">
          No posts found. Try a different search or category.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="border rounded-lg p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/post/${post._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-3">
                {post.excerpt ||
                  post.content?.substring(0, 120) ||
                  "No content"}
                ...
              </p>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>By {post.author?.name || "Unknown"}</span>
                <button
                  onClick={() => deletePost(post._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
