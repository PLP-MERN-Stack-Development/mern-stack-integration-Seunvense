import { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';

console.log("✅ CreatePost component loaded");

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });
  const [errors, setErrors] = useState({});
  const { createPost } = usePosts();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createPost({
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      });
      navigate('/');
    } catch (err) {
      setErrors({ submit: 'Failed to create post. Try again.' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="8"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your post..."
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="react, javascript, mern"
          />
        </div>

        {errors.submit && <p className="text-red-500">{errors.submit}</p>}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}