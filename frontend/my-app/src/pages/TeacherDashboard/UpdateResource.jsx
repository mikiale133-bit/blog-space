// pages/ResourceForm.jsx
import React, { useState } from "react";
import { Save, X, Loader, FileText, Video, Image, File, BookOpen } from "lucide-react";

// Components
import VideoUpload from "@/components/VideoUpload";
import DocumentUpload from "@/components/DocumentUpload";
import RichTextEditor from "@/components/RichTextEditor";
import QuizSelector from "@/components/QuizSelector";
import { API } from "@/api/Axios";

const UpdateResource = ({ topicId, subjectId, chapterId, setUpdateModal, note, quizzes, videos, powerPoint, attachment, status }) => {
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    subjectId: subjectId,
    chapterId: chapterId,
    topicId: topicId,
    note,
    quizzes,
    videos,
    powerPoint,
    attachment,
    status,
  });

  const [errors, setErrors] = useState({});

  // Handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (field, files) => {
    // Keep existing files if none selected
    if (files.length === 0) {
      setFormData((prev) => ({ ...prev, [field]: [] }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: files }));
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.topicId) {
      newErrors.topicId = "Topic is required";
    }

    if (!formData.note || formData.note.trim() === "<p></p>") {
      newErrors.note = "Please add lesson content";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Request Fired before validation");

    if (!validateForm()) {
      return;
    }

    console.log("Request Fired after validation");

    try {
      setSubmitting(true);

      // Build FormData
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("subjectId", formData.subjectId);
      formDataToSend.append("chapterId", formData.chapterId);
      formDataToSend.append("topicId", formData.topicId);
      formDataToSend.append("note", formData.note);
      formDataToSend.append("status", formData.status);

      if (formData.quizzes?.length > 0) {
        formDataToSend.append("quiz", JSON.stringify(formData.quizzes));
      }

      // Add files (only if new files are selected)
      formData.videos?.forEach((file) => {
        formDataToSend.append("videos", file);
      });

      if (formData.powerPoint?.length > 0) {
        formDataToSend.append("powerPoint", formData.powerPoint[0]);
      }

      if (formData.attachment?.length > 0) {
        formDataToSend.append("attachment", formData.attachment[0]);
      }

      // formData.images.forEach((file) => {
      //   formDataToSend.append("images", file);
      // });

      // Send request
      const response = await API.put(`/api/resources`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Success: ", response.data.messaeg);
      // Success - Navigate to topic page
      // navigate(`/teacher-dashboard`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.response?.data?.message || "Failed to save resource");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{topicId ? "Edit Resource" : "Create Resource"}</h1>
          <p className="mt-1 text-sm text-gray-500">Update Resource</p>
        </div>
        <button type="button" onClick={() => setUpdateModal(false)} className="p-2 transition-colors rounded-full hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hidden fields */}
        <input type="hidden" name="subjectId" value={formData.subjectId} />
        <input type="hidden" name="chapterId" value={formData.chapterId} />
        <input type="hidden" name="topicId" value={formData.topicId} />

        {/* Section: note */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Lesson Content</h2>
          </div>
          <RichTextEditor
            value={formData.note}
            onChange={(value) => handleInputChange("note", value)}
            error={errors.note}
            placeholder="Write your lesson note here. You can add headings, images, tables, and more..."
          />
        </div>

        {/* Section: Videos */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Video className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Videos</h2>
          </div>

          <VideoUpload value={formData.videos} onChange={(files) => handleFileChange("videos", files)} error={errors.videos} />
        </div>

        {/* Section: Documents */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* PowerPoint */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <File className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-semibold text-gray-900">PowerPoint</h2>
            </div>

            <DocumentUpload
              label="PowerPoint"
              name="powerPoint"
              accept=".ppt,.pptx,.pps,.ppsx,.pdf"
              value={formData.powerPoint}
              onChange={(files) => handleFileChange("powerPoint", files)}
              error={errors.powerPoint}
            />
          </div>

          {/* Attachment */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Attachment</h2>
            </div>

            <DocumentUpload
              label="Attachment"
              name="attachment"
              accept=".doc,.docx,.pdf,.txt,.rtf"
              value={formData.attachment}
              onChange={(files) => handleFileChange("attachment", files)}
              error={errors.attachment}
            />
          </div>
        </div>

        {/* Section: Quizzes */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Quizzes</h2>
          </div>
          <QuizSelector />
        </div>

        {/* Section: Publish */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Publish Resource</label>
              <p className="text-xs text-gray-500">Students will see this resource immediately after publishing</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, status: status === "published" ? "draft" : "published" })}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${formData.status === "published" ? "bg-blue-600" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${formData.status === "published" ? "translate-x-6" : "translate-x-1"}
                `}
              />
            </button>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => setUpdateModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Resource
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateResource;
