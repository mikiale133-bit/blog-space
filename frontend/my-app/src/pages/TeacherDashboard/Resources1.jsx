import { API } from "@/api/Axios";
import React, { useState } from "react";

const UploadForm = ({ classId }) => {
  // 1. Dynamic state for text fields
  const [formDataState, setFormDataState] = useState({
    classId,
    title: "",
    description: "",
    topic: "",
    resourceType: "document", // default selection
    textContent: "",
  });

  // 2. Separate state for the file
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle text input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change (Crucial fix: e.target.files[0])
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    setLoading(true);
    setMessage("");

    try {
      // 3. Instantiate FormData inside submit
      const uploadData = new FormData();
      uploadData.append("classId", classId);
      uploadData.append("title", formDataState.title);
      uploadData.append("description", formDataState.description);
      uploadData.append("topic", formDataState.topic);
      uploadData.append("resourceType", formDataState.resourceType);

      // Append file if it's a file-based resource, otherwise append text content
      if (formDataState.resourceType !== "note" && file) {
        uploadData.append("file", file);
      } else if (formDataState.resourceType === "note") {
        uploadData.append("textContent", formDataState.textContent);
      }

      // 4. Send API Request (using classId in URL if needed)
      const response = await API.post(`/api/classes/${classId}/resources`, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Resource uploaded successfully!");
      // Reset form on success
      setFormDataState({ title: "", description: "", topic: "", resourceType: "document", textContent: "" });
      setFile(null);

      alert("Success: ", response.data.message);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage(error.response?.data?.message || "Failed to upload resource.");
    } finally {
      setLoading(false);
    }
  };

  const isFileBased = formDataState.resourceType !== "note";

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Class Resource</h2>

      {message && (
        <div className={`p-3 rounded mb-4 text-sm ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formDataState.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Week 1 Lecture Slides"
          />
        </div>

        {/* Topic Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Topic</label>
          <input
            type="text"
            name="topic"
            value={formDataState.topic}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Introduction to Chemistry"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formDataState.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide a quick summary of this resource..."
          />
        </div>

        {/* Resource Type Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Resource Type</label>
          <select
            name="resourceType"
            value={formDataState.resourceType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="document">Document (PDF, Word, etc.)</option>
            <option value="slide">Slide (PowerPoint, Keynote)</option>
            <option value="video">Video (MP4, AVI)</option>
            <option value="audio">Audio (MP3, WAV)</option>
            <option value="image">Image (PNG, JPG)</option>
            <option value="note">Written Note (Plain Text)</option>
          </select>
        </div>

        {/* File Uploader OR Text Content Field based on selection */}
        {isFileBased ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="w-full px-3 py-2 border border-dashed rounded-md cursor-pointer hover:bg-gray-50 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Write Note</label>
            <textarea
              name="textContent"
              value={formDataState.textContent}
              onChange={handleInputChange}
              rows="6"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type or paste your markdown/plain text note here..."
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Resource"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
