import { API } from "@/api/Axios";
import QuizForm from "@/components/pages/QuizForm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Mock Data for Design & Layout
const MOCK_ASSIGNMENTS = [
  { id: "a1", title: "Calculus Problem Set #3", class: "Pre-Engine 1", dueDate: "Tomorrow, 11:59 PM", totalCount: 28, submittedCount: 14 },
  { id: "a2", title: "Linear Algebra Essay", class: "Pre-Engine 2", dueDate: "Oct 24", totalCount: 30, submittedCount: 22 },
];

const MOCK_QUIZZES = [{ id: "q1", title: "Midterm Algebra Quiz", class: "Pre-Engine 1", status: "Live", endsIn: "2 hours" }];

const MOCK_SUBMISSIONS = [
  { id: "s1", student: "John Doe", title: "Calculus Problem Set #3", time: "10 mins ago" },
  { id: "s2", student: "Jane Smith", title: "Calculus Problem Set #3", time: "45 mins ago" },
];

const TeacherHomePage = () => {
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedClass, setSelectedClass] = useState(teacher?.classes[0]._id);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const teacherRes = await API.get("/api/teachers/me");
        const teacherData = teacherRes.data.teacher;
        setTeacher(teacherData);

        if (teacherData?._id) {
          const subjectsRes = await API.get(`/api/teachers/${teacherData._id}/subjects`);
          setSubjects(subjectsRes.data.subjects || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 font-mono">Loading dashboard...</div>;

  if (modal === "quiz") {
    return <QuizForm subjectId={selectedSubject} classId={selectedClass} />;
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wide">Dashboard</h1>
        <p className="text-md mt-1">
          Welcome back, <span className="font-bold">Tr. {teacher?.accountId?.name}</span> 🙂
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Your Classes */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 bg-white min-h-30">
            <h2 className="text-lg font-semibold mb-3">Selected Subject</h2>

            {subjects.map((sub) => (
              <div
                key={sub._id}
                onClick={() => setSelectedSubject(sub._id)}
                className={`${selectedSubject === sub._id ? "border-blue-800 bg-blue-100" : "bg-white border-transparent hover:border-blue-800 "} inline-block border-2 px-4 py-1 cursor-pointer hover:bg-blue-100  transition-all duration-500 active:scale-95`}
              >
                <h3 className="font-bold text-sm">{sub.name}</h3>
              </div>
            ))}
          </div>

          <div className="bg-white p-3">
            <h2 className="text-lg font-semibold mb-3">Select Class</h2>

            <div className="space-y-2">
              {teacher?.classes?.map((c) => (
                <div
                  key={c._id}
                  onClick={() => setSelectedClass(c._id)}
                  className={`${selectedClass === c._id ? "border-blue-800 bg-blue-100 dark:bg-background " : "bg-slate-200 border-transparent hover:border-blue-800 "} border-2 px-3 py-0.5 hover:bg-blue-100  transition-all duration-75 active:scale-98`}
                >
                  <div className="space-y-0">
                    <h3 className="font-bold text-lg">Section: {c.section}</h3>
                    <span className="text-xs text-gray-600 inline-block">{c.department}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Main Dashboard Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions Bar */}
          <div className="border-2 border-black p-4 bg-white">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-3">Quick Actions</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setModal("assessment")}
                className="border-2 border-black px-4 py-2 font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
              >
                + Create Assignment
              </button>
              <button
                onClick={() => setModal("quiz")}
                className="border-2 border-black px-4 py-2 font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
              >
                + New Quiz
              </button>
              <button className="border-2 border-black px-4 py-2 font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors">
                Grade Submissions
              </button>
            </div>
          </div>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pending Assignments Widget */}
            <div className=" p-4 bg-white">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-3">
                <h2 className="font-bold uppercase text-md">Pending Assignments</h2>
                <span className="text-xs font-bold">{MOCK_ASSIGNMENTS.length} Active</span>
              </div>
              <div className="space-y-3">
                {MOCK_ASSIGNMENTS.map((item) => (
                  <div key={item.id} className="border-b border-gray-300 pb-2 last:border-b-0">
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-gray-600">
                      {item.class} • Due: {item.dueDate}
                    </p>
                    <div className="mt-1 text-xs font-mono">
                      Submissions: {item.submittedCount}/{item.totalCount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Quizzes Widget */}
            <div className=" p-4 bg-white min-h-98">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-3">
                <h2 className="font-bold uppercase text-md">Active Quizzes</h2>
                <span className="text-xs font-bold">{MOCK_QUIZZES.length} Live</span>
              </div>
              <div className="space-y-3">
                {MOCK_QUIZZES.map((quiz) => (
                  <div key={quiz.id} className="border-b border-gray-300 pb-2 last:border-b-0">
                    <p className="font-bold text-sm">{quiz.title}</p>
                    <p className="text-xs text-gray-600">{quiz.class}</p>
                    <span className="mt-1 inline-block border border-black px-1.5 py-0.5 text-xs font-bold uppercase">Ends in: {quiz.endsIn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Submissions Feed Widget */}
          {/* <div className="border-2 border-black p-4 bg-white">
            <h2 className="font-bold uppercase text-md border-b-2 border-black pb-2 mb-3">Recent Submissions</h2>
            <div className="space-y-2">
              {MOCK_SUBMISSIONS.map((sub) => (
                <div key={sub.id} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-0">
                  <div>
                    <span className="font-bold text-sm">{sub.student}</span>
                    <span className="text-xs text-gray-600 block">{sub.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono">{sub.time}</span>
                    <button className="block text-xs font-bold underline hover:bg-black hover:text-white px-1">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherHomePage;
