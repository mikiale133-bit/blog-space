import { useState } from "react";
import { API } from "@/api/Axios";
import { UploadIcon } from "lucide-react";

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);

    // Generate local URLs for previewing
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setPreviews(previews.filter((_, i) => i !== index));
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", "My Multi-Image Post");
    formData.append("content", "Check out these photos");
    formData.append("category", "Photography");

    // Append each image to the 'images' key (matching Multer)
    selectedFiles.forEach((file) => {
      formData.append("image", file);
    });

    try {
      const res = await API.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success!", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Grid List */}
      <div className="grid grid-cols-3 gap-4 max-w-80 mb-5">
        {previews.map((url, i) => (
          <div key={i} className="relative group aspect-square">
            <img src={url} className="w-full h-full object-cover rounded-lg" />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {/* Upload Trigger */}
      <label className="mb-2">
        <input
          type="file"
          multiple
          className="hidden mb-2"
          onChange={handleFileChange}
        />
        <UploadIcon className="mb-2 border p-1 w-10 h-10 cursor-pointer" />
      </label>
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold"
      >
        Create Post
      </button>
    </div>
  );
};
export default Upload;
