import { API } from "@/api/Axios";
import { BookOpen, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
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

  return (
    <div className="py-3 mx-auto md:p-6 max-w-7xl">
      <div className="flex items-center gap-2 mb-6 ml-2">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold tracking-tight">Select Subject</h2>
      </div>

      {subjects.length === 0 ? (
        <div className="px-4 py-12 text-center border-dashed opacity-75 card">
          <p className="m-0 text-base font-medium">No subjects available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {subjects.map((sub) => (
            <Link
              to={`/subjects/${sub._id}`}
              key={sub._id}
              className="flex items-center justify-between p-5 transition-all border cursor-pointer card hover:shadow-md border-border"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="m-0 text-base font-bold">{sub.name}</h3>
                  {sub.code && <span className="text-xs opacity-60">{sub.code}</span>}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 opacity-50" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
