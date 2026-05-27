import React from "react";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreatePost from "./pages/posts/CreatePost1";
import { AuthProvider } from "./context/AuthContext";
import AllUsers from "./pages/users/AllUsers";
import PostDetail from "./pages/posts/PostDetail";
import Navbar from "./components/Navbar";

import UserProfile from "./pages/users/UserProfile";
import Settings from "./pages/Settings";
import HomePageLoader from "./components/Loaders/Homepage";
import Upload from "./imageUpload/Upload";
import Dashbord from "./pages/dashboard/Dashbord";

// dashboard

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <div className="sticky w-full top-0 left-0 z-3">
            <Navbar />
          </div>

          <div className="">
            <Routes>
              <Route path="/loader" element={<HomePageLoader />} />
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashbord />}>
                {/* <Route path="users" element={<Users />} /> */}
                {/* <Route path="report" element={<Report />} /> */}
              </Route>

              {/* Auth */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />

              {/* Post */}
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/create-post" element={<CreatePost />} />

              {/* Users */}
              <Route path="/users" element={<AllUsers />} />
              <Route path="/users/:id" element={<UserProfile />} />

              <Route path="/settings" element={<Settings />} />
              <Route path="/images" element={<Upload />} />
              {/* <Route path="/editor" element={<Editor />} /> */}
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
