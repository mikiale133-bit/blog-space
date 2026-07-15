import { useState } from "react";
import {
  Save,
  Download,
  Printer,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  ArrowUpDown,
  Search,
  Filter,
  Eye,
  Mail,
  FileSpreadsheet,
  FileText,
  Settings,
  GripVertical,
} from "lucide-react";

// Sample Data
const initialStudents = [
  { id: 1, name: "Emma Thompson" },
  { id: 2, name: "James Wilson" },
  { id: 3, name: "Sophia Chen" },
  { id: 4, name: "Michael Brown" },
  { id: 5, name: "Olivia Davis" },
  { id: 6, name: "Emma Thompson" },
  { id: 7, name: "James Wilson" },
  { id: 8, name: "Sophia Chen" },
  { id: 9, name: "Michael Brown" },
  { id: 10, name: "Olivia Davis" },
];

const initialColumns = [
  { id: "activity", label: "Activity", type: "number", required: true },
  { id: "round1", label: "R1", type: "number", required: false },
  { id: "round2", label: "R2", type: "number", required: false },
  { id: "round3", label: "R3", type: "number", required: false },
  { id: "round4", label: "R4", type: "number", required: false },
  { id: "midterm", label: "Mid", type: "number", required: true },
  { id: "final", label: "Final", type: "number", required: true },
];

const initialGrades = {
  1: { activity: 85, groupWork: 90, individualWork: 88, round1: 85, round2: 78, round3: 92, round4: 88, midterm: 90, final: 95 },
  2: { activity: 70, groupWork: 65, individualWork: 75, round1: 62, round2: 70, round3: 75, round4: 80, midterm: 68, final: 72 },
  3: { activity: 90, groupWork: 85, individualWork: 92, round1: 78, round2: 82, round3: 79, round4: 85, midterm: 88, final: 90 },
  4: { activity: 60, groupWork: 55, individualWork: 58, round1: 45, round2: 50, round3: 55, round4: 60, midterm: 52, final: 58 },
  5: { activity: 95, groupWork: 92, individualWork: 90, round1: 88, round2: 90, round3: 85, round4: 92, midterm: 94, final: 96 },
};

