import ThemeToggle from "@/context/Toggle";
import React from "react";

const TeacherTopbar = () => {
  return (
    <div className="relative flex justify-end w-full h-20 p-4 bg-white border-b md:hidden border-border dark:bg-muted">
      <div className="flex items-center justify-end gap-3">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default TeacherTopbar;
