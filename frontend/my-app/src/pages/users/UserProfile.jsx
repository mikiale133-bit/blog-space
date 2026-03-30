import React, { useEffect, useState } from "react";
import { API } from "../../api/Axios";
import { Link, useParams } from "react-router-dom";
import { Bookmark, Pencil, Trash2, User, UserPlus } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const UserProfile = () => {
  const { id } = useParams();
  const loggedinUser = useAuthStore((state) => state.user);
  const isOwner = loggedinUser?._id === id;

  const [userPosts, setUserPosts] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/api/posts/users/${id}`);
        setUserPosts(res.data);
      } catch (err) {
        console.log(err);
        setError("No posts found for this user.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

  const deletePost = async (postId) => {
    try {
      await API.delete(`/api/posts/${postId}`);
      setUserPosts((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p._id !== postId),
      }));
    } catch {
      setError("Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="max-w-4xl mx-auto ">
      {/* Header */}
      <div className="bg-blue-50 px-5 py-6 pb-8">
        <div className="bg-gradient-to-r from-blue-400 to-indigo-600 h-28 rounded-2xl relative shadow ">
          {user?.profile_img && user?.profile_img?.url ? (
            <img
              src={user?.profile_img?.url}
              alt="avatar"
              className="absolute -bottom-10 left-6 w-24 h-24 rounded-full border-4 border-white object-cover shadow"
            />
          ) : (
            <div className="absolute -bottom-10 left-6 w-24 h-24 rounded-full border-4 border-white flex items-center justify-center bg-gray-300 text-gray-600 shadow">
              <User />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="mt-14 flex justify-between items-center ">
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          {isOwner ? (
            <div className="flex gap-3">
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                <Pencil size={16} /> Edit
              </button>
              <button className="flex items-center gap-1 text-red-500 hover:text-red-700">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          ) : (
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition">
              <UserPlus size={16} /> Follow
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Posts */}
        <div className="flex gap-4 items-center border-b border-gray-200 mb-4 pb-2">
          <div className="">
            <h2 className="relative text-lg font-semibold  text-blue-500">
              Posts
              <span className="absolute left-0 -bottom-2 w-12 h-1.5 bg-blue-600 rounded-t-lg"></span>
            </h2>
          </div>

          <button className="text-lg hover:text-gray-600">Latest</button>
          <button className="text-lg hover:text-gray-600">Popular</button>
        </div>

        <p className="mb-2">{userPosts?.count} posts</p>
        {error && (
          <p className="text-gray-700 italic py-2 rounded mb-4">{error}</p>
        )}

        {userPosts?.count === 0 ? (
          <p className="text-gray-500">No posts yet</p>
        ) : (
          <div className="grid gap-4">
            {userPosts?.posts.map((post) => (
              <div
                key={post._id}
                className="p-4 bg-white rounded-xl border border-gray-300  transition relative"
              >
                <Link
                  to={`/posts/${post._id}`}
                  className="font-semibold text-lg hover:text-blue-600 line-clamp-2"
                >
                  {post.title}
                </Link>

                <p className="text-gray-500 text-sm line-clamp-2">
                  {post.content}
                </p>

                <button className="absolute top-3 right-3 text-gray-400 hover:text-blue-600">
                  <Bookmark size={18} />
                </button>

                {isOwner && (
                  <div className="flex gap-4 mt-3 text-sm">
                    <button
                      onClick={() => deletePost(post._id)}
                      className="text-red-500 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>

                    <button className="text-blue-600 hover:underline flex items-center gap-1">
                      <Pencil size={14} /> Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
