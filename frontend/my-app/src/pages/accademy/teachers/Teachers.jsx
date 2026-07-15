import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  // Create teacher
  const createTeacher = async () => {
    try {
      const res = await API.post(`/api/teachers`, {
        subject: "Maths",
        classes: ["6a46cbb2a8318535d86283c2", "6a46cbd8a8318535d86283c8", "6a46cbe4a8318535d86283ca"],
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await API.get("/api/teachers");

        setTeachers(res.data.teachers);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, []);
  return (
    <div className="max-w-5xl mx-auto px-3 pt-10">
      <h2 className="font-bold text-2xl mb-5">Teachers</h2>
      {teachers?.map((t) => (
        <div className="py-2">
          <Link key={t._id} to={`/teachers/${t._id}`}>
            <h2>Name: {t.accountId?.name}</h2>
            <h2>Email: {t.accountId?.email}</h2>
            <h2>Subject: {t.subject}</h2>
          </Link>
        </div>
      ))}

      <button onClick={createTeacher} className="px-3 py-1 border m-3">
        Add Teacher
      </button>
    </div>
  );
};

export default Teachers;
