import React from "react";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreatePost from "./pages/posts/CreatePost";
import { AuthProvider } from "./context/AuthContext";
import UserPosts from "./pages/posts/UserPosts";
import AllUsers from "./pages/users/AllUsers";
import PostDetail from "./pages/posts/PostDetail";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />

            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/user/:userId/posts" element={<UserPosts />} />

            {/* Post detail */}
            <Route path="/posts/:postId" element={<PostDetail />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
