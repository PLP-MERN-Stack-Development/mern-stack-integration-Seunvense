import { createContext, useContext, useState, useEffect } from 'react';
import { postService } from '../services/api';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getAllPosts();
      setPosts(data.posts || data);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const newPost = await postService.createPost(postData);
      // Optimistic update
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError('Failed to create post');
      throw err;
    }
  };

  const deletePost = async (id) => {
    setPosts(prev => prev.filter(p => p._id !== id));
    try {
      await postService.deletePost(id);
    } catch (err) {
      setError('Failed to delete');
      fetchPosts(); // Revert on error
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{
      posts,
      loading,
      error,
      fetchPosts,
      createPost,
      deletePost
    }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);