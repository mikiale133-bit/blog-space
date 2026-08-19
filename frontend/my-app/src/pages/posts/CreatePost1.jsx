import React, { useState } from "react";
import { API } from "../../api/Axios";
import ImageUpload from "../../components/ImageUpload";
import TextEditor from "@/components/TextEditor"; // Import your new editor component
import { CornerRightDownIcon, Loader2 } from "lucide-react";
import ParticleBackground from "@/components/animations/DotsAnimation";

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
    <div className="relative min-h-screen px-2 py-3 pb-8 mt-10 sm:px-6 lg:px-8">
      {/* <ParticleBackground /> */}
      <div className="max-w-3xl mx-auto">
        <div className="overflow-hidden rounded-lg border-border ">
          {/* Header */}
          <div className="px-6 py-4 text-center dark:bg-gray-800">
            <h2 className="text-2xl font-bold ">Create New Post</h2>
            <p className="mt-1 font-medium text-gray-600 text">Share your thoughts with the community</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-1 py-6 space-y-6">
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
                className="w-full px-4 py-2 transition-all duration-200 border rounded-lg outline-none border-border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label className="mb-1 text-xl font-bold">Category</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 mt-1 border rounded border-border"
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

            <div className="items-center gap-2 ">
              <label className="block mb-3 text-lg font-medium text-gray-700">
                Upload Cover Image <span className="text-red-500">*</span>
              </label>
              <div className="inline-block gap-2 p-3 border border-blue-400 rounded-md ">
                <ImageUpload onImageSelect={setImage} currentImage={null} disabled={loading} />
              </div>

              <p></p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 border-l-4 border-red-500 rounded-lg bg-red-50">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-4 border-l-4 border-green-500 rounded-lg bg-green-50">
                <p className="text-sm text-green-700">Post created successfully!</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 font-semibold text-white transition-all duration-200 bg-black rounded-lg dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-0.5 justify-center ">
                  <div className="w-5 h-5 border-b-2 border-blue-500 rounded-full animate-spin">
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
