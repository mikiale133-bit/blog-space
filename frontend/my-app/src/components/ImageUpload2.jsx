import React, { useState, useRef } from "react";
import { Camera, Trash2 } from "lucide-react";

const ImageUpload = ({ onImageSelect, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const validImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (!validImageTypes.includes(file.type)) {
        setError("Invalid file type");
        return;
      }

      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        setError("File must be under 5MB");
        return;
      }

      setError("");

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      onImageSelect(file);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setError("");
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group">
        {/* Avatar / Upload Circle */}
        <label
          htmlFor="imageInput"
          className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="w-8 h-8 text-gray-400" />
          )}
        </label>

        {/* Remove Button */}
        {preview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -bottom-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
          >
            <Trash2 size={16} />
          </button>
        )}

        {/* Hidden Input */}
        <input
          id="imageInput"
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
};

export default ImageUpload;
