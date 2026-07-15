import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Calendar,
  Clock,
  Users,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  Award,
  BookOpen,
  Settings,
  MoreVertical,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  ClipboardList,
  Zap,
  Star,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const Assignments = () => {
  const [activeTab, setActiveTab] = useState("group");
  const [expandedGroups, setExpandedGroups] = useState({});

  const groupAssignments = [
    {
      id: 1,
      title: "Data Structure and Algorithm",
      group: "Group 1",
      students: 8,
      deadline: "Jully 20, Fri",
      place: "Arrid Campus, Corner Caffe",
      status: "Active",
    },
    {
      id: 2,
      title: "Data Structure and Algorithm",
      group: "Group 2",
      students: 6,
      deadline: "Jully 20, Fri",
      place: "Arrid Campus, Corner Caffe",
      status: "Pending",
    },
    {
      id: 3,
      title: "Data Structure and Algorithm",
      group: "Group 3",
      students: 7,
      deadline: "Jully 20, Fri",
      place: "Arrid Campus, Corner Caffe",
      status: "Completed",
    },
  ];

  const individualAssignments = [
    {
      id: 1,
      title: 'Write a 200 word essay on "My Greatest Achievement"',
      instructions: [
        "Assessment Criteria: Grammar, vocabulary, organization, creativity",
        "Comprehensive Presentation",
        "Deadline: July, Thursday",
        "Each content should be unique",
        "Automatically reject for cheating",
      ],
      submissions: [
        { id: 1, name: "John Deo", submitted: true, grade: null },
        { id: 2, name: "Jan Deo", submitted: true, grade: null },
        { id: 3, name: "John Smith", submitted: false, grade: null },
        { id: 4, name: "Emily Johnson", submitted: true, grade: "A" },
        { id: 5, name: "Michael Brown", submitted: true, grade: "B+" },
      ],
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: "Computer Fundamentals Quiz",
      type: "MCQ",
      questions: [
        { id: 1, question: "What is a computer?", options: ["Electronic device", "Mechanical tool", "Software", "Network"], correct: 0 },
        { id: 2, question: "Which is a programming language?", options: ["HTML", "CSS", "JavaScript", "All of the above"], correct: 3 },
      ],
    },
    {
      id: 2,
      title: "True or False Quiz",
      type: "True/False",
      questions: [
        { id: 1, question: "Is Earth round?", answer: true },
        { id: 2, question: "Is water wet?", answer: true },
      ],
    },
  ];

  const toggleGroup = (id) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <Zap className="w-3 h-3" />;
      case "Pending":
        return <Clock className="w-3 h-3" />;
      case "Completed":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-blue-600" />
              Assignments Management
            </h1>
            <p className="text-gray-600 mt-1">Manage group assignments, individual tasks, and quizzes</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            Create Assignment
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Assignments</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
              <div className="bg-blue-100 p-2.5 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <div className="bg-green-100 p-2.5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
              <div className="bg-yellow-100 p-2.5 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-purple-600">4</p>
              </div>
              <div className="bg-purple-100 p-2.5 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-1 mb-8 inline-flex w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab("group")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "group" ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users className="w-4 h-4" />
            Group Assignments
          </button>
          <button
            onClick={() => setActiveTab("individual")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "individual" ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User className="w-4 h-4" />
            Individual
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "quizzes" ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Zap className="w-4 h-4" />
            Active Quizzes
          </button>
        </div>

        {/* Group Assignments Tab */}
        {activeTab === "group" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 bg-linear-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-blue-600" />
                    Group Assignments
                  </h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    Add Group Assignment
                  </button>
                </div>
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Deadline: July 20, Fri
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <AlertCircle className="w-4 h-4" />
                    Place: Arrid Campus, Corner Caffe
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {groupAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}
                          >
                            {getStatusIcon(assignment.status)}
                            {assignment.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {assignment.group}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {assignment.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {assignment.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {assignment.place}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button className="px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Grade
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Individual Assignments Tab */}
        {activeTab === "individual" && (
          <div className="space-y-6">
            {individualAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 bg-linear-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">{assignment.title}</h2>
                </div>

                <div className="p-6">
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                      <ClipboardList className="w-5 h-5 text-gray-600" />
                      Instructions:
                    </h3>
                    <ul className="space-y-2">
                      {assignment.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-blue-500 mt-1">•</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      Add Instruction
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-600" />
                        Submissions ({assignment.submissions.filter((s) => s.submitted).length}/{assignment.submissions.length})
                      </h3>
                      <div className="flex gap-2">
                        <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                          <Filter className="w-4 h-4" />
                          Filter
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                          <Search className="w-4 h-4" />
                          Search
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {assignment.submissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-semibold text-sm">
                              {submission.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{submission.name}</p>
                              <div className="flex items-center gap-2 text-sm">
                                {submission.submitted ? (
                                  <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="w-3 h-3" />
                                    Submitted
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-red-600">
                                    <XCircle className="w-3 h-3" />
                                    Not Submitted
                                  </span>
                                )}
                                {submission.grade && (
                                  <span className="flex items-center gap-1 text-purple-600 font-semibold">
                                    <Award className="w-3 h-3" />
                                    Grade: {submission.grade}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            {submission.submitted && (
                              <>
                                <Link
                                  to="/teacher/assesments/123/students/123/submited"
                                  className="flex-1 sm:flex-none px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                                >
                                  <Eye className="w-4 h-4" />
                                  Content
                                </Link>
                                <button className="flex-1 sm:flex-none px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-1">
                                  <Award className="w-4 h-4" />
                                  Give Result
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === "quizzes" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 bg-linear-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    Short Quizzes In Class
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Create Quiz
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-purple-600" />
                          {quiz.title}
                        </h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 inline-block">{quiz.type}</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {quiz.questions.map((q, index) => (
                        <div key={q.id} className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium text-gray-700 mb-2">
                            {index + 1}. {q.question}
                          </p>
                          {quiz.type === "MCQ" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                              {q.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2 text-sm text-gray-600">
                                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  {option}
                                  {optIndex === q.correct && <CheckCircle className="w-4 h-4 text-green-500" />}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex gap-4 pl-4">
                              <span className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                True
                              </span>
                              <span className="flex items-center gap-2 text-sm text-red-600">
                                <XCircle className="w-4 h-4" />
                                False
                              </span>
                              <span className="text-sm text-gray-500">Answer: {q.answer ? "True" : "False"}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button className="px-4 py-2 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                        Edit Quiz
                      </button>
                      <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        View Results
                      </button>
                      <button className="px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                        Start Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add this if MapPin is not already imported
const MapPin = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default Assignments;
