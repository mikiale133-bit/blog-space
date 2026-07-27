// import { useToggleStore } from "@/store/toggle";
import { useAuthStore } from "@/store/useAuthStore";
import { DatabaseSearch, Grid2X2XIcon, History, PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomeLeftbar = () => {
  // const sidebarOpen = useToggleStore((state) => state.sidebarOpen);
  const user = useAuthStore((state) => state.user);
  const link = user?.role === "teacher" ? "/teacher/select" : "/student/select";

  console.log(user?.role);

  return (
    <aside className={`sticky top-20 `}>
      <section className="bg-white py-5 dark:bg-muted/50 w-60 max-md:h-screen p-3">
        <h2 className="font-bold text-lg mb-3">Sidebar</h2>
        <div className="pt-7 flex flex-col gap-1">
          <Link to={"/"} className="flex gap-2 items-center p-1">
            <Grid2X2XIcon size={18} className="" />
            <p>Home</p>
          </Link>

          {user?.role === "teacher" || user?.role === "student" ? (
            <Link to={link} className="flex gap-2 items-center p-1">
              <PlusCircle size={18} className="" />
              <p>Dashboard</p>
            </Link>
          ) : (
            ""
          )}

          <Link to={"/"} className="flex gap-2 items-center p-1">
            <DatabaseSearch size={18} className="" />
            <p>Publish</p>
          </Link>

          <Link to={"/"} className="flex gap-2 items-center p-1">
            <History size={18} className="" />
            <p>History</p>
          </Link>
        </div>
      </section>

      <section className="mt-5 flex flex-col gap-1 items-center bg-white py-5 dark:bg-muted/50 top-0 w-60 max-md:h-screen p-3">
        <h2 className="font-bold text-lg mb-">Promotion</h2>
        <p className="capitalize text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <button className="bg-[#008e82] text-white px-5 py-2 mt-3">Signin for free</button>
      </section>
    </aside>
  );
};

export default HomeLeftbar;
