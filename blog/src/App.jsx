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
        {/* <Header /> */}
        <Routes>
          {/* <Route path="/dashboard" element={<PrivateRoute element={<PostCard />} />} /> */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/start" element={<LandingPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/icon" element={<IconStrip />} />
          {/* <Route path="/index" element={<Index />} /> */}
        </Routes>
      </Router>
    </>
  );
}
export default App;