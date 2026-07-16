import { useToggleStore } from "@/store/toggle";
import { useAuthStore } from "@/store/useAuthStore";
import { DatabaseSearch, Grid2X2XIcon, History, PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomeLeftbar = () => {
  const sidebarOpen = useToggleStore((state) => state.sidebarOpen);
  const user = useAuthStore((state) => state.user);
  const link = user?.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard";

  console.log(user?.role);

  return (
    <aside className={` bg-white dark:bg-muted/50 top-20 w-60 h-158 p-3 pt-5 ${sidebarOpen ? "fixed top-0" : "max-md:hidden"} sticky`}>
      <h2 className="font-bold text-lg mb-3">Sidebar</h2>

      <div className="pt-7 flex flex-col gap-1">
        <Link to={"/"} className="flex gap-2 items-center p-1">
          <Grid2X2XIcon />
          <p>Home</p>
        </Link>

        {user?.role === "teacher" || user?.role === "student" ? (
          <Link to={link} className="flex gap-2 items-center p-1">
            <PlusCircle />
            <p>Dashboard</p>
          </Link>
        ) : (
          ""
        )}

        <Link to={"/"} className="flex gap-2 items-center p-1">
          <DatabaseSearch />
          <p>Publish</p>
        </Link>

        <Link to={"/"} className="flex gap-2 items-center p-1">
          <History />
          <p>History</p>
        </Link>
      </div>
    </aside>
  );
};

export default HomeLeftbar;
