import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostList from './pages/PostList.jsx';
import CreatePost from './pages/CreatePost.jsx';
import PostDetail from './pages/PostDetail.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<PostList />} />
             <Route path="/create" element={<CreatePost />} />
             <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;