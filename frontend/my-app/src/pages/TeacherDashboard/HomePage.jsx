import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TeacherHomePage = () => {
  const [teacher, setTeacher] = useState({});

  // fetch teacher
  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await API.get("/api/teachers/me");
        setTeacher(res.data.teacher);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, []);

  return (
    <div className="p-3">
      <h2 className="text-xl font-bold my-t-5 ml-2 mb-5">Dashboard</h2>
      <h2 className="my-5 text-lg">Welcome Tr. {teacher?.accountId?.name} 🙂</h2>
      <h2 className="text-xl font-bold my-t-5 ml-2 mb-5">MyClasses</h2>
      <div className="grid grid-cols-1 max-w-100 gap-3">
        {teacher.classes?.map((c) => (
          <div key={c._id} className="py-3 card">
            <Link to={`/teacher-dashboard/my-classes/${c._id}`}>
              <h2 className="uppercase mb-2">Department: {c.department}</h2>
              <h2>Section: {c.section}</h2>
            </Link>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-5 ml-2">Pending Assignments</h2>
      <h2 className="text-xl font-bold mt-5 ml-2">Active Quizzes</h2>
      <h2 className="text-xl font-bold mt-5 ml-2">Quick Action</h2>
      <h2 className="text-xl font-bold mt-5 ml-2">Submissions</h2>
    </div>
  );
};

export default TeacherHomePage;
