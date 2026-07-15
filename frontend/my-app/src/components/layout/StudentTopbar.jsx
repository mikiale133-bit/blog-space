import ThemeToggle from "@/context/Toggle";
import { useToggleStore } from "@/store/toggle";
import { ChevronLeft, Text } from "lucide-react";
import React from "react";

const StudentTopbar = () => {
  const openSidebar = useToggleStore((s) => s.openSidebar);
  const sidebarOpen = useToggleStore((s) => s.sidebarOpen);
  return (
    <div className="p-4 bg-muted/20 w-full border-b border-border flex justify-between">
      <div className="hidde md:flex">
        <Text onClick={openSidebar} className={`${sidebarOpen ? "hidden" : ""} max-md:hidden`} />

        <div className="flex md:hidden gap-1 items-center">
          <ChevronLeft />
          Quizzes
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

export default StudentTopbar;