export default function Results() {
  const [students, setStudents] = useState(initialStudents);
  const [grades, setGrades] = useState(initialGrades);
  const [columns, setColumns] = useState(initialColumns);
  const [editingCell, setEditingCell] = useState(null);
  const [editingColumn, setEditingColumn] = useState(null);
  const [newColumnLabel, setNewColumnLabel] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("Grade 10A");

  // Calculate average
  const calculateAverage = (studentId) => {
    const studentGrades = grades[studentId];
    if (!studentGrades) return 0;

    const values = Object.values(studentGrades).filter((v) => v !== undefined && v !== null && v !== "");
    if (values.length === 0) return 0;

    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round((sum / values.length) * 10) / 10;
  };

  // Calculate grade letter
  const getGradeLetter = (avg) => {
    if (avg >= 90) return "A";
    if (avg >= 80) return "B";
    if (avg >= 70) return "C";
    if (avg >= 60) return "D";
    return "F";
  };

  // Check if passed
  const isPassed = (avg) => {
    return avg >= 60;
  };

  // Handle grade change
  const handleGradeChange = (studentId, columnId, value) => {
    const numValue = value === "" ? undefined : Number(value);
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [columnId]: numValue,
      },
    }));
  };

  // Handle cell edit
  const handleCellEdit = (studentId, columnId, value) => {
    handleGradeChange(studentId, columnId, value);
    setEditingCell(null);
  };

  // Add custom column
  const addCustomColumn = () => {
    if (!newColumnLabel.trim()) return;

    const newColumn = {
      id: `custom_${Date.now()}`,
      label: newColumnLabel.trim(),
      type: "number",
      required: false,
      custom: true,
    };

    setColumns([...columns, newColumn]);

    // Add empty values for all students
    const newGrades = { ...grades };
    students.forEach((student) => {
      newGrades[student.id] = {
        ...newGrades[student.id],
        [newColumn.id]: undefined,
      };
    });
    setGrades(newGrades);

    setNewColumnLabel("");
    setShowAddColumn(false);
  };

  // Delete custom column
  const deleteCustomColumn = (columnId) => {
    if (!window.confirm("Delete this column?")) return;

    setColumns(columns.filter((col) => col.id !== columnId));

    // Remove from grades
    const newGrades = { ...grades };
    students.forEach((student) => {
      delete newGrades[student.id]?.[columnId];
    });
    setGrades(newGrades);
  };

  // Export to CSV
  const exportCSV = () => {
    const headers = ["Student Name", ...columns.map((c) => c.label), "Average", "Grade", "Status"];
    const rows = students.map((student) => {
      const avg = calculateAverage(student.id);
      const grade = getGradeLetter(avg);
      const passed = isPassed(avg);
      const row = [student.name, ...columns.map((col) => grades[student.id]?.[col.id] ?? ""), avg, grade, passed ? "Pass" : "Fail"];
      return row.join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grades_${selectedClass}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter students
  const filteredStudents = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  // Class selector dropdown
  const classes = ["Grade 10A", "Grade 10B", "Grade 11A", "Grade 11B"];

  return (
    <div className="p-6 mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Grade Book</h1>
          <div className="flex items-center gap-4 mt-1">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">{students.length} students</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={exportCSV} className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 transition">
            <FileSpreadsheet size={18} /> Export CSV
          </button>
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 transition">
            <Printer size={18} /> Print
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Save size={18} /> Save All
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button className="flex items-center gap-1 border rounded-lg px-3 py-2 hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>

          <button
            onClick={() => setShowAddColumn(true)}
            className="flex items-center gap-1 bg-purple-50 text-purple-600 border border-purple-200 rounded-lg px-3 py-2 hover:bg-purple-100 transition"
          >
            <Plus size={16} /> Add Column
          </button>
        </div>
      </div>

      {/* Add Column Modal */}
      {showAddColumn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Custom Column</h3>
              <button onClick={() => setShowAddColumn(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              value={newColumnLabel}
              onChange={(e) => setNewColumnLabel(e.target.value)}
              placeholder="Column name (e.g., Project, Lab Work)"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAddColumn(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={addCustomColumn} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Column
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-full overflow-x-auto">
        <div className="">
          <table className="w-full border-collapse">
            {/* Header */}
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase sticky left-0 bg-gray-50 z-10 min-w-[180px]">
                  <div className="flex items-center gap-2">
                    <GripVertical size={14} className="text-gray-300" />
                    Student Name
                  </div>
                </th>

                {columns.map((col) => (
                  <th key={col.id} className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase relative group">
                    <div className="flex items-center justify-center gap-1">
                      <span>{col.label}</span>
                      {col.custom && (
                        <button
                          onClick={() => deleteCustomColumn(col.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </th>
                ))}

                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase min-w-[80px] bg-blue-50">Avg</th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase min-w-[70px] bg-green-50">Grade</th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase min-w-[90px] bg-yellow-50">Status</th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase min-w-[80px]">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filteredStudents.map((student) => {
                const avg = calculateAverage(student.id);
                const grade = getGradeLetter(avg);
                const passed = isPassed(avg);

                return (
                  <tr key={student.id} className="border-b hover:bg-gray-50 transition">
                    {/* Student Name */}
                    <td className="px-4 py-2.5 sticky left-0 bg-white border-r hover:bg-gray-50 z-10">
                      <span className="font-medium text-gray-800">{student.name}</span>
                    </td>

                    {/* Grade Columns */}
                    {columns.map((col) => {
                      const value = grades[student.id]?.[col.id];
                      const isEditing = editingCell?.studentId === student.id && editingCell?.columnId === col.id;

                      return (
                        <td key={col.id} className="px-3 py-2.5 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              value={value !== undefined && value !== null ? value : ""}
                              onChange={(e) => handleGradeChange(student.id, col.id, e.target.value)}
                              onBlur={() => setEditingCell(null)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleCellEdit(student.id, col.id, e.target.value);
                                }
                                if (e.key === "Escape") setEditingCell(null);
                              }}
                              className="w-20 px-2 py-1 border-2 border-blue-400 rounded-lg text-center focus:outline-none"
                              autoFocus
                            />
                          ) : (
                            <div
                              onClick={() => setEditingCell({ studentId: student.id, columnId: col.id })}
                              className={`cursor-pointer py-1 rounded hover:bg-gray-100 transition min-h-[32px] ${
                                value !== undefined && value !== null && value !== "" ? "text-gray-800" : "text-gray-300 italic text-sm"
                              }`}
                            >
                              {value !== undefined && value !== null && value !== "" ? value : "—"}
                            </div>
                          )}
                        </td>
                      );
                    })}

                    {/* Average */}
                    <td className="px-3 py-2.5 text-center font-semibold text-blue-600 bg-blue-50">{avg || "—"}</td>

                    {/* Grade */}
                    <td className="px-3 py-2.5 text-center bg-green-50">
                      <span
                        className={`text-sm font-bold px-2 py-1 rounded ${
                          grade === "A"
                            ? "text-green-700"
                            : grade === "B"
                              ? "text-blue-700"
                              : grade === "C"
                                ? "text-yellow-700"
                                : grade === "D"
                                  ? "text-orange-700"
                                  : "text-red-700"
                        }`}
                      >
                        {avg ? grade : "—"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-2.5 text-center bg-white">
                      {avg ? (
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {passed ? "Pass" : "Fail"}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex justify-center gap-1">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition" title="View details">
                          <Eye size={15} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition" title="Send feedback">
                          <Mail size={15} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        {filteredStudents.length > 0 && (
          <div className="bg-gray-50 border-t px-6 py-3 flex justify-between items-center text-sm text-gray-600">
            <div className="flex gap-6">
              <span>
                Showing {filteredStudents.length} of {students.length} students
              </span>
              <span>
                Average class score: {Math.round((students.reduce((acc, s) => acc + calculateAverage(s.id), 0) / students.length) * 10) / 10 || 0}%
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-green-100 rounded-full"></span>
                Pass: {students.filter((s) => isPassed(calculateAverage(s.id))).length}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-red-100 rounded-full"></span>
                Fail: {students.filter((s) => !isPassed(calculateAverage(s.id)) && calculateAverage(s.id) > 0).length}
              </span>
            </div>
          </div>
        )}

        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            <p className="text-lg font-medium text-gray-600">No students found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="mt-4 text-xs text-gray-400 text-center">💡 Click any grade cell to edit • Enter to save • Escape to cancel</div>
    </div>
  );
}
