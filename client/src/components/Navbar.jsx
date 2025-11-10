import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MERN Blog
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline">Welcome, {user.name}</span>
              <Link
                to="/create"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 font-medium"
              >
                + New Post
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
