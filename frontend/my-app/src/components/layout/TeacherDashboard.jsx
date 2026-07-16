import React from "react";
import { Outlet } from "react-router-dom";
import TeacherTopbar from "./TeacherTopbar";
import TeacherSidebar from "./TeacherSidebar";

const TeacherDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sticky top-0 z-50">
        <TeacherSidebar />
      </div>

      <div className="flex flex-1 flex-col justify-start items-start w-full">
        {/* Topbar */}
        <div className="sticky top-0 z-40 bg-muted w-full">
          <TeacherTopbar />
        </div>

        {/* Pages */}
        <div className="w-full p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
