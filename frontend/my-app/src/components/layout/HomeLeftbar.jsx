import { DatabaseSearch, Grid2X2XIcon, History, PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomeLeftbar = () => {
  return (
    <aside className="h-158 p-3 pt-5 bg-white top-20 w-60 flex-1 max-lg:hidden sticky">
      <h2 className="font-bold text-lg mb-3">Sidebar</h2>

      <div className="pt-7 flex flex-col gap-1">
        <Link to={"/"} className="flex gap-2 items-center p-1">
          <Grid2X2XIcon />
          <p>Home</p>
        </Link>

        <Link to={"/teacher-dashboard"} className="flex gap-2 items-center p-1">
          <PlusCircle />
          <p>Dashboard</p>
        </Link>

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
