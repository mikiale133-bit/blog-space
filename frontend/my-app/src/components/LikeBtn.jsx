import React, { useState, useEffect } from "react";
import { API } from "@/api/Axios";
import { Heart, ThumbsUp } from "lucide-react";

const LikeBtn = ({ postId, initialLikeCount }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkLikeStatus();
  }, [postId]);

  const checkLikeStatus = async () => {
    try {
      const response = await API.post(`/api/posts/check-like-status`, { postId });
      setIsLiked(response.data.isLiked);
    } catch (err) {
      console.error("Error checking like status:", err);
    }
  };

  const handleLikeToggle = async () => {
    if (isLoading || !postId) return;
    setIsLoading(true);

    const prevLiked = isLiked;
    const prevCount = likeCount;

    // Optimistic update
    setIsLiked(!isLiked);
    setLikeCount((prev) => (prevLiked ? prev - 1 : prev + 1));

    try {
      if (isLiked) {
        await API.delete(`/api/likes/${postId}`);
      } else {
        await API.post("/api/likes", { postId });
      }
    } catch (error) {
      // Revert on error
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLikeToggle}
      disabled={isLoading}
      className={`
        flex items-center rounded-lg gap-1.5 p-2 sm:px-5 hover:bg-muted
        transition-all duration-200 ease-in-out 
        ${isLiked ? "" : ""}
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"}
      `}
    >
      <Heart size={16} className={`${isLiked ? "fill-red-600 text-red-500" : ""}`} />
      <span className="flex items-center gap-2 font-medium">
        {likeCount}
        <span className="max-sm:hidden">Likes</span>
      </span>
      {isLoading && <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />}
    </button>
  );
};

export default LikeBtn;
