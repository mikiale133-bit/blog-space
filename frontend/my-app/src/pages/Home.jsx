import React, { useEffect, useState } from "react";
import { Loader2, Bookmark, Search } from "lucide-react"; // Import icons
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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

  const latestPosts = posts.filter((post) => post.createdAt); //recent posts .slice(0, 5)
  const history = posts.filter((post) => post); //past posts a user visited or interacted .slice(0, 5)
  const historyPosts = history.slice(0, 5);
  (latestPosts, historyPosts);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-900">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-1 pb-5">
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

          <div className="lg:flex justify-between gap-2 space-y-2">
            <div className="space-y-2">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="group bg-white border-2 transition-all border-gray-200 duration-500 relative rounded-lg lg:flex gap-3 items-strech justify-between"
                >
                  {/* Post Image */}
                  <div className="max-lg:mb-2">
                    {post.image && post.image.url && (
                      <div className="w-full aspect-video p-0.5 overflow-hidden rounded-lg lg:max-w-100">
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
                        <Link to={`/posts/${post._id}`} state={{ post }}>
                          <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-green-800 transition-colors line-clamp-2 px-2">
                            {post.title}
                          </h4>
                        </Link>

                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 px-2 py-1">
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
                        to={`/users/${post.user._id}`}
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

            {/* right sidebar
            <div className="min-w-xl sticky overflow-y-scroll max-h-160 top-18 scroll-width-none">
              <div className="">
                <h2 className="font-medium font-mono text-2xl">Latest Posts</h2>

                <div className="grid grid-cols-2 gap-2">
                  <div className="border p-1 rounded flex justify-between flex-col">
                    <div className="bg-blue-100 max-sm:min-w-20 max-sm:min-h-20 min-w-50 min-h-40"></div>
                    <h2 className="">Post 1</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing</p>
                  </div>

                  <div className="border p-1 rounded flex justify-between flex-col">
                    <div className="bg-blue-100 max-sm:min-w-20 max-sm:min-h-20 min-w-50 min-h-40"></div>
                    <h2 className="">Post 1</h2>
                    <p>Lorem ipsum dolor sit amet.lorem2 Lorem, ipsum.</p>
                  </div>

                  <div className="border p-1 rounded flex justify-between flex-col">
                    <div className="bg-blue-100 max-sm:min-w-20 max-sm:min-h-20 min-w-50 min-h-40"></div>
                    <h2 className="">Post 1</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                  </div>

                  <div className="border p-1 rounded flex justify-between flex-col">
                    <div className="bg-blue-100 max-sm:min-w-20 max-sm:min-h-20 min-w-50 min-h-40"></div>
                    <h2 className="">Post 1</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
                  </div>
                </div>
              </div>

              <div className="my-5">
                <div className="border p-1 rounded flex justify-between flex-col">
                  <div className="bg-blue-100 max-sm:min-w-20 max-sm:min-h-20 min-w-50 min-h-40"></div>
                  <h2 className="">Post 1</h2>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="border p-1 rounded flex justify-between flex-col">
                  <div className="bg-blue-100 max-sm:min-w-20 max-sm:min-h-20 min-w-50 min-h-40"></div>
                  <h2 className="">Post 1</h2>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing</p>
                </div>

                <div className="border p-1 rounded flex justify-between flex-col">
                  <div className="bg-blue-100 max-sm:min-w-20 max-sm:min-h-20 min-w-50 min-h-40"></div>
                  <h2 className="">Post 1</h2>
                  <p>Lorem ipsum dolor sit amet.lorem2 Lorem, ipsum.</p>
                </div>

                <div className="border p-1 rounded flex justify-between flex-col">
                  <div className="bg-blue-100 max-sm:min-w-20 max-sm:min-h-20 min-w-50 min-h-40"></div>
                  <h2 className="">Post 1</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                </div>

                <div className="border p-1 rounded flex justify-between flex-col">
                  <div className="bg-blue-100 max-sm:min-w-20 max-sm:min-h-20 min-w-50 min-h-40"></div>
                  <h2 className="">Post 1</h2>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default Home;
