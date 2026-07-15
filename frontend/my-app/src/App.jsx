import React from "react";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreatePost from "./pages/posts/CreatePost1";
import { AuthProvider } from "./context/AuthContext";
import AllUsers from "./pages/users/AllUsers";
import PostDetail from "./pages/posts/PostDetail";

import UserProfile from "./pages/users/UserProfile";
import PostProfile from "./pages/posts/PostProfile";
import Settings from "./pages/Settings";
import HomePageLoader from "./components/Loaders/Homepage";
import Upload from "./imageUpload/Upload";
import ChatInterface from "./bot/ChatInterface";
import BestSelling from "./BestSellings";

// TEACHER
import Quize from "./pages/accademy/Quize";
import MyStudents from "./pages/accademy/teachers/MyStudents";
import Assignments from "./pages/accademy/teachers/Assignments";
import CreateClasses from "./pages/accademy/admin/CreateClasses";
import ClassDetails from "./pages/accademy/admin/ClassDetails";
import Teachers from "./pages/accademy/teachers/Teachers";
import TeacherDashboard from "./components/layout/TeacherDashboard";
import RegisterStudent from "./pages/auth/RegisterStudent";
import Quizzes from "./pages/TeacherDashboard/Quizzes";
import Assessments from "./pages/TeacherDashboard/Assessments";
import Resources from "./pages/TeacherDashboard/Resources";
import Results from "./pages/TeacherDashboard/Results";
import Submissions from "./pages/TeacherDashboard/Submissions";
import Messages from "./pages/TeacherDashboard/Messages";
import TSettings from "./pages/TeacherDashboard/Settings";
import Feedbacks from "./pages/TeacherDashboard/Feedbacks";
import TeacherHomePage from "./pages/TeacherDashboard/HomePage";

// STUDENTS
import SQuizzes from "./pages/studentDashboard/SQuizzes";
import StudentDashboard from "./components/layout/StudentDashboard";
import SQuizDetails from "./pages/studentDashboard/SQuizDetails";
import StudentHomePage from "./pages/studentDashboard/HomePage";
import SAssignments from "./pages/studentDashboard/SAssignments";
import SMyclasses from "./pages/studentDashboard/SMyclasses";
import SResources from "./pages/studentDashboard/SResources";
import SProgress from "./pages/studentDashboard/Progress";
import HomeLayout from "./components/layout/HomeLayout";
import Profile from "./pages/users/Profile";
import SAssessmentDetails from "./pages/studentDashboard/SAssessmentDetails";
import Resources1 from "./pages/TeacherDashboard/Resources1";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <div className="">
            <Routes>
              <Route path="/loader" element={<HomePageLoader />} />

              {/* <Route path="" element={<Home />} /> */}

              {/* HOME LAYOUT */}
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="posts/:id" element={<PostDetail />} />
              </Route>

              {/* TEACHER DASHBOARD */}
              <Route path="/teacher-dashboard" element={<TeacherDashboard />}>
                <Route path="" element={<TeacherHomePage />} />
                <Route path="my-classes/:id" element={<ClassDetails />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="assessments" element={<Assessments />} />
                <Route path="results" element={<Results />} />
                <Route path="resources" element={<Resources />} />
                <Route path="submissions" element={<Submissions />} />
                <Route path="settings" element={<TSettings />} />
                <Route path="messages" element={<Messages />} />
                <Route path="feedbacks" element={<Feedbacks />} />
              </Route>

              {/* STUDENT DASHBOARD */}
              <Route path="/student-dashboard" element={<StudentDashboard />}>
                <Route path="" element={<StudentHomePage />} />
                <Route path="quizzes" element={<SQuizzes />} />
                <Route path="quizzes/:id" element={<SQuizDetails />} />
                <Route path="assessments" element={<SAssignments />} />
                <Route path="assessments/:id" element={<SAssessmentDetails />} />
                <Route path="classes" element={<SMyclasses />} />
                <Route path="resources" element={<SResources />} />
                <Route path="grades" element={<SProgress />} />
              </Route>

              {/* Auth */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/student/register" element={<RegisterStudent />} />

              {/* Post */}
              <Route path="/create-post" element={<CreatePost />} />

              {/* Users */}
              <Route path="/users" element={<AllUsers />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/posts/:id/profile" element={<PostProfile />} />

              <Route path="/settings" element={<Settings />} />
              <Route path="/images" element={<Upload />} />
              {/* <Route path="/editor" element={<Editor />} /> */}

              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/best" element={<BestSelling />} />

              {/* Accademy */}
              <Route path="/quiz" element={<Quize />} />
              <Route path="/my-class" element={<MyStudents />} />
              <Route path="/teacher/assignments" element={<Assignments />} />
              <Route path="/add-class" element={<CreateClasses />} />
              <Route path="/teachers" element={<Teachers />} />

              {/* Practice */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/resource" element={<Resources1 />} />
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
