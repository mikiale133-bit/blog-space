import React, { useEffect, useState } from "react";
import { Bookmark, CircleUserRound, Ellipsis, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import { ExploreSkeleton } from "../components/Loaders/Homepage.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
  // const activeTabStyle = `border-b-2`;

  return (
    <div className="text-foreground">
      {/* BLOG GRID */}
      <main className="">
        {/* SECTION TITLE */}
        {!loading && !error && (
          // tabs

          <header className="flex mb-3 px-2 max-sm:justify-between sm:gap-10 items-center">
            {/* <div className="relative flex gap-5 text-lg font-semibold">
              <button className={`${activeTab === "all" && activeTabStyle}`} onClick={() => setActiveTab("all")}>
                All Posts
              </button>

              <button className={`${activeTab === "following" && activeTabStyle}`} onClick={() => setActiveTab("following")}>
                Following
              </button>
            </div> */}
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
          <div className="posts-grid grid gap-3 grid-cols-s sm:grid-cols-2">
            {posts?.map((p, i) => (
              <article
                key={i}
                className="max-h-150 py-3 rounded-lg shadow-g border border-slate-300 transition-all duration-500 divide-neutral-300 bg-white dark:bg-muted/70 p-3"
              >
                <div className={`flex flex-col justify-between gap-1 h-full`}>
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
                      {" "}
                      <Ellipsis />
                    </div>
                  </header>

                  <div className="flex-1 h-full flex flex-col justify-between">
                    <div className="">
                      <Link to={`/posts/${p._id}`}>{p.image?.url && <img src={p.image.url} alt="" className={`aspect-video object-cover `} />}</Link>
                    </div>
                    <Link to={`/posts/${p._id}`}>
                      <h4 className="font-bold line-clamp text-[18px] leading-relaxed max-w-120 my-2 font-serif">
                        {/* {p.title} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, debitis!
                      </h4>
                    </Link>
                  </div>

                  {/* Interactions/Activities */}
                  <div className="flex justify-between items-center p-3">
                    <div className="flex gap-7 items-center text-[18px] text-gray-400">
                      <div className="flex gap-1 items-center cursor-pointer">
                        <ThumbsUp size={20} className=" fill-blue-800 text-blue-800" onClick={() => likePost(p._id)} /> <span>{p.num_likes}</span>
                      </div>

                      <div className="flex gap-1 items-center cursor-pointer">
                        <MessageCircle size={18} className=" fill-gray-00" /> {p.num_comments}
                      </div>

                      <div className="flex gap-1 items-center cursor-pointer">
                        <Share2 size={18} className=" fill-gray-00" /> 243
                      </div>
                    </div>

                    <div>
                      <Bookmark className="" size={18} />
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
