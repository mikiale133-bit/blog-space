import { API } from "@/api/Axios";
import React, { useState, useEffect } from "react";

const AssignSubject = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [teacherSubjects, setTeacherSubjects] = useState([]);

  // Fetch Teachers and Subjects
  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await API.get("/api/teachers");
      setTeachers(response.data.teachers || []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setMessage({ type: "error", text: "Failed to fetch teachers" });
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await API.get("/api/classes/subjects/get");
      setSubjects(response.data.subjects || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setMessage({ type: "error", text: "Failed to fetch subjects" });
    }
  };

  // Fetch subjects already assigned to selected teacher
  const fetchTeacherSubjects = async (teacherId) => {
    if (!teacherId) return;
    try {
      const response = await API.get(`/api/teachers/${teacherId}/subjects`);
      const assignedSubjects = response.data.subjects || [];
      setTeacherSubjects(assignedSubjects);
      // Set selected subjects to already assigned ones
      setSelectedSubjects(assignedSubjects.map((s) => s._id));
    } catch (error) {
      console.error("Error fetching teacher subjects:", error);
    }
  };

  const handleTeacherChange = (e) => {
    const teacherId = e.target.value;
    setSelectedTeacher(teacherId);
    if (teacherId) {
      fetchTeacherSubjects(teacherId);
    } else {
      setTeacherSubjects([]);
      setSelectedSubjects([]);
    }
  };
  console.log(teachers);
  const handleSubjectToggle = (subjectId) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subjectId)) {
        return prev.filter((id) => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };

  // For multiple subjects at once
  const assignMultipleSubjects = async () => {
    if (!selectedTeacher) {
      setMessage({ type: "error", text: "Please select a teacher" });
      return;
    }

    if (selectedSubjects.length === 0) {
      setMessage({ type: "error", text: "Please select at least one subject" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Loop through each subject and assign
      for (const subjectId of selectedSubjects) {
        await API.post(`/api/teachers/${selectedTeacher}/subjects`, { subjectId });
      }

      setMessage({
        type: "success",
        text: selectedSubjects.length === 1 ? "Subject assigned successfully" : `${selectedSubjects.length} subjects assigned successfully`,
      });

      // Refresh teacher subjects
      fetchTeacherSubjects(selectedTeacher);
    } catch (error) {
      console.error("Error assigning subjects:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to assign subjects",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Assign Subjects to Teacher</h2>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success" ? "bg-green-100 text-green-700 border border-green-300" : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Teacher Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Teacher</label>
        <select
          value={selectedTeacher}
          onChange={handleTeacherChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={loading}
        >
          <option value="">-- Select a Teacher --</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.accountId.name}
            </option>
          ))}
        </select>
      </div>

      {/* Show assigned subjects count */}
      {selectedTeacher && teacherSubjects.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded">
          <p className="text-sm text-blue-700">
            Currently assigned: <strong>{teacherSubjects.length}</strong> subjects
          </p>
        </div>
      )}

      {/* Subject Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Subjects</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded p-3">
          {subjects.length === 0 ? (
            <p className="text-gray-500 col-span-2">No subjects available</p>
          ) : (
            subjects.map((subject) => {
              const isAssigned = teacherSubjects.some((s) => s._id === subject._id);
              const isSelected = selectedSubjects.includes(subject._id);

              return (
                <label
                  key={subject._id}
                  className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                    isAssigned
                      ? "bg-green-50 border border-green-300"
                      : isSelected
                        ? "bg-blue-50 border border-blue-300"
                        : "hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={subject._id}
                    checked={isSelected || isAssigned}
                    onChange={() => handleSubjectToggle(subject._id)}
                    disabled={loading || isAssigned}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">
                    {subject.name}
                    {subject.code && <span className="text-xs text-gray-500 ml-1">({subject.code})</span>}
                    {isAssigned && <span className="text-xs text-green-600 ml-2">✓ Assigned</span>}
                  </span>
                </label>
              );
            })
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {selectedSubjects.length} subject(s) selected
          {teacherSubjects.length > 0 && ` (${teacherSubjects.length} already assigned)`}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={assignMultipleSubjects}
          disabled={loading || !selectedTeacher || selectedSubjects.length === 0}
          className={`px-4 py-2 rounded font-medium ${
            loading || !selectedTeacher || selectedSubjects.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Assigning...
            </span>
          ) : (
            `Assign ${selectedSubjects.length} Subject${selectedSubjects.length > 1 ? "s" : ""}`
          )}
        </button>

        {selectedTeacher && teacherSubjects.length > 0 && (
          <button
            onClick={() => {
              setSelectedSubjects([]);
              fetchTeacherSubjects(selectedTeacher);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Reset Selection
          </button>
        )}
      </div>

      {/* Show assigned subjects list */}
      {selectedTeacher && teacherSubjects.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Currently Assigned Subjects:</h3>
          <div className="flex flex-wrap gap-2">
            {teacherSubjects.map((subject) => (
              <span key={subject._id} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center">
                {subject.name}
                <button
                  onClick={async () => {
                    if (window.confirm(`Remove ${subject.name} from this teacher?`)) {
                      try {
                        await API.delete(`/api/teachers/${selectedTeacher}/subjects/${subject._id}`);
                        fetchTeacherSubjects(selectedTeacher);
                        setMessage({ type: "success", text: "Subject removed successfully" });
                      } catch (error) {
                        setMessage({ type: "error", text: "Failed to remove subject" });
                        console.log(error);
                      }
                    }
                  }}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignSubject;
