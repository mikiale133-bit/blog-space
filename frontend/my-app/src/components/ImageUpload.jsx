import React, { useState, useRef } from "react";

const ImageUpload = ({ onImageSelect, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      // Validate file type
      const validImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validImageTypes.includes(file.type)) {
        setError("Please select a valid image file (JPG, PNG, GIF, or WEBP)");
        return;
      }

      // Validate file size (5MB max)
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_SIZE) {
        setError(`File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`);
        return;
      }

      setError("");

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.onerror = () => {
        setError("Failed to read image file");
      };
      reader.readAsDataURL(file);

      // Pass file to parent component
      onImageSelect(file);
    } catch (error) {
      console.error("Error handling image change:", error);
      setError("An error occurred while processing the image");
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
        {preview ? (
          <div className="relative group">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="opacity-0 group-hover:opacity-100  duration-200 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                >
                  Remove Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <label htmlFor="imageInput" className="cursor-pointer block">
              <div className="mb-4 text-4xl">📷</div>
              <div className="text-gray-600 font-medium mb-2">
                Click to upload image
              </div>
              <div className="text-gray-400 text-sm">
                (Max 5MB, JPG/PNG/GIF/WEBP)
              </div>
            </label>
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
