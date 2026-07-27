import SelectClassComponent from "@/components/selectYourClass/SelectClass";
import { useSelectStore } from "@/store/store";
import React from "react";
import { Link } from "react-router-dom";

const SelectClass = () => {
  const selectedClass = useSelectStore((s) => s.selectedClass);
  return (
    <div className="max-w-4xl mx-auto">
      <SelectClassComponent />

      <div className="text-end">
        <Link to={`/teacher-dashboard?class=${selectedClass}`} className="px-4 py-2 bg-blue-700 text-white mt-5 ml-auto">
          Continue To Dashboard
        </Link>
      </div>
    </div>
  );
};

export default SelectClass;
