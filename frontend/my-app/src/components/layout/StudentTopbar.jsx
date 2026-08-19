import ThemeToggle from "@/context/Toggle";

import { ChevronLeft, Text } from "lucide-react";
import React from "react";

const StudentTopbar = () => {
  return (
    <div className="flex items-center justify-end w-full p-3 bg-white md:hidden h-15 md:h-20 dark:bg-muted">
      <div className="flex items-center gap-3">
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default StudentTopbar;
