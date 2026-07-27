import ThemeToggle from "@/context/Toggle";
import { useToggleStore } from "@/store/toggle";
import { ChevronLeft, Text } from "lucide-react";
import React from "react";

const TeacherTopbar = () => {
  const openSidebar = useToggleStore((s) => s.openTeacherSidebar);
  const sidebarOpen = useToggleStore((s) => s.teacherSidebarOpened);

  return (
    <div className="p-4 w-full h-20 relative bg-white dark:bg-muted flex justify-between">
      <div className="hidde md:flex">
        <Text onClick={openSidebar} className={`${sidebarOpen ? "hidden" : ""} max-md:hidden`} />

        <div className="flex md:hidden gap-0.5 text-sm items-center">
          <ChevronLeft size={18} />
          <p className="mb-"> Home</p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div>
          <ThemeToggle />
        </div>
        <Text onClick={openSidebar} className={`md:hidden w-6 h-6`} />
      </div>
    </div>
  );
};

export default TeacherTopbar;
