import { API } from "@/api/Axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const FollowBtn = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // check follow status
  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await API.get(`/api/follows/check/${userId}`);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    if (userId) checkFollowStatus();
  }, [userId]);

  const toggleFollow = async (id) => {
    setLoading(true);

    try {
      if (isFollowing) {
        await API.delete(`/api/follows/${id}/unfollow`);
      } else {
        await API.post("/api/follows", { userId: id });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => toggleFollow(userId)}
      disabled={loading}
      className={`
    /* Core Layout */
    w-full max-w-100 mx-auto h-9 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2
    
    /* Transition & Interaction */
    transition-all duration-200 ease-in-out active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed
    /* Conditional Styles */
    ${
      loading
        ? "bg-slate-100 text-slate-500 border border-slate-200"
        : isFollowing
          ? "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          : "bg-blue-600 text-white shadow-sm hover:bg-blue-500 hover:shadow-md"
    }
  `}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{isFollowing ? "Following" : "Follow"}</>}
    </button>
  );
};

export default FollowBtn;
