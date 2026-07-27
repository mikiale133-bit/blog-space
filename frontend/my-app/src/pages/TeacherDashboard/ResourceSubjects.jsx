import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ResourceSubjects = () => {
  // Fetch Subjects on mount
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await API.get("/api/subjects");
        setSubjects(res.data.subjects || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  // --- VIEW 1: SUBJECT SELECTION SCREEN ---

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Select a Subject</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((sub) => (
          <Link
            to={`/resources/${sub._id}`}
            key={sub._id}
            className="p-4 hover:card bg-white dark:bg-slate-800 border-2 border-transparent hover:border-card-border shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 group"
          >
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {sub.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResourceSubjects;
