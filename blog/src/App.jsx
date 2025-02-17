// import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/UserProfile';
import IconStrip from './components/IconStrip';
import LandingPage from './pages/LandingPage';
import FullPostCard from './components/post/FullPostCard';
import PostCard from './components/post/PostCard';
import Sidebar from './components/header/Sidebar';
import AddPost from './components/post/AddPost';

// import PostCard from './components/PostCard';
// import Login from './components/auth/Login';
// import ManageHeader from './pages/ManageHeader';
// import PrivateRoute from './components/PrivateRoute';
// import Home from './pages/Home';
;// import LandingPage from './pages/LandingPage';
// import Profile from './pages/Profile';

function App() {
  return (
    <>
     <Router>
        <div className="flex">
          {/* Sidebar */}
          {/* <Sidebar /> */}
          <Sidebar />
          
          {/* Main Content */}
          <div className="flex-1 ">
            {/* <Header />  This goes below Sidebar */}
            <Routes>
              <Route path="/home"  element={<PrivateRoute element={<Home />} />} />
              <Route path="/write/post" element={<PrivateRoute element={<AddPost />} />} />
              <Route path="/" element={<PrivateRoute element={<Home />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
              <Route path="/post" element={<PrivateRoute element={<FullPostCard />} />} />
              <Route path="/start" element={<LandingPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}
export default App;