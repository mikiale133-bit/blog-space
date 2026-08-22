// import { useToggleStore } from "@/store/toggle";
import { useToggleStore } from "@/store/toggle";
import { useAuthStore } from "@/store/useAuthStore";
import { DatabaseSearch, Grid2X2XIcon, History, PlusCircle, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomeLeftbar = () => {
  const sidebarOpen = useToggleStore((state) => state.sidebarOpen);
  const closeSidebar = useToggleStore((state) => state.closeSidebar);

  const user = useAuthStore((state) => state.user);
  // const link = user?.role === "teacher" ? "/teacher/select" : "/student-dashboard";

  console.log(user?.role);

  return (
    <aside
      className={`${sidebarOpen ? "w-60" : "max-lg:w-0"} overflow-hidden transition-all bg-background md:bg-blue-50/50 duration-200 fixed z-50 lg:sticky top-16 max-lg:h-screen border-r border-border dark:border-gray-900 dark:bg-background h-[calc(100vh-64px)]`}
    >
      <header className="flex items-center justify-between p-3 lg:hidden">
        <h2>Sidebar</h2>
        <X size={18} onClick={closeSidebar} />
      </header>

      <div className="flex flex-col gap-2 px-2 py-5">
        <Link>Home</Link>
        <Link>Avatar</Link>
        <Link>Stories</Link>
        <Link>Saved</Link>
        <Link>Liked</Link>
        <Link>My Posts</Link>
        <Link>Help Center</Link>
      </div>
    </aside>
  );
};

export default HomeLeftbar;
