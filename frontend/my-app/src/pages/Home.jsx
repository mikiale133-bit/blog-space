import React, { useEffect, useState } from "react";
import { Loader2, Bookmark, Search } from "lucide-react";
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeroSkeleton, {
  ExploreSkeleton,
} from "../components/Loaders/Homepage.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [errorDisplay, setErrorDisplay] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const resp = await API.get("/api/posts");
        const recentPosts = await API.get("/api/posts/recents");

        console.log("posts:", resp.data.posts);
        console.log(
          "Is resp.data.posts an array?",
          Array.isArray(resp.data.posts),
        );

        console.log("Type of resp.data.posts:", typeof resp.data.posts);
        setNews(recentPosts.data);
        setPosts(resp.data.posts);
      } catch (error) {
        setError(
          `${error.response.status === 500 ? "Server error" : "Failed to load posts"}`,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const blogs = Array.isArray(posts) ? posts.slice(2) : [];

  return (
    <main className="bg-white">
      <main className="min-h-screen">
        <div className="space-y-2">
          {loading ? (
            <HeroSkeleton />
          ) : (
            <div>
              {error && (
                <div>
                  <p className="rounded bg-red-50 p-4 text-red-500">{error}</p>
                </div>
              )}

              {!error && posts.length === 0 && <p>No posts found.</p>}

              <div
                className={`flex flex-col items-center ${!error && "bg-gray-100 py-5"}  mx-auto  px-2`}
              >
                <div className="mt-10 mb-5 grid max-w-7xl gap-2 md:grid-cols-3 lg:max-h-100 lg:grid-cols-2 lg:grid-rows-3 max-sm:space-y-3">
                  {!error &&
                    news?.map((p, index) => (
                      <div
                        key={p._id}
                        className={`h-full  transition-all duration-500 max-lg:shadow-md lg:flex lg:justify-between lg:gap-1 max-lg:flex max-lg:flex-col max-lg:justify-between ${
                          index === 0
                            ? "flex-col justify-between rounded-lg lg:row-span-3 shadow-lg lg:bg-white"
                            : "rounded-xl transition-all duration-700 lg:row-span-1  cursor-pointer"
                        }`}
                      >
                        <Link to={`/posts/${p._id}`}>
                          <div>
                            {p.image?.url && (
                              <div>
                                <img
                                  src={p.image.url}
                                  alt="Post image"
                                  className={`video object-cover w-full ${
                                    index !== 0
                                      ? "lg:h-27 lg:w-35 rounded-lg"
                                      : "w-full rounded-lg max-h-70"
                                  }`}
                                />
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="flex flex-1 flex-col justify-between h-full ">
                          {/* contents */}
                          <div className="pl-2">
                            <div className="mt-2 inline-flex rounded-full bg-yellow-100 px-2 py-1 -ml-1 lg:hidden">
                              <p className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                                {new Date(p.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Link to={`/posts/${p._id}`}>
                              <h4 className="mb-2 font-serif font-bold line-clamp-2">
                                {p.title}
                              </h4>
                            </Link>
                            <p
                              className={`italic text-gray-600 line-clamp-2 ${index === 0 ? "text-xl line-clamp-3" : "text-md"}`}
                            >
                              {p.content}
                            </p>
                          </div>

                          {/* card footer */}
                          <div className="mt-2 flex flex-1 items-center justify-between border-t border-gray-200 p-2 lg:mt-0 lg:hidden">
                            <div className="flex items-center gap-1">
                              {p.user?.profile_img ? (
                                <img
                                  src={p.user.profile_img.url}
                                  alt=""
                                  className="h-7 w-7 rounded-full"
                                />
                              ) : (
                                <p className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-sm text-gray-300">
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
            </div>
          )}

          {!loading && !error && (
            <div className="relative py-10">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-6 font-serif text-3xl italic text-gray-700">
                  Continue Blogging
                </span>
              </div>
            </div>
          )}

          <div className="mx-auto  max-w-7xl  gap-2 lg:flex">
            {loading ? (
              <ExploreSkeleton />
            ) : (
              <div className="grid gap-3 space-y-2 md:grid-cols-3 lg:grid-cols-4 justify-center px-2 pb-10 mb-2">
                {blogs?.map((post) => (
                  <article
                    key={post._id}
                    className="group relative flex flex-col justify-between rounded-lg bg-white shadow-lg transition-all duration-500"
                  >
                    <div>
                      <Link to={`/posts/${post._id}`} className="mb-2">
                        {post.image?.url && (
                          <div className="aspect-video w-full overflow-hidden rounded-lg p-0.5">
                            <img
                              src={post.image.url}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </Link>
                    </div>
                    <div className="flex h-full flex-1 flex-col justify-between">
                      <div className="">
                        <div>
                          <div className="mt-2 ml-1.5 inline-flex rounded-full bg-yellow-100 px-2 py-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Link to={`/posts/${post._id}`}>
                            <h4 className="mb-1 px-2 font-serif text-xl font-bold text-slate-900 transition-colors line-clamp-2 hover:text-gray-700 hover:underline">
                              {post.title}
                            </h4>
                          </Link>
                          <p className="mb-2 px-2 text-sm italic leading-relaxed text-slate-600 line-clamp-1">
                            {post.content}
                          </p>
                        </div>
                      </div>
                      <div className="relative mt-0 flex items-center justify-between border-t border-slate-100 px-2 py-2">
                        <Link
                          to={`/users/${post?.user?._id}`}
                          state={{ user: post.user }}
                          className="flex items-center gap-0.5"
                        >
                          <div className="flex items-center gap-1">
                            {post.user?.profile_img ? (
                              <img
                                src={post.user.profile_img.url}
                                alt=""
                                className="h-7 w-7 rounded-full"
                              />
                            ) : (
                              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-sm text-gray-300">
                                {post.user?.name?.charAt(0).toUpperCase()}
                              </p>
                            )}
                            <p>{post.user.name}</p>
                          </div>
                        </Link>

                        <div className="flex cursor-pointer items-center justify-center gap-1 rounded px-2 py-0.5 hover:bg-gray-100">
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
