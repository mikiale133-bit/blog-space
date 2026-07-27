import React, { useEffect, useState } from "react";
import { API } from "../../api/Axios";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import DotLoader from "@/components/Loaders/DotLoader";
import FollowBtn from "@/components/FollowBtn";
import Navbar from "@/components/Navbar";

const AllUsers = () => {
  const [knownUsers, setKnownUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await API.get("/api/users");
        setKnownUsers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <Navbar />
      <main className="px-4 max-w-5xl mx-auto min-h-screen py-10">
        {/* People You May Know */}
        <section className="mb-10">
          <h1 className="mb-6 font-bold text-2xl md:text-3xl tracking-tight">You May Know These</h1>

          {loading ? (
            <div className="flex justify-center items-center h-48 text-slate-800 dark:text-slate-200">
              <DotLoader />
            </div>
          ) : knownUsers.length === 0 ? (
            <p className="text-center my-10 text-slate-500 dark:text-slate-400">We couldn't find people you know.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {knownUsers.map((user) => (
                <Link
                  to={`/users/${user._id}`}
                  key={user._id}
                  className="group flex flex-col justify-between p-4 border rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {user.profile_img?.url ? (
                      <img
                        src={user.profile_img.url}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                        {user.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="font-semibold text-base line-clamp-1 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {user.name}
                    </h2>

                    {/* Prevent parent Link click when clicking Follow */}
                    <div onClick={(e) => e.stopPropagation()}>
                      <FollowBtn userId={user._id} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllUsers;
