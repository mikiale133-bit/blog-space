import React from "react";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreatePost from "./components/CreatePost";
import { AuthProvider } from "./context/AuthContext";
// import UserPosts from "./pages/posts/UserPosts";
import AllUsers from "./pages/users/AllUsers";
import PostDetail from "./pages/posts/PostDetail";
import Navbar from "./components/Navbar";

import UserProfile from "./pages/users/UserProfile";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <div className="fixed w-full top-0 left-0 z-3">
            <Navbar />
          </div>
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Auth */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/posts/:postId" element={<PostDetail />} />

              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/users/:id" element={<UserProfile />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
{
  /* <Route path="/user/:userId/posts" element={<UserPosts />} /> */
}
