import React, { useEffect, useState } from "react";
import { Loader2, Bookmark, Search } from "lucide-react"; // Import icons
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeroSkeleton, {
  ExploreSkeleton,
} from "../components/Loaders/Homepage.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  // const [users, setUsers] = useState([]);
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
      } catch (error) {
        setError(`Failed to load posts: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  console.log(posts);

  // useEffect(() => {
  //   const func = async () => {
  //     setLoading(true);
  //     setError("");
  //     try {
  //       const res = await API.get(`/api/users`);
  //       setUsers(res.data);
  //     } catch (error) {
  //       console.log(`error fetching users: ${error}`);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   func();
  // }, []);

  // explore posts
  const explorePosts = posts.slice(4);

  return (
    <main className="min-h-screen bg-gray-100">
      <main className="max-w-7xl pr-2 pl-2 mx-auto pb-5 max-sm:px-2">
        {/* Header Section - search-bar */}
        <div className="mb-5 pt-5">
          <div className="relative">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search posts..."
              className="p-1  backdrop-blur-lg shadow-sm bg-white rounded-full pl-10 w-full"
            />
            <div className="absolute left-3 top-1.5 text-gray-500">
              <Search size={22} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {loading ? (
            <HeroSkeleton />
          ) : (
            <div>
              {error && (
                <p className="text-red-500 bg-red-50 p-4 rounded">{error}</p>
              )}

              {posts.length === 0 && <p>No posts found.</p>}

              <div className="md:grid md:grid-cols-3  lg:grid-cols-2 lg:grid-rows-3 gap-2 max-w-7xl mb-5 lg:max-h-100 max-sm:space-y-3 mt-10">
                {recentPosts?.map((p, index) => (
                  <div
                    key={p._id}
                    className={`shadow-md lg:flex lg:justify-between lg:items-center lg:gap-2 max-lg:flex max-lg:flex-col max-lg:justify-between h-full ${index === 0 ? "lg:row-span-3 shadow-md shadow-blue-200 rounded-lg flex-col  justify-between" : "lg:row-span-1 lg:p-1  rounded-xl  transition-all duration-500 max-sm:border-gray-300 max-sm:p-1"}`}
                  >
                    <Link to={`/posts/${p._id}`}>
                      {/* image */}
                      <div className="">
                        {p.image && p.image.url && (
                          <div>
                            <img
                              src={p.image.url}
                              alt="Post image"
                              className={`w-full object-cover ${index !== 0 ? "lg:h-25 lg:w-30" : ""}`}
                            />
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* content */}
                    <div className="flex-1 h-full justify-between flex flex-col">
                      <div className="pl-2">
                        {/* Date of post = will be hidden in large screen */}
                        <div className="mt-2 lg:hidden -ml-1 py-1 px-2 bg-yellow-100 rounded-full inline-flex">
                          <p className="text-xs uppercase tracking-wider text-slate-800 font-semibold">
                            {new Date(p.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Link to={`/posts/${p._id}`}>
                          <h4
                            className={`font-bold font-serif line-clamp-2 mb-2  ${index === 0 && ""}`}
                          >
                            {p.title}
                          </h4>
                        </Link>
                        <p
                          className={`text-sm italic line-clamp-2 text-gray-600 ${index === 0 ? "text-xl  line-clamp-3" : "text-md"}`}
                        >
                          {p.content}
                        </p>
                      </div>

                      {/* card footer */}
                      <div className="flex-1 flex justify-between items-center mt-2 lg:mt-0 lg:hidden border-t border-gray-200 p-2">
                        <div className="flex items-center gap-1 ">
                          {p.user.profile_img && p.user.profile_img.url ? (
                            <img
                              src={p.user.profile_img.url}
                              alt=""
                              className="w-7 h-7 rounded-full"
                            />
                          ) : (
                            <p className="w-7 h-7 rounded-full bg-gray-300 flex justify-center items-center text-sm text-gray-600">
                              {p.user?.name?.charAt(0).toUpperCase()}
                            </p>
                          )}

                          <p>{p.user.name}</p>
                        </div>

                        <Bookmark size={15} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative py-10">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-100 px-6 text-3xl font-serif italic text-gray-700">
                More Stories
              </span>
            </div>
          </div>
          {/* Explore Posts */}
          <div className="lg:flex justify-between gap-2 space-y-2">
            {loading ? (
              <ExploreSkeleton />
            ) : (
              <div className="space-y-2 md:grid md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center ">
                {explorePosts.map((post) => (
                  <article
                    key={post._id}
                    className="group bg-white transition-all  duration-500 relative flex flex-col rounded-lg justify-between shadow-xs"
                  >
                    <div>
                      {/* Post Image */}
                      <Link to={`/posts/${post._id}`} className="mb-2">
                        {post.image && post.image.url && (
                          <div className="w-full aspect-video p-0.5 overflow-hidden rounded-lg">
                            <img
                              src={post.image.url}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </Link>
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div className="">
                        {/* Card Body: Title & Content */}
                        <div>
                          {/* Date of post = will be hidden in large screen */}
                          <div className="mt-2 ml-1.5 py-1 px-2 bg-yellow-100 rounded-full inline-flex">
                            <p className="text-xs uppercase tracking-wider text-slate-800 font-semibold">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Link to={`/posts/${post._id}`}>
                            <h4 className="text-xl font-bold font-serif text-slate-900 mb-1 transition-colors line-clamp-2 px-2 hover:underline hover:text-gray-700">
                              {post.title}
                            </h4>
                          </Link>

                          <p className="text-slate-600 text-sm leading-relaxed line-clamp-1 px-2 mb-2 italic">
                            {post.content}
                          </p>
                        </div>
                      </div>
                      {/* Card Footer: Action */}
                      <div className="mt-0 py-2 border-t border-slate-100 flex justify-between items-center px-2 relative">
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

                          <p className="w-7 h-7 rounded-full bg-gray-100 flex justify-center items-center text-xs text-gray-400">
                            {post.user?.name?.charAt(0).toUpperCase()}
                          </p>
                          {/* <div className="hover:text-green-700  hover:underline text-sm text-green-800">
                            {post.user.name}
                          </div> */}
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
            )}
          </div>
        </div>
      </main>

      <Footer />
    </main>
  );
};

export default Home;
