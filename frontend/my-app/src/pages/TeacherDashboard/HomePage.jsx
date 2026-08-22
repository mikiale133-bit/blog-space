import { API } from "@/api/Axios";
import QuizForm from "@/components/pages/QuizForm";
import React, { useEffect, useState } from "react";

const TeacherHomePage = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const res = await API.get("/api/teachers/me");
        setTeacher(res.data.teacher || {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, []);

  if (loading) return <div className="p-4 font-mono">Loading dashboard...</div>;

  return (
    <div className="max-w-5xl p-4 mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b-2 border-black">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Dashboard</h1>
        <p className="mt-1 text-md">
          Welcome back, <span className="font-bold">Tr. {teacher?.accountId?.name}</span> 🙂
        </p>
      </div>
    </div>
  );
};

export default TeacherHomePage;
