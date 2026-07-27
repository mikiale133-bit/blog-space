import React from "react";
import { Outlet } from "react-router-dom";
import TeacherTopbar from "./TeacherTopbar";
import TeacherSidebar from "./TeacherSidebar";
import { useToggleStore } from "@/store/toggle";

const TeacherDashboard = () => {
  const teacherSidebarOpened = useToggleStore((s) => s.teacherSidebarOpened);
  return (
    <div className="flex w-full dark:bg-background">
      {/* Sidebar */}
      <div className="sticky top-0 z-50">
        <TeacherSidebar />
      </div>

      <div className="flex flex-1 flex-col justify-start items-start w-full max-h-screen overflow-auto">
        {/* Topbar */}

        <div className={`w-full ${teacherSidebarOpened && "md:ml-px"}`}>
          <TeacherTopbar />
        </div>

        {/* Pages */}
        <div className={`w-full h-full ${teacherSidebarOpened && "md:ml-1"} overflow-y-auto no-scrollbar p-3 bg-slate-50 dark:bg-muted/50`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
