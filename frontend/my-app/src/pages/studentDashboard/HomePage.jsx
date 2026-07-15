import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentHomePage = () => {
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
      <h2 className="text-2xl font-bold my-5 ml-2">MyClasses</h2>

      <h2>Teacher: {teacher?.accountId?.name}</h2>
      {teacher.classes?.map((c) => (
        <div key={c._id} className="py-3">
          <Link to={`/teacher-dashboard/my-classes/${c._id}`}>
            <h2>Department: {c.department}</h2>
            <h2>Section: {c.section}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default StudentHomePage;
