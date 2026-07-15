import { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Users,
  Award,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Download,
  Eye,
  Mail,
  Printer,
  ChevronDown,
  Calendar,
  BookOpen,
  User,
  Clock,
} from "lucide-react";

const resultsData = [
  {
    id: 1,
    student: "Emma Thompson",
    class: "Grade 10A",
    subject: "Math",
    assessment: "Chapter 4 Quiz",
    score: 85,
    maxScore: 100,
    percentage: 85,
    grade: "A",
    status: "passed",
    submitted: "2026-07-12",
    timeSpent: "22 min",
  },
  {
    id: 2,
    student: "James Wilson",
    class: "Grade 10A",
    subject: "Math",
    assessment: "Chapter 4 Quiz",
    score: 62,
    maxScore: 100,
    percentage: 62,
    grade: "C",
    status: "passed",
    submitted: "2026-07-12",
    timeSpent: "28 min",
  },
  {
    id: 3,
    student: "Sophia Chen",
    class: "Grade 10B",
    subject: "Science",
    assessment: "Midterm Exam",
    score: 78,
    maxScore: 100,
    percentage: 78,
    grade: "B",
    status: "passed",
    submitted: "2026-07-11",
    timeSpent: "45 min",
  },
  {
    id: 4,
    student: "Michael Brown",
    class: "Grade 11A",
    subject: "English",
    assessment: "Essay Draft",
    score: 43,
    maxScore: 50,
    percentage: 86,
    grade: "B",
    status: "passed",
    submitted: "2026-07-10",
    timeSpent: "35 min",
  },
  {
    id: 5,
    student: "Olivia Davis",
    class: "Grade 10B",
    subject: "Science",
    assessment: "Midterm Exam",
    score: 34,
    maxScore: 100,
    percentage: 34,
    grade: "F",
    status: "failed",
    submitted: "2026-07-11",
    timeSpent: "30 min",
  },
  {
    id: 6,
    student: "Liam Martinez",
    class: "Grade 11B",
    subject: "History",
    assessment: "WWII Quiz",
    score: 92,
    maxScore: 100,
    percentage: 92,
    grade: "A",
    status: "passed",
    submitted: "2026-07-13",
    timeSpent: "18 min",
  },
];

const classesData = [
  { id: 1, name: "Grade 10A", students: 28, subject: "Math" },
  { id: 2, name: "Grade 10B", students: 26, subject: "Science" },
  { id: 3, name: "Grade 11A", students: 30, subject: "English" },
  { id: 4, name: "Grade 11B", students: 24, subject: "History" },
  { id: 5, name: "Grade 12A", students: 22, subject: "Physics" },
];

export default function Results() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedAssessment, setSelectedAssessment] = useState("all");
  const [search, setSearch] = useState("");

  // Stats per class
  const classStats = {
    "Grade 10A": { avg: 78, passRate: 92, highest: 98, lowest: 55 },
    "Grade 10B": { avg: 72, passRate: 85, highest: 95, lowest: 34 },
    "Grade 11A": { avg: 81, passRate: 88, highest: 96, lowest: 60 },
    "Grade 11B": { avg: 86, passRate: 94, highest: 92, lowest: 70 },
  };

  const filteredData = resultsData.filter((item) => {
    const matchClass = selectedClass === "all" || item.class === selectedClass;
    const matchSearch = item.student.toLowerCase().includes(search.toLowerCase()) || item.assessment.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Results & Grades</h1>
          <p className="text-sm text-gray-500">View and manage student performance across all classes</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50">
            <Download size={18} /> Export
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Printer size={18} /> Print
          </button>
        </div>
      </div>

      {/* Class Cards - Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <div
          onClick={() => setSelectedClass("all")}
          className={`bg-white p-4 rounded-xl shadow-sm border-2 cursor-pointer transition hover:shadow-md ${
            selectedClass === "all" ? "border-blue-500" : "border-transparent"
          }`}
        >
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-500" />
            <span className="font-semibold text-sm">All Classes</span>
          </div>
          <p className="text-2xl font-bold mt-1">{classesData.length}</p>
          <p className="text-xs text-gray-400">Total classes</p>
        </div>

        {classesData.map((cls) => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls.name)}
            className={`bg-white p-4 rounded-xl shadow-sm border-2 cursor-pointer transition hover:shadow-md ${
              selectedClass === cls.name ? "border-blue-500" : "border-transparent"
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-gray-500" />
              <span className="font-semibold text-sm">{cls.name}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xl font-bold">{classStats[cls.name]?.avg || 0}%</span>
              <span className="text-xs text-gray-400">{cls.students} students</span>
            </div>
            <div className="flex gap-2 mt-1">
              <span className="text-xs text-green-600">↑ {classStats[cls.name]?.passRate || 0}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search students or assessments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <select className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none">
            <option>All Assessments</option>
            <option>Chapter 4 Quiz</option>
            <option>Midterm Exam</option>
            <option>Essay Draft</option>
          </select>

          <select className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none">
            <option>All Status</option>
            <option>Passed</option>
            <option>Failed</option>
          </select>

          <button className="flex items-center gap-1 border rounded-lg px-3 py-2 hover:bg-gray-50">
            <ArrowUpDown size={16} /> Sort
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-500" />
            <span className="text-sm text-gray-500">Students</span>
          </div>
          <p className="text-2xl font-bold">{filteredData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-green-500" />
            <span className="text-sm text-gray-500">Avg Score</span>
          </div>
          <p className="text-2xl font-bold">{Math.round(filteredData.reduce((acc, curr) => acc + curr.percentage, 0) / filteredData.length || 0)}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-green-500" />
            <span className="text-sm text-gray-500">Pass Rate</span>
          </div>
          <p className="text-2xl font-bold">
            {Math.round((filteredData.filter((d) => d.status === "passed").length / filteredData.length) * 100 || 0)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-purple-500" />
            <span className="text-sm text-gray-500">Highest Score</span>
          </div>
          <p className="text-2xl font-bold">{Math.max(...filteredData.map((d) => d.percentage), 0)}%</p>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-xs text-gray-500 uppercase">
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Assessment</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Grade</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {item.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-medium text-gray-800">{item.student}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{item.class}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm">{item.assessment}</span>
                      <span className="text-xs text-gray-400 block">{item.subject}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="font-semibold">{item.score}</span>
                      <span className="text-xs text-gray-400">/{item.maxScore}</span>
                      <span className="text-sm ml-2 text-gray-500">({item.percentage}%)</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-bold px-2 py-1 rounded ${
                        item.grade === "A"
                          ? "bg-green-100 text-green-700"
                          : item.grade === "B"
                            ? "bg-blue-100 text-blue-700"
                            : item.grade === "C"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === "passed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm text-gray-600">{item.submitted}</span>
                      <span className="text-xs text-gray-400 block">
                        <Clock size={12} className="inline mr-1" /> {item.timeSpent}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition" title="View details">
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition" title="Send feedback">
                        <Mail size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            <BarChart3 size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium text-gray-600">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}
