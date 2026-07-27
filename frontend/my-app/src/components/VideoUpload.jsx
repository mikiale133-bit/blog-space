// components/VideoUpload.jsx
import React from "react";
import FileUpload from "./FileUpload";

const VideoUpload = ({ value, onChange, error }) => {
  return (
    <FileUpload
      label="Videos"
      name="videos"
      accept=".mp4,.mov,.avi,.mkv,.webm,video/*"
      maxCount={3}
      maxSize={500} // 500MB per video
      multiple={true}
      value={value}
      onChange={onChange}
      error={error}
      helpText="Upload up to 3 videos (MP4, MOV, AVI, MKV, WEBM) - Max 500MB each"
    />
  );
};

export default VideoUpload;
