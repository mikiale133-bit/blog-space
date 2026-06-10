import React from "react";
import { Dot } from "lucide-react";

const DotLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2 gap-2">
      {/* First Dot */}
      <div className="animate-[bounce_1.4s_infinite_0s] ease-in-out bg-linear-to-r from-blue-300  to-indigo-600 rounded-full w-4 h-4">
        <Dot className="text-transparent" />
      </div>

      {/* Second Dot */}
      <div className="animate-[bounce_1.4s_infinite_0.2s] ease-in-out bg-blue-600 rounded-full w-4 h-4">
        <Dot className="text-transparent" />
      </div>

      {/* Third Dot */}
      <div className="animate-[bounce_1.4s_infinite_0.4s] ease-in-out bg-linear-to-r from-blue-300  to-indigo-600 rounded-full w-4 h-4">
        <Dot className="text-transparent" />
      </div>
    </div>
  );
};

export default DotLoader;
