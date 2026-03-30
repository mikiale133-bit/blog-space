import React, { useEffect, useState } from "react";
import { Loader2, Bookmark, Search } from "lucide-react"; // Import icons
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // recent posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const resp = await API.get("/api/posts");

        // recent posts
        const recentPosts = await API.get("/api/posts/recents");
        setRecentPosts(recentPosts.data);

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

  // explore posts
  const explorePosts = posts.slice(4);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-900">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-1 pb-5">
        {/* Header Section - search-bar */}
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

          <div className="lg:grid lg:grid-cols-2 lg:grid-rows-3 gap-2 max-w-4xl mx-auto mb-5 lg:max-h-100 max-sm:space-y-1">
            {recentPosts?.map((p, index) => (
              <div
                key={p._id}
                className={`lg:flex lg:justify-between lg:items-center lg:gap-2 max-lg:flex max-lg:flex-col max-lg:justify-between ${index === 0 ? "lg:row-span-3 border border-gray-900 p-2 rounded-lg flex-col bg-gray-700 text-white" : "lg:row-span-1 lg:p-1 border-4 rounded-xl border-white hover:border-gray-900 transition-all duration-500 max-sm:border-gray-300 max-sm:p-1"}`}
              >
                <Link to={`/posts/${p._id}`}>
                  {/* image */}
                  <div className="">
                    {p.image && p.image.url && (
                      <div>
                        <img
                          src={p.image.url}
                          alt="Post image"
                          className={`rounded-lg w-full video object-cover h-full ${index !== 0 && "lg:h-25 lg:w-30"}`}
                        />
                      </div>
                    )}
                  </div>
                </Link>

                {/* content */}
                <div className="flex-1 justify-between flex flex-col">
                  <Link to={`/posts/${p._id}`}>
                    <h4 className="font-bold line-clamp-2 mb-2">{p.title}</h4>
                  </Link>
                  <p
                    className={`text-sm  line-clamp-2 ${index === 0 ? "text-gray-400 line-clamp-3" : "text-gray-600"}`}
                  >
                    {p.content}
                  </p>

                  {/* card footer */}
                  <div className="flex-1 flex justify-between items-center mt-2 lg:mt-0 lg:hidden border-t border-gray-200 pt-2">
                    <div className="flex items-center gap-1 ">
                      <p className="w-7 h-7 rounded-full bg-gray-300"></p>
                      <p>{p.user.name}</p>
                    </div>

                    <Bookmark size={15} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-bold mb-10 mt-10 text-4xl text-center">
              Explore More Latest posts
            </h2>
          </div>
          {/* Explore Posts */}
          <div className="lg:flex justify-between gap-2 space-y-2">
            <div className="space-y-2 lg:grid lg:grid-cols-2 gap-2 justify-center items-center">
              {explorePosts.map((post) => (
                <article
                  key={post._id}
                  className="group bg-white border-2 transition-all border-gray-200 duration-500 relative rounded-lg lg:flex gap-3 justify-between"
                >
                  {/* Post Image */}
                  <div className="max-lg:mb-2">
                    {post.image && post.image.url && (
                      <div className="w-full aspect-video p-0.5 overflow-hidden lg:-ml rounded-lg lg:max-w-100">
                        <img
                          src={post.image.url}
                          alt={post.title}
                          className="w-full h-full object-cover lg:max-w-70 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  {/* Date of post = will be hidden in large screen */}
                  <div className="lg:hidden pl-2">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Card Body: Title & Content */}
                      <div>
                        <Link to={`/posts/${post._id}`}>
                          <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-green-800 transition-colors line-clamp-2 px-2">
                            {post.title}
                          </h4>
                        </Link>

                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-1 px-2 py-1">
                          {post.content}
                        </p>
                      </div>

                      {/* Date of post = will be hidden in small screen */}
                      <div className="max-lg:hidden pl-2">
                        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {/* Card Footer: Action */}
                    <div className="mt-0 py-2 border-t border-slate-100 flex justify-between items-center  px-2 relative">
                      <Link
                        to={`/users/${post?.user?._id}`}
                        state={{ user: post.user }}
                        className="flex items-center gap-0.5"
                      >
                        {/* {post?.user.profile_img &&
                          post?.user.profile_img.url && (
                            <div className="w-7 h-7 rounded-full aspect-video overflow-hidden">
                              <img
                                src={post?.user?.profile_img?.url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )} */}

                        <div className="w-7 h-7 rounded-full bg-gray-300"></div>
                        <div className="hover:text-green-700  hover:underline text-sm text-green-800">
                          {post.user.name}
                        </div>
                      </Link>

                      {/* Card Header: Metadata */}
                      <div className="flex gap-1 items-center justify-center cursor-pointer hover:bg-gray-100 px-2 py-0.5 rounded">
                        <Bookmark size={15} />
                        <p className="mb-1">save</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </main>
  );
};

export default Home;
