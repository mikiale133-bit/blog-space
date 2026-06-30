import React, { useEffect, useState } from "react";
import { Bookmark, Bot, CalendarDays, Clock3, GripHorizontal, Heart, MessageCircle, Share, ThumbsUp } from "lucide-react";
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeroSkeleton, { ExploreSkeleton } from "../components/Loaders/Homepage.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ai, setAi] = useState(false);
  const [activeTab, setActiveTab] = useState("for you");
  activeTab;

  const likePost = async (postId) => {
    setLoading(true);
    try {
      await API.post(`/api/likes`, { postId });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const resp = await API.get("/api/posts");

        setPosts(resp.data.posts);
      } catch (error) {
        setError(`${error.response?.status === 500 ? "Server error" : "Failed to load posts"}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const activeTabStyle = `border-b-2`;

  return (
    <div className="text-foreground">
      {ai && (
        <Link to="/chat" className="fixed z-100 rounded-lg bottom-1 right-1 flex items-center flex-col justify-center gap-2 p-1 sm:p-2 bg-yellow-100">
          <div className="p-1 sm:p-2 rounded-lg bg-black text-white">
            <Bot />
          </div>
          <p className="text-sm sm:text-lg font-semibold">Ask AI?</p>
        </Link>
      )}

      <section className="min-h-screen flex justify-between">
        {/* Left Sidebar */}
        <aside className="max-w-80 h-170 flex-1 p-4 max-md:hidden sticky top-18 left-0">
          <h2>Left Sidebar</h2>
        </aside>

        {/* BLOG GRID */}
        <main className="bg-white max-w-4xl ml-auto flex-1 px-4 py-10 justify-end">
          {/* SECTION TITLE */}
          {!loading && !error && (
            // tabs
            <header className="flex max-sm:justify-between sm:gap-10 items-center">
              <div className="relative flex gap-5 text-lg font-semibold my-5">
                <button className={`${activeTab === "for you" && activeTabStyle}`} onClick={() => setActiveTab("for you")}>
                  For You
                </button>
                <button className={`${activeTab === "recomended" && activeTabStyle}`} onClick={() => setActiveTab("recomended")}>
                  Recomended
                </button>

                <button className={`${activeTab === "following" && activeTabStyle}`} onClick={() => setActiveTab("following")}>
                  Following
                </button>
              </div>
            </header>
          )}

          <button className="opacity-0 ml-10 hidden" onClick={() => setAi(!ai)}>
            AI
          </button>

          {loading ? (
            <ExploreSkeleton />
          ) : (
            <div className=" max-w-3xl">
              {posts?.map((p, i) => (
                <article key={i} className="py-5 border-b border-gray-200 ">
                  {/* Stats */}
                  <section className="flex gap-3 items-center font-serif text-gray-500 pl-2.5 mb-2">
                    <div className="flex gap-2 items-center">
                      <div className="">
                        <img src={p.user?.profile_img?.url} alt="" className="w-5 h-5 object-cover rounded-full" />
                      </div>
                      <p className="text-xs">{p.user?.name}</p>
                    </div>

                    <div className="flex gap-1 items-center">
                      <p className="text-sm">Jun 14, 2026</p>
                    </div>
                  </section>

                  <section key={i} className={`flex flex-row-reverse gap-1 items-center`}>
                    <Link to={`/posts/${p._id}`} className="">
                      {p.image?.url && (
                        <img
                          src={p.image.url}
                          alt="Post image"
                          className={`object-cover sm:w-full max-w-30  shrink sm:h-22 max-sm:hidden aspect-square mb-3 bg-gray-100`}
                        />
                      )}
                    </Link>

                    <div className="flex flex-col justify-start flex-1 w-full h-full pl-3">
                      <div className="">
                        <Link to={`/posts/${p._id}`}>
                          <h4 className="font-bold line-clamp-2 text-lg text-gray-800 leading-relaxed max-w-120">
                            {/* {p.title} */}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, debitis!
                          </h4>

                          <h4 className="line-clamp-2 sm:line-clamp-3 text-gray-500 leading-relaxed max-w-100">
                            {/* {p.exerption} */}
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, doloribus!
                          </h4>
                        </Link>

                        {/* <p className={`italic text-muted-foreground line-clamp-2 leading-none`}>{p.content}</p> */}
                        {/* DATE BADGE */}
                        {/* <div className="inline-flex mt-1 px-1 -ml-1 rounded-full bg-green-50 dark:bg-gray-900">
                           <p className="text-[10px] font-semibold tracking-wider uppercase dark:text-gray-400 text-pink-900 ">
                             {new Date(p.createdAt).toLocaleDateString()}
                           </p>
                         </div> */}
                      </div>

                      {/* Interactions/Activities */}
                      <div className="flex gap-7 items-center text-sm text-gray-400 mt-5">
                        <div className="flex gap-0.5 items-center cursor-pointer">
                          <ThumbsUp size={16} className="mt-1 fill-gray-600" onClick={() => likePost(p._id)} /> <span>{p.num_likes}</span>
                        </div>

                        <div className="flex gap-1 items-center cursor-pointer">
                          <MessageCircle size={13} className="mt-0.5 fill-gray-00" /> {p.num_comments}
                        </div>

                        <div className="flex gap-1 items-center cursor-pointer">
                          <Share size={13} className="mt-0.5 fill-gray-00" /> 243
                        </div>
                      </div>
                    </div>
                  </section>
                </article>
              ))}
            </div>
          )}
        </main>

        {/* Right Sidebar*/}
        <aside className="max-w-85 h-170 p-4 bg-white max-md:hidden sticky top-18 right-0">
          {loading ? (
            <HeroSkeleton />
          ) : (
            <div>
              {error && <p className="p-4 rounded text-error bg-error/10">{error}</p>}

              {!error && posts.length === 0 && <p className="text-muted-foreground">No posts found.</p>}

              {/* NEWS GRID */}
              <div className={`flex flex-col mx-auto px-2 max-w-7xl`}>
                <h2 className="text-xl font-serif text-foreground mb-3">Staf ANnouncements</h2>

                <div className="">
                  {!error &&
                    posts?.map((p, index) => (
                      <article key={index} className={`py-5 border-b border-gray-100`}>
                        {/* Top Stats */}
                        <div className="flex gap-2 items-center mb-2">
                          <img src={p?.user?.profile_img.url} alt="" className="w-5 h-5 rounded-full object-cover" />
                          <h2 className="font-semibold text-sm text-gray-500 italic">by {p.user.name}</h2>
                          <p className="text-xs ">{new Date(p.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="flex flex-row-reverse gap-2">
                          <div className="flex flex-col justify-between flex-1 h-full ">
                            <Link to={`/posts/${p._id}`}>
                              <h4 className="font-semibold line-clamp-2 max-sm:text-gray-500 leading-relaxed">{p.title}</h4>

                              <h4 className="line-clamp-3 text-foreground leading-relaxed">{p.exerption}</h4>
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            </div>
          )}
        </aside>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
