import React from "react";
import { Outlet } from "react-router-dom";
import TeacherTopbar from "./TeacherTopbar";
import TeacherSidebar from "./TeacherSidebar";

const TeacherDashboard = () => {
  return (
    <div className={`w-full dark:bg-background`}>
      <TeacherSidebar />

      <TeacherTopbar />

      {/* Pages */}
      <div className={`w-full min-h-[calc(100vh-128px)] overflow-y-auto no-scrollbar bg-slate-50 dark:bg-muted/50`}>
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherDashboard;
