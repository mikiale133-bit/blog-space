import React from "react";

const DocumentViewer = ({ url, originalName }) => {
  if (!url) return <p className="text-gray-500">No file provided</p>;

  const fileToAnalyze = originalName || url;
  const extension = fileToAnalyze.split(".").pop().split("?")[0].toLowerCase();

  if (extension === "pdf") {
    const cleanPdfUrl = url.endsWith(".pdf") ? url : `${url}.pdf`;
    return <iframe src={cleanPdfUrl} className="w-full h-full min-h-137.5" title="PDF Viewer" />;
  }

  if (["docx", "doc", "pptx", "ppt", "xlsx", "xls"].includes(extension)) {
    let viewableUrl = url.trim();

    if (!viewableUrl.toLowerCase().endsWith(`.${extension}`)) {
      viewableUrl = `${viewableUrl}.${extension}`;
    }

    const encodedUrl = encodeURIComponent(viewableUrl);

    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;

    return <iframe src={googleViewerUrl} className="w-full h-full min-h-137.5 rounded-l" />;
  }

  // Fallback if file format isn't viewable inline
  return (
    <div className="p-6 border border-dashed rounded-lg text-center bg-red-500 h-full flex flex-col items-center justify-center">
      <p className="text-gray-600 mb-3 font-medium">This file format is not supported for inline previewing.</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
      >
        Open File in New Tab
      </a>
    </div>
  );
};

export default DocumentViewer;
