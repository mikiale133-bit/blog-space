import React, { useEffect, useState } from "react";
import { API } from "../../api/Axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Loader2 } from "lucide-react";
import DotLoader from "@/components/Loaders/DotLoader";
import FollowBtn from "@/components/FollowBtn";

const AllUsers = () => {
  const [KnownUsers, setKnownUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await API.get("/api/users");
        setKnownUsers(response.data);
        // setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <main className="px-2 pr-4 max-w-5xl mx-auto min-h-screen mt-10">
        {/* People you may know */}
        <div className="">
          <h1 className="my-5 font-bold text-2xl">You May Know These People</h1>

          {loading ? (
            <div className="flex justify-center items-center h-64 text-gray-900">
              <DotLoader />
            </div>
          ) : (
            KnownUsers.length === 0 && <p className="text-center mt-10">No users you know.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {KnownUsers?.map((user) => (
              <div key={user._id} className="flex flex-col justify-between p-2 border rounded border-gray-300 mb-2">
                <Link to={`/users/${user._id}`} className="flex items-center gap-2 mb-2">
                  <img src={user.profile_img?.url} alt="" className="aspect-[1/1]" />
                </Link>
                <div>
                  <h2 className="font-semibold text-lg">{user.name}</h2>

                  <FollowBtn userId={user._id} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="md:flex gap-4 space-y-4 mt-10 lg:mt-15">
          {/* Staff Members */}
          <section className="border border-gray-200 p-2 rounded-lg">
            <h2 className="my-5 font-semibold text-2xl">Members</h2>

            <div className="members-grid grid grid-cols-2 gap-3 sm:grid-cols-3">
              {KnownUsers?.map((user) => (
                <div key={user._id} className="flex flex-col items-center justify-between border border-transparent p-2 bg-gray-100 rounded-lg">
                  <Link to={`/users/${user._id}`} className="flex align-middle gap-2 mb-2">
                    <img src={user.profile_img?.url} alt="" className="aspect-square rounded-full max-h-20 mx-auto" />
                  </Link>
                  <div className="text-center">
                    <h2 className="font-semibold mb-1">{user.name}</h2>

                    <div className="bg-black inline">
                      <FollowBtn userId={user._id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Students */}
          {/* Staff Members */}
          <section className="border-2 border-gray-200 p-2 rounded-lg mb-3">
            <h2 className="my-5 font-semibold text-2xl">Instructors</h2>

            <div className="members-grid grid gap-3 grid-cols-2">
              {KnownUsers?.map((user) => (
                <div key={user._id} className="flex flex-col items-center justify-between shadow-sm p-2 rounded-lg">
                  <Link to={`/users/${user._id}`} className="flex align-middle gap-2 mb-2">
                    <img src={user.profile_img?.url} alt="" className="aspect-square rounded-full max-h-20 mx-auto" />
                  </Link>
                  <div className="text-center">
                    <h2 className="font-semibold mb-1">{user.name}</h2>

                    <FollowBtn userId={user._id} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllUsers;
