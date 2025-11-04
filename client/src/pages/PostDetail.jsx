import { useParams, Link } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function PostDetail() {
  const { id } = useParams();
  const { posts, loading, error } = usePosts();

  const post = posts.find((p) => p._id === id);

  if (loading) return <p className="text-center p-8">Loading post...</p>;
  if (error) return <p className="text-red-500 text-center p-8">{error}</p>;
  if (!post) return <p className="text-center p-8">Post not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Posts
      </Link>
      <article className="bg-white p-8 rounded-lg shadow">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6 flex gap-4">
          <span>By {post.author?.name || "Unknown"}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          {post.category && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              #{post.category.name}
            </span>
          )}
        </div>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </article>
    </div>
  );
}
