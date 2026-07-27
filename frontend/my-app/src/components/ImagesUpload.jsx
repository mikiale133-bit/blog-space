// components/ImageUpload.jsx
import React from "react";
import FileUpload from "./FileUpload";

const ImageUpload = ({ value, onChange, error }) => {
  return (
    <FileUpload
      label="Images"
      name="images"
      accept=".jpg,.jpeg,.png,.gif,.webp,.svg,image/*"
      maxCount={10}
      maxSize={10} // 10MB per image
      multiple={true}
      value={value}
      onChange={onChange}
      error={error}
      helpText="Upload up to 10 images (JPG, PNG, GIF, WEBP, SVG) - Max 10MB each"
    />
  );
};

export default ImageUpload;
