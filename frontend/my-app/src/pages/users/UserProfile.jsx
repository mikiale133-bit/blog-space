import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "../../api/Axios";
import { Link, useParams } from "react-router-dom";
import { Bookmark, Save, SaveAllIcon, SaveIcon } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const UserProfile = () => {
  const { id } = useParams();

  const loggedinUser = useAuthStore((state) => state.user);
  const isOwner = loggedinUser._id === id;

  const [userPosts, setUserPosts] = useState();
  const [user, setUser] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // this is not setters place  - this line is wrong
  // setIsOwner(true);

  // user
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/api/users/${id}`);

        setUser(res.data);
      } catch (error) {
        setError(`Failed to get user: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // user posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/api/posts/${id}`);

        setUserPosts(res.data);
      } catch (error) {
        setError(`Failed to get user: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [id]);

  const editPost = () => {
    console.log("edit post");
  };

  const DeletePost = async (id) => {
    try {
      await API.delete(`/api/posts/${id}`);
    } catch (error) {
      console.log(error);
      setError(
        `${error.response?.status === 400 ? "you are not authoriaed to delete this post" : error.message}`,
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <p>user not found, No profile.</p>;
  }

  return (
    <div className="px-2">
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <div className="border border-gray-200 rounded p-2 flex justify-between items-center">
        <div>
          <h2 className="text-gray-700 text-lg">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {isOwner ? (
          <div className="flex gap-2 items-center">
            <button className="text-blue-500 hover:underline ">Edit</button>
            <button className="hover:underline">delete</button>
          </div>
        ) : (
          <button className="px-5 py-0.5 rounded-full bg-blue-500 text-white cursor-pointer">
            Follow
          </button>
        )}
      </div>

      <div className="border-t border-t-gray-200 pt-5 max-w-3xl mx-auto">
        <button className="font-semibold pb-0.8 mb-5 border-b-5 border-blue-00 inline rounded text-xl">
          Posts
        </button>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-600 px-2 py-1 rounded text-sm mb-2">
            {error}
          </p>
        )}

        {userPosts?.posts.length === 0 ? (
          <p>No posts found for this user.</p>
        ) : (
          <div className="flex gap-1 flex-col">
            {userPosts?.posts.map((post) => (
              <div
                key={post._id}
                className=" max-sm:p-3 md:p-4 border border-gray-300 rounded group bg-gray-50 relative"
              >
                <div>
                  <Link
                    to={`/posts/${post._id}`}
                    className="cursor-pointer line-clamp-2 group-hover:text-blue-900 font-semibold text-lg"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-500 text-sm line-clamp-2 ">
                    {post.content}
                  </p>
                </div>
                {/* save btn */}
                <button className="absolute top-3 right-3">
                  <Bookmark size={18} />
                </button>
                {/* buttons */}
                {isOwner ? (
                  <div className="flex gap-2">
                    <button
                      className="hover:underline text-red-500"
                      onClick={() => DeletePost(post._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="hover:underline text-blue-500"
                      onClick={editPost}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <button>Follow</button>
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
