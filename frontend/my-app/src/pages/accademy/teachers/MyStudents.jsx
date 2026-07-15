import React, { useState } from "react";
import {
  Users,
  Mail,
  UserCheck,
  UserX,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  UserPlus,
  BookOpen,
  Calendar,
  Settings,
  MoreVertical,
  Download,
  PieChart,
} from "lucide-react";

const MyStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedGroups, setExpandedGroups] = useState({});
  // const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", grade: "A", attendance: 95, joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive", grade: "B", attendance: 78, joined: "2024-02-01" },
    { id: 3, name: "Michael Johnson", email: "michael@example.com", status: "Active", grade: "A+", attendance: 98, joined: "2024-01-20" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", status: "Active", grade: "B+", attendance: 85, joined: "2024-03-10" },
    { id: 5, name: "David Brown", email: "david@example.com", status: "Inactive", grade: "C", attendance: 62, joined: "2024-02-15" },
  ];

  const groups = [
    {
      id: 1,
      name: "Group 1",
      coordinator: "Abel Meles",
      members: ["Abel Meles", "Abeba Mengstu", "Yohanes Shiferaw"],
      project: "E-commerce Platform",
      progress: 75,
    },
    {
      id: 2,
      name: "Group 2",
      coordinator: "Abel Meles",
      members: ["Mikieale Meles", "Haftom Mengstu", "Mulu Teferi"],
      project: "Mobile App Development",
      progress: 60,
    },
    {
      id: 3,
      name: "Group 3",
      coordinator: "Yonas Moh",
      members: ["Abel Meles", "Abeba Mengstu", "Yohanes Shiferaw"],
      project: "Data Analytics Dashboard",
      progress: 90,
    },
    {
      id: 4,
      name: "Group 4",
      coordinator: "Sara Tekle",
      members: ["Kidan Tesfaye", "Biruk Hailu", "Meron Desta"],
      project: "AI Chatbot",
      progress: 45,
    },
  ];

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || student.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <UserCheck className="w-3 h-3" />
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <UserX className="w-3 h-3" />
          Inactive
        </span>
      );
    }
  };

  const getGradeColor = (grade) => {
    const colors = {
      "A+": "text-purple-600",
      A: "text-green-600",
      "A-": "text-green-500",
      "B+": "text-blue-600",
      B: "text-blue-500",
      "B-": "text-blue-400",
      C: "text-yellow-600",
      D: "text-orange-600",
      F: "text-red-600",
    };
    return colors[grade] || "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              My Students
            </h1>
            <p className="text-gray-600 mt-1">Manage your students and groups</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity">
              <UserPlus className="w-4 h-4" />
              Add Student
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-800">{students.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{students.filter((s) => s.status === "Active").length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Groups</p>
                <p className="text-2xl font-bold text-gray-800">{groups.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Attendance</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <PieChart className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                All Students
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        {student.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(student.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-bold ${getGradeColor(student.grade)}`}>{student.grade}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              student.attendance >= 90 ? "bg-green-500" : student.attendance >= 70 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{student.attendance}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {student.joined}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStudents.length === 0 && <div className="text-center py-8 text-gray-500">No students found matching your criteria</div>}
        </div>

        {/* Groups Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
              Groups
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <Plus className="w-4 h-4" />
              Create Group
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="p-6 cursor-pointer" onClick={() => toggleGroup(group.id)}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">{group.members.length} members</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Coordinator: <span className="font-medium">{group.coordinator}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Project: <span className="font-medium">{group.project}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-sm font-semibold text-purple-600">{group.progress}%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-linear-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${group.progress}%` }}
                          />
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        {expandedGroups[group.id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {expandedGroups[group.id] && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">Members:</p>
                      {group.members.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="w-6 h-6 rounded-full bg-linear-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-sm text-gray-700">{member}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 text-sm px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 text-sm px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                        Message Group
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStudents;
