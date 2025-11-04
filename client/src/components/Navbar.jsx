import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MERN Blog
        </Link>
        <Link
          to="/create"
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 font-medium"
        >
          + New Post
        </Link>
      </div>
    </nav>
  );
}