import { useToggleStore } from "@/store/toggle";
import { ChevronLeft, Text } from "lucide-react";
import React from "react";

const TeacherTopbar = () => {
  const openSidebar = useToggleStore((s) => s.openSidebar);
  const sidebarOpen = useToggleStore((s) => s.sidebarOpen);

  return (
    <div className="p-4 bg-muted/20 w-full border-b border-border flex justify-between">
      <div className="hidde md:flex">
        <Text onClick={openSidebar} className={`${sidebarOpen ? "hidden" : ""} max-md:hidden`} />

        <div className="flex gap-1 items-center">
          <ChevronLeft />
          Quizzes
        </div>
      </div>

      <div>
        <Text onClick={openSidebar} className={`md:hidden`} />
      </div>
    </div>
  );
};

export default TeacherTopbar;
