import React, { useEffect, useState } from "react";
import {
  Bookmark,
  Bot,
  CalendarDays,
  Clock3,
  DatabaseSearch,
  Grid2X2XIcon,
  GripHorizontal,
  Heart,
  History,
  MessageCircle,
  PlusCircle,
  Share,
  ThumbsUp,
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

          <header className="flex bg-white p-3 max-sm:justify-between sm:gap-10 items-center">
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
          <div className="grid">
            {posts?.map((p, i) => (
              <article key={i} className="py-5 bg-white p-3 my-1 rounded">
                <section className={`flex flex-col  gap-1 items-center`}>
                  <Link to={`/posts/${p._id}`} className="w-full">
                    <div className="">
                      {p.image?.url && <img src={p.image.url} alt="" className={`object-cover aspect-video max-h-60 w-full mb-3 bg-muted/60`} />}
                    </div>
                  </Link>

                  <div className="flex flex-col justify-start flex-1 w-full h-full">
                    {/* Stats */}
                    <section className="flex gap-3 items-center font-serif text-text-secondary mb-2">
                      <div className="flex gap-2 items-center">
                        {p.image === "" ? (
                          <img src={p.user?.profile_img?.url} alt="" className="w-5 h-5 object-cover rounded-full" />
                        ) : (
                          <div className="w-5 h-5 bg-blue-300 rounded-full" />
                        )}

                        {p.user && <p className="text-xs">{p.user?.name}</p>}
                      </div>

                      <div className="flex gap-1 items-center">
                        <p className="text-sm">Jun 14, 2026</p>
                      </div>
                    </section>

                    <div className="">
                      <Link to={`/posts/${p._id}`}>
                        <h4 className="font-bold line-clamp text-[18px] leading-relaxed max-w-120 my-2 font-serif">
                          {/* {p.title} */}
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, debitis!
                        </h4>

                        <h4 className="line-clamp-2 sm:line-clamp-3 text-gray-500 dark:text-gray-400 leading-relaxed max-w-100 text-[15px]">
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

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
