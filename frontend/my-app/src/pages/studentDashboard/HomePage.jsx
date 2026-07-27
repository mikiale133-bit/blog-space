import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StudentHomePage() {
  const [student, setStudent] = useState({});

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
    <div className="max-w-4xl mx-auto px-6 py-10 font-sans text-slate-900">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {student.name || "Student"} 👋</h1>
        <p className="text-sm text-slate-500 mt-1">Here is what is happening with your studies today.</p>
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column: Quizzes and Assessments */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quizzes and Assessments</h2>

          <ul className="space-y-3 text-sm">
            <li>
              <span className="mr-2">👊</span>
              <span className="font-medium">Mathematics</span>
              <span className="text-slate-500"> → 4 quizzes</span>
            </li>
            <li>
              <span className="mr-2">🔦</span>
              <span className="font-medium">English</span>
              <span className="text-slate-500"> → 2 quizzes, 3 assessments</span>
            </li>
            <li>
              <span className="mr-2">✋🏼</span>
              <span className="font-medium">Physics</span>
              <span className="text-slate-500"> → 2 quizzes, 2 assessments</span>
            </li>
            <li>
              <span className="mr-2">🔑</span>
              <span className="font-medium">Biology</span>
              <span className="text-slate-500"> → 2 quizzes, 1 assignment</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Upcoming Schedule / Tasks */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Physics Lab Submission</span>
              <span className="text-slate-500">Today</span>
            </li>
            <li className="flex justify-between">
              <span>English Literature Quiz</span>
              <span className="text-slate-500">Tomorrow</span>
            </li>
            <li className="flex justify-between">
              <span>Biology Chapter Reading</span>
              <span className="text-slate-500">Jul 28</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>

        <ul className="space-y-3 text-sm">
          <li>
            <span className="mr-2">👊</span>
            <span className="font-medium">Mathematics</span>
            <span className="text-slate-500"> → 4 quizzes</span>
          </li>
          <li>
            <span className="mr-2">🔦</span>
            <span className="font-medium">English</span>
            <span className="text-slate-500"> → 2 quizzes, 3 assessments</span>
          </li>
          <li>
            <span className="mr-2">✋🏼</span>
            <span className="font-medium">Physics</span>
            <span className="text-slate-500"> → 2 quizzes, 2 assessments</span>
          </li>
          <li>
            <span className="mr-2">🔑</span>
            <span className="font-medium">Biology</span>
            <span className="text-slate-500"> → 2 quizzes, 1 assignment</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
