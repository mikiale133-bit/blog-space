import React, { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeroSkeleton, { ExploreSkeleton } from "../components/Loaders/Homepage.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const resp = await API.get("/api/posts");
        const recentPosts = await API.get("/api/posts/recents");

        setNews(recentPosts.data);
        setPosts(resp.data.posts);
      } catch (error) {
        setError(`${error.response?.status === 500 ? "Server error" : "Failed to load posts"}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const blogs = Array.isArray(posts) ? posts.slice(2) : [];

  return (
    <main className="text-foreground">
      <main className="min-h-screen">
        <div className="space-y-2">
          {/* LOADING / ERROR / EMPTY */}
          {loading ? (
            <HeroSkeleton />
          ) : (
            <div>
              {error && <p className="p-4 rounded text-error bg-error/10">{error}</p>}

              {!error && posts.length === 0 && <p className="text-muted-foreground">No posts found.</p>}

              {/* NEWS GRID */}
              <div className={`flex flex-col mx-auto px-2 max-w-7xl`}>
                <h2 className="mb-3 mt-3 text-3xl font-serif italic text-foreground">Latest News</h2>

                <div className="posts-grid grid gap-2 grid-cols-1 sm:grid-cols-2 sm:px-5 md:grid-cols-4 lg:grd-cols-5">
                  {!error &&
                    news?.map((p, index) => (
                      <div key={index} className={`post-card flex sm:flex-col gap-1 max-sm:shadow-md bg-card pb-3`}>
                        <Link to={`/posts/${p._id}`} className="">
                          {p.image?.url && (
                            <img
                              src={p.image.url}
                              alt="Post image"
                              className={`object-cover  w-full flex-shrink-1 max-sm:max-w-30 h-full aspect-video mb-3 bg-muted`}
                            />
                          )}
                        </Link>

                        <div className="flex flex-col justify-between flex-1 h-full">
                          <div className="pl-2">
                            <Link to={`/posts/${p._id}`}>
                              <h4 className="font-semibold line-clamp-3 text-foreground leading-tight md:leading-tight">{p.title}</h4>
                            </Link>

                            {/* <p className={`italic text-muted-foreground line-clamp-2 leading-none`}>{p.content}</p> */}
                            {/* DATE BADGE */}
                            <div className="inline-flex mt-1 px-1 -ml-1 rounded-full bg-green-50 dark:bg-gray-900">
                              <p className="text-[10px] font-semibold tracking-wider uppercase dark:text-gray-400 text-pink-900 ">
                                {new Date(p.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION TITLE */}
          {!loading && !error && (
            <div className="relative py-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>

              <div className="relative flex justify-center">
                <span className="px-6 bg-gray-100 dark:bg-gray-900 font-serif text-3xl italic  text-foreground rounded-full">Picks For You</span>
              </div>
            </div>
          )}
          <div className="max-sm:bg-blue-100 max-sm:dark:bg-neutral-800 rounded-2xl">
            {/* BLOG GRID */}
            <div className="gap-2 mx-auto max-w-7xl lg:flex px-2 sm:px-5">
              {loading ? (
                <ExploreSkeleton />
              ) : (
                <div className="grid rounded-xl overflow-hidden py-1 justify-center gap3 mb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto max-sm:shadow-2xl">
                  {blogs?.map((post, i) => (
                    <article
                      key={i}
                      className={`sm:mx-1 ${i === 0 && "max-sm:rounded-t-2xl"} ${i === blogs.length - 1 && "max-sm:rounded-b-2xl border-b-background"} flex flex-col justify-between transition-all duration-500 border-b border-border shadow-md bg-white dark:bg-neutral-900`}
                    >
                      <Link to={`/posts/${post._id}`} className="p-2">
                        {post.image?.url ? (
                          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                            <img src={post.image.url} alt={"Cover Image"} className="object-cover w-full h-full aspect-square" />
                          </div>
                        ) : (
                          <div className="bg-muted w-full h-full"></div>
                        )}
                      </Link>

                      <div className="flex flex-col justify-between flex-1 h-full">
                        <div>
                          <div className="mt-2 ml-1.5 inline-flex rounded-full bg-blue-50  dark:bg-gray-900  px-1.5">
                            <p className="text-[10px] font-semibold tracking-wider uppercase text-yellow-900 dark:text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          <span className="mx-2 text-xs">|</span>

                          <Link to={`/posts/${post._id}`}>
                            <h4 className="px-2 mt-2 text-md font-semibold line-clamp-2 text-foreground">{post.title}</h4>
                          </Link>

                          {/* <p className="px-2 mb-2 text-sm italic line-clamp-2 text-muted-foreground">{post.content}</p> */}
                        </div>

                        <div className="flex items-center justify-between px-2 py-2">
                          <Link to={`/users/${post?.user?._id}`} className="flex items-center gap-1">
                            <div className="flex items-center gap-1">
                              {post.user?.profile_img ? (
                                <img src={post.user.profile_img.url} className="rounded-full h-7 w-7" />
                              ) : (
                                <p className="flex items-center justify-center text-[10px] rounded-full bg-muted text-foreground h-5 w-5">
                                  {post.user?.name?.charAt(0).toUpperCase()}
                                </p>
                              )}
                              <p className="text-foreground text-xs">{post.user.name.split(" ")[0].slice(0)}</p>
                            </div>
                          </Link>

                          <div className="flex items-center gap-1 px-2 py-0. rounded hover:bg-muted cursor-pointer">
                            <Bookmark size={13} />
                            <p className="mb-1 text-sm">save</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </main>
  );
};

export default Home;
