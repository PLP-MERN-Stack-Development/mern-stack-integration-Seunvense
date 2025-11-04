import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        setPosts(data.posts || data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load posts. Please try again.');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center p-8">Loading posts...</p>;
  if (error) return <p className="text-red-500 text-center p-8">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blog Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">
          No posts yet. <Link to="/create" className="text-blue-600 hover:underline">Create one!</Link>
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post._id} className="border rounded-lg p-5 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">
                <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-3">
                {post.excerpt || post.content.substring(0, 120)}...
              </p>
              <div className="text-sm text-gray-500">
                <span>By {post.author?.name || 'Unknown'}</span> |{' '}
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}