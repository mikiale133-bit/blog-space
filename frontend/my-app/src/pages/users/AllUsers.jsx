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
    <div className="min-h-screen transition-colors duration-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="max-w-5xl min-h-screen px-4 py-10 mx-auto">
        {/* People You May Know */}
        <section className="mb-10">
          <h1 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">You May Know These</h1>

          {loading ? (
            <div className="flex items-center justify-center h-48 text-slate-800 dark:text-slate-200">
              <DotLoader />
            </div>
          ) : knownUsers.length === 0 ? (
            <p className="my-10 text-center text-slate-500 dark:text-slate-400">We couldn't find people you know.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {knownUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col justify-between p-4 transition-all border shadow-sm group rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <Link to={`/users/${user._id}`}>
                    <div className="flex items-center gap-3 mb-3">
                      {user.profile_img?.url ? (
                        <img
                          src={user.profile_img.url}
                          alt={user.name}
                          className="object-cover w-12 h-12 border rounded-full border-slate-200 dark:border-slate-700"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {user.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>

                    <div>
                      <h2 className="mb-2 text-base font-semibold transition-colors line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {user.name}
                      </h2>
                    </div>
                  </Link>
                  {/* Prevent parent Link click when clicking Follow */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <FollowBtn userId={user._id} />
                  </div>
                </div>
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
