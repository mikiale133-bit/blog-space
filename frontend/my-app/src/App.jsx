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
import CreateSubject from "./pages/accademy/admin/CreateSubject";
import Teachers from "./pages/accademy/teachers/Teachers";
import TeacherDashboard from "./components/layout/TeacherDashboard";
import RegisterStudent from "./pages/auth/RegisterStudent";
import Quizzes from "./pages/TeacherDashboard/Quizzes";
import Assessments from "./pages/TeacherDashboard/Assessments";
import Resources from "./pages/TeacherDashboard/Resources";
import Messages from "./pages/TeacherDashboard/Messages";
import TSettings from "./pages/TeacherDashboard/Settings";
import TeacherHomePage from "./pages/TeacherDashboard/HomePage";

// STUDENTS
import SQuizzes from "./pages/studentDashboard/SQuizzes";
import StudentDashboard from "./components/layout/StudentDashboard";
import SQuizDetails from "./pages/studentDashboard/SQuizDetails";
import StudentHomePage from "./pages/studentDashboard/HomePage";
import SAssignments from "./pages/studentDashboard/SAssignments";
import HomeLayout from "./components/layout/HomeLayout";
import Profile from "./pages/users/Profile";
import SAssessmentDetails from "./pages/studentDashboard/SAssessmentDetails";
import Resources1 from "./pages/TeacherDashboard/ResourceForm";
import Community from "./pages/accademy/Community";
import CreateChapters from "./pages/accademy/admin/CreateChapters";
import LandingPage from "./LandingPage";
import ResourceSubjects from "./pages/TeacherDashboard/ResourceSubjects";
import SelectClass from "./pages/TeacherDashboard/SelectClass";
import GroupsPage from "./pages/TeacherDashboard/Groups";
import SMessages from "./pages/studentDashboard/SMessages";
import SSettings from "./pages/studentDashboard/SSettings";
import SChat from "./pages/studentDashboard/SChat";
import SNotifications from "./pages/studentDashboard/SNotifications";
import Chapters from "./pages/studentDashboard/Chapters";

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
              </Route>
              <Route path="posts/:id" element={<PostDetail />} />

              <Route path="/teacher/select" element={<SelectClass />} />

              {/* TEACHER DASHBOARD */}
              <Route path="/teacher-dashboard" element={<TeacherDashboard />}>
                <Route path="" element={<TeacherHomePage />} />
                <Route path="students" element={<TeacherHomePage />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="assessments" element={<Assessments />} />
                <Route path="groups" element={<GroupsPage />} />
                <Route path="resources/select-subject" element={<ResourceSubjects />} />
                <Route path="settings" element={<TSettings />} />
                <Route path="messages" element={<Messages />} />
              </Route>

              {/* STUDENT DASHBOARD */}
              <Route path="/student-dashboard" element={<StudentDashboard />}>
                <Route path="" element={<StudentHomePage />} />
                <Route path="quizzes" element={<SQuizzes />} />
                <Route path="quizzes/:id" element={<SQuizDetails />} />
                <Route path="assessments" element={<SAssignments />} />
                <Route path="assessments/:id" element={<SAssessmentDetails />} />
                <Route path="messages" element={<SMessages />} />
                <Route path="notifications" element={<SNotifications />} />
                <Route path="settings" element={<SSettings />} />
                <Route path="chat" element={<SChat />} />
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
              <Route path="/landing-page" element={<LandingPage />} />

              {/* Accademy */}
              <Route path="/quiz" element={<Quize />} />
              <Route path="/my-class" element={<MyStudents />} />
              <Route path="/teacher/assignments" element={<Assignments />} />
              <Route path="/add-class" element={<CreateClasses />} />
              <Route path="/teachers/register" element={<Teachers />} />
              <Route path="/resources/:subjectId" element={<Resources />} />
              <Route path="/subjects/:subjectId" element={<ResourceSubjects />} />
              <Route path="/subjects/:subjectId/chapters" element={<Chapters />} />
              <Route path="/subjects/:subjectId/quizzes" element={<SQuizzes />} />
              <Route path="/subjects/:subjectId/assessments" element={<SAssignments />} />

              {/* Practice */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/resources" element={<Resources1 />} />
              <Route path="/community" element={<Community />} />
              <Route path="/students/register" element={<RegisterStudent />} />
              <Route path="create-subject" element={<CreateSubject />} />
              <Route path="/create-chapters" element={<CreateChapters />} />
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
