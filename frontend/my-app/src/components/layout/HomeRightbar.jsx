import { API } from "@/api/Axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeRightbar = () => {
  const [users, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const resp = await API.get("/api/users");
        const usersData = resp.data.slice(0, 10);
        setPosts(usersData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <aside className="sticky h-[calc(100vh-64px)] p-3 overflow-y-auto bg-blue-50/50 dark:bg-background border-l max-lg:hidden dark:border-gray-900 top-16 w-70 lg:w-80 border-border no-scrollbar">
      {loading ? (
        <h2 className="flex items-center justify-center w-full h-full">
          <Loader2 className="animate-spin" />
        </h2>
      ) : (
        <div>
          <div className="">
            <h2 className="mb-4 text-xl font-bold">Find Friends</h2>
          </div>

          <div className="">
            {users.slice(0, 5).map((p) => (
              <div key={p._id} className="p-2 rounded-full cursor-pointer hover:bg-slate-50 dark:hover:bg-muted">
                <div className="flex w-full gap-3 p-1 group items-">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full">
                    <img src={p.profile_img?.url} alt="" className="object-cover w-10 h-10 rounded-xl bg-blue-00" />
                  </div>

                  <h2 className="h-full text-sm font-semibold line-clamp-3">{p.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default HomeRightbar;
