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
    <aside className="bg-white dark:bg-muted/50 max-lg:hidden dark:border-gray-900 p-3 sticky top-20 overflow-y-auto w-70 lg:w-80  border-border no-scrollbar mt-1">
      {loading ? (
        <h2 className="h-full w-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </h2>
      ) : (
        <div>
          <div className="">
            <h2 className="mb-4 text-xl font-bold">Find Friends</h2>
          </div>

          <div className=" ">
            {users.slice(0, 5).map((p) => (
              <div key={p._id} className="hover:bg-slate-50 dark:hover:bg-muted rounded-full cursor-pointer p-2">
                <div className="w-full group flex items- gap-3 p-1">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex justify-center items-center">
                    <img src={p.profile_img?.url} alt="" className="w-10 h-10 object-cover rounded-xl bg-blue-00" />
                  </div>

                  <h2 className="line-clamp-3 text-sm font-semibold h-full">{p.name}</h2>
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
