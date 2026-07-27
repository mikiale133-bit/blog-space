import React from "react";
import { Outlet } from "react-router-dom";
import HomeLeftbar from "./HomeLeftbar";
import HomeRightbar from "./HomeRightbar";
import Navbar from "../Navbar";
import { useToggleStore } from "@/store/toggle";
import { X } from "lucide-react";

const HomeLayout = () => {
  const sidebarOpen = useToggleStore((s) => s.sidebarOpen);
  const closeSidebar = useToggleStore((s) => s.closeSidebar);
  return (
    <div className="bg-blue-50/50 dark:bg-background">
      <Navbar />
      <div className="flex mt-0.5 justify-between gap-3  mx-auto md:px-5">
        <div className={`${sidebarOpen ? "relative max-md:absolute top-0 left-0 z-50 md:z-40" : "max-md:hidden"}`}>
          <HomeLeftbar />
          <X onClick={closeSidebar} className="absolute top-3 right-3" />
        </div>
        <div className="flex-1 px-2 bg-blue-50/50 dark:bg-background">
          <Outlet />
        </div>

        <div>
          <HomeRightbar />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
