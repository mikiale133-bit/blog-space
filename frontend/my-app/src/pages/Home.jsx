import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Loader2, Bookmark, Search } from "lucide-react"; // Import icons
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
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-1 pb-5">
        {/* Header Section */}
        <div className="mb-5">
          <div className="relative">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search posts..."
              className="p-1 border-2 border-gray-300 bg-gray-50 rounded-full pl-10 w-full"
            />
            <div className="absolute left-3 top-1.5 text-gray-500">
              <Search size={22} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {error && (
            <p className="text-red-500 bg-red-50 p-4 rounded">{error}</p>
          )}

          {posts.length === 0 && <p>No posts found.</p>}

          {posts.map((post) => (
            <article
              key={post._id}
              className="group bg-white border-2   transition-all border-gray-200 duration-500 relative rounded-lg lg:flex gap-3 items-center justify-between"
            >
              <div>
                {post.image && post.image.url && (
                  <div className="w-full aspect-video overflow-hidden rounded-t-md lg:max-w-100">
                    <img
                      src={post.image.url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1">
                {/* Card Body: Title & Content */}
                <Link to={`/posts/${post._id}`} state={{ post }}>
                  <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-green-800 transition-colors line-clamp-2 px-2">
                    {post.title}
                  </h4>
                </Link>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 px-2 py-1">
                  {post.content}
                </p>

                {/* Card Footer: Action */}
                <div className="mt-0 py-2 border-t border-slate-100 flex justify-between items-center  px-2 relative">
                  <Link
                    to={`/users/${post.user._id}`}
                    state={{ user: post.user }}
                    className="flex items-center gap-0.5"
                  >
                    {post.image && post.image.url && (
                      <div className="w-7 h-7 rounded-full aspect-video overflow-hidden">
                        <img
                          src={post.image.url}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="hover:text-green-700 -mt-1 hover:underline text-sm text-green-800">
                      {post.user.name}
                    </div>
                  </Link>

                  {/* Card Header: Metadata */}
                  <div className="flex gap-1 items-center justify-center cursor-pointer hover:bg-gray-100 px-2 py-0.5 rounded">
                    <Bookmark size={15} />
                    <p className="mb-1">save</p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default Home;
