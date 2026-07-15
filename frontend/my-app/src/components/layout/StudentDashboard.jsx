import React from "react";
import StudentSidebar from "./StudentSidebar";
import StudentTopbar from "./StudentTopbar";
import { Outlet } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <StudentSidebar />

      <div className="flex flex-1 flex-col justify-start items-start w-full">
        {/* Topbar */}
        <div className="sticky top-0  z-40  w-full bg-background dark:bg-muted">
          <StudentTopbar />
        </div>

        {/* Pages */}
        <div className="w-full px-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
