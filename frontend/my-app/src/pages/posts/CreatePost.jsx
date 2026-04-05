import React, { useState } from "react";
import { API } from "../../api/Axios";
import ImageUpload from "../../components/ImageUpload";
import { Loader2 } from "lucide-react";

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    if (!content.trim()) {
      setError("Please enter content");
      return;
    }

    if (!image) {
      setError("Please upload an image");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("category", category.trim());
    formData.append("image", image);

    try {
      const response = await API.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form
      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      setSuccess(true);

      // Notify parent component
      if (onPostCreated) {
        onPostCreated(response.data);
      }

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      if (error.response) {
        // Server responded with error
        setError(error.response.data?.message || "Failed to create post");
      } else if (error.request) {
        // Request was made but no response
        setError("Network error. Please check your connection.");
      } else {
        // Something else happened
        setError("An unexpected error occurred");
      }
      console.error("Create post error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8 pt-5 px-2 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Create New Post</h2>
            <p className="text-blue-100 text-sm mt-1">
              Share your thoughts with the community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                required
                disabled={loading}
              />
            </div>

            {/* Content Textarea */}
            <div className="space-y-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-y"
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                {content.length} characters
              </p>
            </div>

            <div>
              <label className="font-bold text-xl mb-1">Category</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 border-gray-400 bg-gray-100 rounded mt-1"
                disabled={loading}
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Sports">Sports</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Photography">Photography</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Fashion">Fashion</option>
                <option value="Science">Science</option>
                <option value="Environment">Environment</option>
                <option value="Education">Education</option>
                <option value="Politics">Politics</option>
              </select>
            </div>
            {/* Image Upload Component */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Image <span className="text-red-500">*</span>
              </label>
              <ImageUpload
                onImageSelect={setImage}
                currentImage={null}
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <p className="text-green-700 text-sm">
                  Post created successfully!
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black  text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-0.5 justify-center">
                  <Loader2 size={15} />
                  Creating Post...
                </span>
              ) : (
                "Create Post"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
