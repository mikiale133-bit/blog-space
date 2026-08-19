import { API } from "@/api/Axios";
import { Plus, X, Users, UserPlus, Trash2, Edit2, Check, ChevronRight, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateSubject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName.trim()) {
      setError("Subject name is required");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post(`/api/subjects`, {
        name: subjectName.trim(),
      });
      setSubjectName("");
    } catch (error) {
      console.log(error);

      setError("Failed to create subject");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 mx-auto sm:p-4 lg:p-6 max-w-7xl">
      {/* Class Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-foreground">ADMINISTRATOR</h1>
        <p className="ml-2">Assign Subject For Classes</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="subjectName" className="block mb-2 text-sm font-medium">
            Subject Name
          </label>
          <input
            id="subjectName"
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Enter subject name"
            className="w-full px-3 py-2 border rounded"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="p-2 mb-4 border border-red-300 bg-red-50">
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="p-2 mb-4 border border-green-300 bg-green-50">
            <span className="text-sm">{success}</span>
          </div>
        )}

        <button type="submit" className="px-4 py-2 border rounded hover:bg-gray-100" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Subject"}
        </button>
      </form>
    </div>
  );
};

export default CreateSubject;
