import React, { useState } from "react";
import { API } from "../../api/Axios";
import ImageUpload from "../../components/ImageUpload";
import TextEditor from "@/components/TextEditor"; // Import your new editor component
import { CornerRightDownIcon, Loader2 } from "lucide-react";

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // This will now store HTML strings
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Helper to strip HTML tags for character length/validation check
  const isContentEmpty = (htmlString) => {
    return !htmlString || htmlString.replace(/<[^>]*>/g, "").trim() === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    // Updated validation to look through HTML wrapper tags
    if (isContentEmpty(content)) {
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
    formData.append("content", content.trim()); // Sends the HTML rich text string
    formData.append("category", category.trim());
    formData.append("image", image);

    try {
      const response = await API.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setContent(""); // Resets rich text editor
      setCategory("");
      setImage(null);
      setSuccess(true);

      if (onPostCreated) {
        onPostCreated(response.data);
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || "Failed to create post");
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Create post error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg shadow-lg overflow-hidden border border-border bg-background">
          {/* Header */}
          <div className="bg-black dark:bg-gray-800 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Create New Post</h2>
            <p className="text-blue-100 text-sm mt-1">Share your thoughts with the community</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy title..."
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                required
                disabled={loading}
              />
            </div>

            {/* Content Rich Text Editor (Swapped with textarea) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Content <span className="text-red-500">*</span>
              </label>

              <TextEditor value={content} onChange={setContent} disabled={loading} />
            </div>

            {/* Category Select */}
            <div>
              <label className="font-bold text-xl mb-1">Category</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 border-border rounded mt-1"
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
              <div className="bg-background p-3 border border-border rounded-md flex items-center justify-between gap-2 relative">
                <ImageUpload onImageSelect={setImage} currentImage={null} disabled={loading} />
                <p className="absolute left-10">upload a cover image</p>
                <CornerRightDownIcon size={17} />
              </div>
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
                <p className="text-green-700 text-sm">Post created successfully!</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white dark:text-black text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-0.5 justify-center ">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500">
                    <Loader2 size={15} />
                  </div>
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
