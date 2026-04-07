import React from "react";

const PostDetailPage = () => {
  return (
    <>
      {/* header */}
      <div className="px-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-100"></div>
          <div className="w-30 h-3 bg-gray-100"></div>
        </div>
        <div className="w-full h-3 bg-gray-100 mt-2"></div>
      </div>

      {/* main content */}
      <div className="px-3">
        <div className="w-full h-3 bg-gray-100"></div>
        <div className="w-full h-3 bg-gray-100"></div>
        <div className="w-full h-3 bg-gray-100"></div>
        <div className="w-[80%] h-3 bg-gray-100"></div>
        <div className="w-full h-30 bg-gray-100 mt-5"></div>

        <div className="w-full h-3 bg-gray-100"></div>
        <div className="w-full h-3 bg-gray-100"></div>
        <div className="w-full h-3 bg-gray-100"></div>
        <div className="w-[80%] h-3 bg-gray-100"></div>
      </div>
    </>
  );
};

export default PostDetailPage;
