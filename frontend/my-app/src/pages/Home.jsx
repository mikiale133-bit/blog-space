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

                <div className="posts-grid grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grd-cols-5">
                  {!error &&
                    news?.map((p, index) => (
                      <div key={index} className={`post-card flex sm:flex-col gap-1 p-1 max-sm:shadow-md bg-card pb-3`}>
                        <Link to={`/posts/${p._id}`}>
                          {p.image?.url && (
                            <img
                              src={p.image.url}
                              alt="Post image"
                              className={`object-cover  w-full flex-shrink-1 max-sm:max-w-30 h-full aspect-video mb-3`}
                            />
                          )}
                        </Link>

                        <div className="flex flex-col justify-between flex-1 h-full">
                          <div className="pl-2">
                            <Link to={`/posts/${p._id}`}>
                              <h4 className="mb-2 font-bold line-clamp-3 text-foreground leading-none md:leading-tight">{p.title}</h4>
                            </Link>

                            {/* <p className={`italic text-muted-foreground line-clamp-2 leading-none`}>{p.content}</p> */}
                            {/* DATE BADGE */}
                            <div className="inline-flex px-2 py-1 mt-1 -ml-1 rounded-full bg-green-50 dark:bg-background dark:border border-green-500">
                              <p className="text-[10px] font-semibold tracking-wider uppercase text-green-600">
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
                <span className="px-6 font-serif text-3xl italic bg-background text-foreground">Continue Blogging</span>
              </div>
            </div>
          )}

          {/* BLOG GRID */}
          <div className="gap-2 mx-auto max-w-7xl lg:flex">
            {loading ? (
              <ExploreSkeleton />
            ) : (
              <div className="grid justify-center gap-3 px-2 pb-10 mb-2 md:grid-cols-3 max-w-4xl mx-auto">
                {blogs?.map((post) => (
                  <article key={post._id} className="flex flex-col justify-between transition-all duration-500 rounded-lg shadow-md bg-card">
                    <Link to={`/posts/${post._id}`}>
                      {post.image?.url && (
                        <div className="aspect-video w-full overflow-hidden rounded-lg p-0.5">
                          <img src={post.image.url} alt={post.title} className="object-cover w-full h-full aspect-square" />
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-col justify-between flex-1 h-full">
                      <div>
                        <div className="mt-2 ml-1.5 inline-flex rounded-full bg-warning/10 dark:bg-background dark:border border-warning  px-2 py-1">
                          <p className="text-[10px] font-semibold tracking-wider uppercase text-warning">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <Link to={`/posts/${post._id}`}>
                          <h4 className="px-2 mb-3 mt-2 text-xl font-bold line-clamp-2 text-foreground">{post.title}</h4>
                        </Link>

                        {/* <p className="px-2 mb-2 text-sm italic line-clamp-2 text-muted-foreground">{post.content}</p> */}
                      </div>

                      <div className="flex items-center justify-between px-2 py-2 border-b border-border">
                        <Link to={`/users/${post?.user?._id}`} className="flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            {post.user?.profile_img ? (
                              <img src={post.user.profile_img.url} className="rounded-full h-7 w-7" />
                            ) : (
                              <p className="flex items-center justify-center text-sm rounded-full bg-muted text-foreground h-7 w-7">
                                {post.user?.name?.charAt(0).toUpperCase()}
                              </p>
                            )}
                            <p className="text-foreground">{post.user.name.split(" ")[0].slice(0)}</p>
                          </div>
                        </Link>

                        <div className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted cursor-pointer">
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
