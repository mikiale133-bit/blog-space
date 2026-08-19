import React, { useEffect, useState } from "react";
import { Bookmark, CircleUserRound, Ellipsis, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import { ExploreSkeleton } from "../components/Loaders/Homepage.jsx";
import LikeBtn from "../components/LikeBtn";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      const endPoint = activeTab === "following" ? `/api/posts/following-posts` : "/api/posts";
      try {
        setLoading(true);
        const resp = await API.get(endPoint);

        setPosts(resp.data.posts);
      } catch (error) {
        setError(error.response.data.message);
        console.log("MSG: ", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [activeTab]);

  // const makenull = async () => {
  //   await API.post("/api/classes/null");
  // };
  const activeTabStyle = `border-b-2`;

  return (
    <div className="text-foreground max-w-2xl mx-auto">
      {/* BLOG GRID */}
      <main className="">
        {/* SECTION TITLE */}
        {!loading && !error && (
          // tabs

          <header className="">
            <div className="relative flex gap-5 text-lg font-semibold">
              <button className={`${activeTab === "all" && activeTabStyle}`} onClick={() => setActiveTab("all")}>
                {/* All Posts */}
              </button>

              <button className={`${activeTab === "following" && activeTabStyle}`} onClick={() => setActiveTab("following")}>
                {/* Following */}
              </button>
            </div>

            <div className="flex gap-2 items-center w-full">
              <div className="w-7 h-7 rounded-xl bg-green-300" />
              <input
                type="text"
                name=""
                id=""
                placeholder="What do you want to post 🤔"
                className="p-2 px-4 border border-blue-300 rounded-full w- bg-white focus-none cursor-pointer"
              />
            </div>

            <div className="overflow-hidden py-5">
              <div className="flex p-3 gap-4 items-center justify-center overflow-auto shrink">
                <div className="min-w-10 w-full shrink h-full aspect-square rounded-full bg-blue-200"></div>
                <div className="min-w-10 w-full shrink h-full aspect-square rounded-full bg-blue-200"></div>
                <div className="min-w-10 w-full shrink h-full aspect-square rounded-full bg-blue-200"></div>
                <div className="min-w-10 w-full shrink h-full aspect-square rounded-full bg-blue-200"></div>
                <div className="min-w-10 w-full shrink h-full aspect-square rounded-full bg-blue-200"></div>
              </div>
            </div>
          </header>
        )}

        {loading ? (
          <ExploreSkeleton />
        ) : posts.length === 0 ? (
          <div>
            <p>No Posts.</p>
            <p>Find people to connect</p>
          </div>
        ) : (
          <div className="posts-grid grid gap-1 sm:gap-3 grid-cols-1">
            {posts?.map((p, i) => (
              <article
                key={i}
                className="py-3 sm:rounded-lg shadow-g sm:border border-slate-300 transition-all duration-500 divide-neutral-300 bg-white dark:bg-muted/70 p-3"
              >
                <div className={`flex flex-col justify-between gap-1`}>
                  <header className="flex justify-between gap-3 text-text-secondary border-b pb-3 border-border">
                    <div className="flex gap-2 items-center">
                      {p.image === "" ? (
                        <img src={p.user?.profile_img?.url} alt="" className="w-10 h-10 object-cover rounded-full" />
                      ) : (
                        <div className="w-10 h-10 p-1 flex justify-center items-center bg-blue-100 rounded-full">
                          <CircleUserRound className="text-gray-500" />
                        </div>
                      )}

                      <div>
                        {p.user && <p className="text-xs">{p.user?.name}</p>}
                        <p className="text-sm">Jun 14, 2026</p>
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      <Ellipsis className="cursor-pointer" />
                    </div>
                  </header>

                  <div className="flex-1 flex flex-col justify-between">
                    <Link to={`/posts/${p._id}`}>
                      <h4 className="font-semibold line-clamp-2 text- my-2">
                        {/* {p.title} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, debitis!
                      </h4>
                    </Link>
                    <div className="flex justify-center items-center">
                      <img src={p.image?.url} alt="" className={`object-cover max-h-full`} />
                    </div>
                  </div>

                  {/* Interactions/Activities */}
                  <div className="flex justify-between items-center p-3">
                    <div className="flex items-center text-[15px] text-gray350">
                      <LikeBtn postId={p._id} initialLikeCount={p.num_likes} />

                      <Link className="" to={`/posts/${p._id}`}>
                        <div className="flex gap-1 items-center cursor-pointer px-5 py-1.5 hover:bg-slate-200">
                          <MessageCircle size={15} className=" fill-gray-00" />
                          <span className="max-sm:hiden">Comment</span>
                        </div>
                      </Link>

                      <div className="flex gap-1 items-center cursor-pointer px-2 sm:px-5 py-1.5 hover:bg-slate-200">
                        <Share2 size={15} className=" fill-gray-00" />
                        <span className="max-sm:hdden">Share</span>
                      </div>
                    </div>

                    <div className="flex gap-1 items-center py-1.5 px-2 sm:px-5 cursor-pointer hover:bg-slate-200">
                      <Bookmark className="" size={15} />
                      Save
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
