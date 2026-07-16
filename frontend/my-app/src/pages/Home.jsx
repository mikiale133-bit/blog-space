import React, { useEffect, useState } from "react";
import {
  Bookmark,
  Bot,
  CalendarDays,
  CircleUserRound,
  Clock3,
  DatabaseSearch,
  Ellipsis,
  Grid2X2XIcon,
  GripHorizontal,
  Heart,
  History,
  LucideShare2,
  MessageCircle,
  PlusCircle,
  Share,
  Share2,
  ThumbsUp,
  User,
  User2,
  UserCircle,
} from "lucide-react";
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { ExploreSkeleton } from "../components/Loaders/Homepage.jsx";
import Navbar from "@/components/Navbar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("for you");

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

  // const makenull = async () => {
  //   await API.post("/api/classes/null");
  // };
  const activeTabStyle = `border-b-2`;

  return (
    <div className="text-foreground">
      {/* BLOG GRID */}
      <main className="">
        {/* SECTION TITLE */}
        {!loading && !error && (
          // tabs

          <header className="flex mb-3 bg-white dark:bg-muted p-3 max-sm:justify-between sm:gap-10 items-center">
            <div className="relative flex gap-5 text-lg font-semibold">
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

        {loading ? (
          <ExploreSkeleton />
        ) : (
          <div className="space-y-4">
            {posts?.map((p, i) => (
              <article key={i} className="py-5 bg-white dark:bg-muted/70 p-3">
                <div className={`flex flex-col  gap-1 items`}>
                  <header className="flex justify-between -ml-2 gap-3 text-text-secondary border-b pb-3 border-border">
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

                  <div className="">
                    <Link to={`/posts/${p._id}`}>
                      <h4 className="font-bold line-clamp text-[18px] leading-relaxed max-w-120 my-2 font-serif">
                        {/* {p.title} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, debitis!
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

                  <Link to={`/posts/${p._id}`} className="w-full text-center bg-muted mx-auto p-1">
                    {p.image?.url && <img src={p.image.url} alt="" className={`aspect-video mx-auto object-cover bg-muted/60 max-h-100`} />}
                  </Link>

                  {/* Interactions/Activities */}
                  <div className="flex justify-between items-center flex-1 w-full h-full">
                    <div className="flex gap-7 items-center text-[18px] text-gray-400 mt-5">
                      <div className="flex gap-1 items-center cursor-pointer">
                        <ThumbsUp size={20} className=" fill-blue-800 text-blue-800" onClick={() => likePost(p._id)} /> <span>{p.num_likes}</span>
                      </div>

                      <div className="flex gap-1 items-center cursor-pointer">
                        <MessageCircle size={18} className=" fill-gray-00" /> {p.num_comments}
                      </div>

                      <div className="flex gap-1 items-center cursor-pointer">
                        <Share size={18} className=" fill-gray-00" /> 243
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
