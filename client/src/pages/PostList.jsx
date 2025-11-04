import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostContext';

export default function PostList() {
  const { posts, loading, error, deletePost } = usePosts();

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
                {post.excerpt || post.content?.substring(0, 120) || "No content"}...
              </p>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>By {post.author?.name || 'Unknown'}</span>
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