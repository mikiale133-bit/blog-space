import React, { useEffect, useState } from "react";
import { API } from "../../api/Axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Loader2 } from "lucide-react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await API.get("/api/users");
        setUsers(response.data);
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
      <div className="px-2 pr-4 max-w-5xl mx-auto min-h-screen">
        <h1 className="my-5 font-bold text2xl">All Users of this app</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-900">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          users.length === 0 && (
            <p className="text-center mt-10">No users found.</p>
          )
        )}

        {users?.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center p-2 border rounded border-gray-300 mb-2"
          >
            <div>
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            <div>
              <Link
                to={`/users/${user._id}`}
                className="hover:text-blue-800 hover:underline"
              >
                View profile
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-end"></div>
      <Footer />
    </div>
  );
};

export default AllUsers;
