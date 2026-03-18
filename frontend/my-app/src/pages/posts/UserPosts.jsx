import React, { useEffect, useState } from "react";
import { API } from "../../api/Axios";
import { Link, useParams } from "react-router-dom";
import { Loader2, FileText, RefreshCcw } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UserPosts = () => {
  const { userId } = useParams(); // Grabs the ID from the URL: /user/:userId
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Your parent route is /api/posts and sub-route is /user/:userId
      const response = await API.get(`/api/posts/user/${userId}`);
      setPosts(response.data.posts);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchPosts();
  }, [userId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">User Posts</h2>
          <button
            onClick={fetchPosts}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Refresh posts"
          >
            <RefreshCcw size={20} className="text-gray-600" />
          </button>
        </div>

        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            This user hasn't posted anything yet.
          </p>
        ) : (
          <div className="space-y-4">
            {error && (
              <p className="text-red-500 bg-red-50 p-4 rounded">{error}</p>
            )}

            {posts.map((post) => (
              <article
                key={post._id}
                className="group bg-white rounded-lg border border-slate-200 p-6 transition-all hover:border-gray-200 hover:bg-gray-200 duration-500 "
              >
                {/* Card Header: Metadata */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700 text-sm">
                      {post.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        {post.user.name || "User"}
                      </h3>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        Posted on{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body: Title & Content */}
                <Link to={`/posts/${post._id}`} state={{ post }}>
                  <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-800 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </Link>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                  {post.content}
                </p>

                {/* Card Footer: Action */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end group-hover:border-t-2  group-hover:border-gray-300">
                  <Link
                    to={`/posts/${post._id}`}
                    state={{ post }}
                    className="text-sm font-semibold text-gray-600 hover:text-green-800 flex items-center gap-1"
                  >
                    Read full post →
                  </Link>
                </div>
              </article>
            ))}

            {/* Pagination - Upwork style */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
              <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                ← Previous
              </button>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 flex items-center justify-center text-sm text-green-600 bg-green-50 rounded-lg">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 rounded-lg">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 rounded-lg">
                  3
                </button>
                <span className="text-gray-300">...</span>
                <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 rounded-lg">
                  8
                </button>
              </div>
              <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserPosts;
