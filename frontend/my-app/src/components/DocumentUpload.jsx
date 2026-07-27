// components/DocumentUpload.jsx
import React from "react";
import FileUpload from "./FileUpload";

const DocumentUpload = ({ label, name, accept, value, onChange, error }) => {
  return (
    <FileUpload
      label={label}
      name={name}
      accept={accept}
      maxCount={1}
      maxSize={50} // 50MB per document
      multiple={false}
      value={value}
      onChange={onChange}
      error={error}
      helpText={`Upload one ${label.toLowerCase()}`}
    />
  );
};

export default DocumentUpload;
