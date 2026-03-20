import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Loader2 } from "lucide-react"; // Import icons
import { API } from "../api/Axios";
// import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const resp = await API.get("/api/posts");
        setPosts(resp.data);
        console.log(resp.data);
      } catch (error) {
        setError(`Failed to load posts: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-900">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-1 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Latest Match Updates
          </h1>
          <p className="text-slate-500">Stay informed with the latest feeds.</p>
        </div>

        <div className="space-y-4">
          {error && (
            <p className="text-red-500 bg-red-50 p-4 rounded">{error}</p>
          )}

          {posts.length === 0 && <p>No posts found.</p>}

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
                      Posted on {new Date(post.createdAt).toLocaleDateString()}
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
        </div>

        {/* right tab bar */}
        <div className="sticky top-20 right-0 bg-white border-2 border-gray-300 rounded-lg p-3">
          {/* header */}
          <div>
            <h2></h2>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default Home;
