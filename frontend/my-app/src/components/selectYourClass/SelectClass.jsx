import { API } from "@/api/Axios";
import { useSelectStore } from "@/store/store";
import React, { useEffect, useState } from "react";

const SelectClassComponent = () => {
  const selectedClass = useSelectStore((s) => s.selectedClass);
  const setClass = useSelectStore((s) => s.setClass);

  // Fetch Subjects on mount
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await API.get("/api/classes/teacher-classes");
        setClasses(res.data.classes || []);
      } catch (err) {
        console.log("Error fetching classes:", err.response?.data?.message);
        alert("Error", err.response.data.message);
      }
    };
    fetchClasses();
  }, []);

  // --- VIEW 1: SUBJECT SELECTION SCREEN ---

  return (
    <div className="max-w-4xl px-4 py-12 mx-auto">
      <div className="mb-6 ">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Select a Class</h1>
        <p>You can change this later</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {classes.map((c) => (
          <button
            onClick={() => setClass(c._id)}
            key={c._id}
            className={`p-4 hover:card bg-white dark:bg-slate-800 border-2 ${c._id === selectedClass ? "border-card-border" : "border-transparent hover:border-card-border"}  shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 group`}
          >
            <div
              className={`text-lg font-semibold ${c._id === selectedClass ? "text-indigo-600" : "text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"} `}
            >
              <h2>Section: {c.section}</h2>
              <h2>{c.department}</h2>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectClassComponent;
