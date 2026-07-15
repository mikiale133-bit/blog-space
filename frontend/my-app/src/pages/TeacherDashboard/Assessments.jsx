import { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Pin,
  Users,
  CheckCircle,
  Clock,
  MoreVertical,
  Plus,
  Download,
  Archive,
  Trash2,
  FileText,
  HelpCircle,
  Copy,
  Eye,
} from "lucide-react";

const assignmentsData = [
  {
    id: 1,
    title: "Math Quiz - Chapter 4",
    subject: "Math",
    status: "active",
    students: 28,
    avgScore: 76,
    completion: 89,
    date: "2026-07-12",
    pinned: true,
    type: "assignment",
  },
  {
    id: 2,
    title: "Science Midterm",
    subject: "Science",
    status: "graded",
    students: 30,
    avgScore: 82,
    completion: 100,
    date: "2026-07-10",
    pinned: false,
    type: "assignment",
  },
  {
    id: 3,
    title: "History Essay Draft",
    subject: "History",
    status: "draft",
    students: 0,
    avgScore: 0,
    completion: 0,
    date: "2026-07-08",
    pinned: false,
    type: "assignment",
  },
];

const quizzesData = [
  {
    id: 101,
    title: "Grammar Quiz #1",
    subject: "English",
    status: "active",
    students: 25,
    avgScore: 71,
    completion: 65,
    date: "2026-07-13",
    pinned: true,
    type: "quiz",
    questions: 12,
    timeLimit: "15 min",
  },
  {
    id: 102,
    title: "Science Pop Quiz",
    subject: "Science",
    status: "graded",
    students: 28,
    avgScore: 68,
    completion: 94,
    date: "2026-07-09",
    pinned: false,
    type: "quiz",
    questions: 8,
    timeLimit: "10 min",
  },
  {
    id: 103,
    title: "Math Mental Quiz",
    subject: "Math",
    status: "active",
    students: 26,
    avgScore: 63,
    completion: 58,
    date: "2026-07-11",
    pinned: false,
    type: "quiz",
    questions: 10,
    timeLimit: "12 min",
  },
];

const statusColors = {
  draft: "bg-gray-100 text-gray-600",
  active: "bg-green-100 text-green-700",
  graded: "bg-blue-100 text-blue-700",
  archived: "bg-red-100 text-red-700",
};

export default function Assessments() {
  const [activeTab, setActiveTab] = useState("assignments");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const data = activeTab === "assignments" ? assignmentsData : quizzesData;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Assessment Library</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} /> New {activeTab === "assignments" ? "Assignment" : "Quiz"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm mb-6 w-fit">
        <button
          onClick={() => setActiveTab("assignments")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === "assignments" ? "bg-gray-200 text-whit" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FileText size={18} /> Assignments
        </button>
        <button
          onClick={() => setActiveTab("quizzes")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === "quizzes" ? "bg-gray-200" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <HelpCircle size={18} /> Quizzes
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="graded">Graded</option>
          <option value="archived">Archived</option>
        </select>

        <button className="flex items-center gap-1 border rounded-lg px-3 py-2 hover:bg-gray-50">
          <ArrowUpDown size={16} /> Sort
        </button>

        <button className="flex items-center gap-1 border rounded-lg px-3 py-2 hover:bg-gray-50">
          <Filter size={16} /> Filter
        </button>

        <button className="flex items-center gap-1 border rounded-lg px-3 py-2 hover:bg-gray-50">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                {item.pinned && <Pin size={16} className="text-yellow-500 mt-1" />}
                <div>
                  <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                    <span>{item.subject}</span>
                    {item.type === "quiz" && (
                      <>
                        <span>•</span>
                        <span>{item.questions} questions</span>
                        <span>•</span>
                        <span>{item.timeLimit}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mt-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[item.status]}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <Users size={14} className="mx-auto text-gray-400" />
                <span className="block font-semibold">{item.students}</span>
                <span className="text-[10px] text-gray-400">Students</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <CheckCircle size={14} className="mx-auto text-gray-400" />
                <span className="block font-semibold">{item.avgScore}%</span>
                <span className="text-[10px] text-gray-400">Avg Score</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <Clock size={14} className="mx-auto text-gray-400" />
                <span className="block font-semibold">{item.completion}%</span>
                <span className="text-[10px] text-gray-400">Completion</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t text-xs text-gray-400">
              <span>{item.date}</span>
              <div className="flex gap-2">
                <button className="hover:text-blue-600">
                  <Eye size={14} />
                </button>
                <button className="hover:text-blue-600">
                  <Copy size={14} />
                </button>
                <button className="hover:text-red-600">
                  <Archive size={14} />
                </button>
                <button className="hover:text-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400">
          <HelpCircle size={48} className="mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium text-gray-600">No {activeTab} found</p>
          <p className="text-sm">Create your first {activeTab.slice(0, -1)} to get started</p>
        </div>
      )}
    </div>
  );
}
