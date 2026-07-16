import React from "react";
import { Outlet } from "react-router-dom";
import HomeLeftbar from "./HomeLeftbar";
import HomeRightbar from "./HomeRightbar";
import Navbar from "../Navbar";

const HomeLayout = () => {
  return (
    <div className="bg-[#faf8f2] dark:bg-background">
      <Navbar />
      <div className="flex mt-2 dark:mt-2 justify-between max-w-7xl mx-auto ">
        <div>
          <HomeLeftbar />
        </div>
        <div className="flex-1 px-2">
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
