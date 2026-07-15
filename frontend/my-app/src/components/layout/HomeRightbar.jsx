import { API } from "@/api/Axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeRightbar = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const resp = await API.get("/api/posts");

        setPosts(resp.data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <aside className="rounded-lg bg-white h-158 max-lg:hidden dark:border-gray-900 p-3 sticky top-20 overflow-y-auto w-70 lg:w-80  border-border no-scrollbar">
      {loading && (
        <h2 className="w-full bg-red-500 h-full max-h-screen flex justify-center items-center ">
          <Loader2 className="animate-spin" />
        </h2>
      )}
      <div className="">
        <h2 className="mb-4 text-xl font-bold">Latest News</h2>
      </div>

      <div className="space-y-2 grid ">
        {posts.slice(0, 5).map((p) => (
          <div key={p._id} className="hover:bg-muted">
            <Link to={`/posts/${p._id}`} className="w-full group flex items- gap-3 p-1">
              <div>
                <div src={p.image?.url} alt="" className="w-20 h-20 object-cover rounded-xl bg-muted" />
              </div>

              <h2 className="line-clamp-3 text-sm font-semibold h-full">{p.title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla?</h2>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default HomeRightbar;
