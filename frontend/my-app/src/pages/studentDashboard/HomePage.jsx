import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentHomePage = () => {
  const [student, setStudent] = useState({});

  // fetch teacher
  useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await API.get("/api/students/get-me");
        setStudent(res.data.student);
      } catch (error) {
        console.log(error);
      }
    };
    getStudent();
  }, []);

  return (
    <div className="p-3">
      <h2 className="text-2xl font-bold my-5 ml-2">MyClasse</h2>

      <h2>Student: {student?.accountId?.name}</h2>
      <h2>Class: {student?.class}</h2>
    </div>
  );
};

export default StudentHomePage;
