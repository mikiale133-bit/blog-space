import { useState } from "react";
import {
  LogIn,
  LogOut,
  Plus,
  Signature,
  User,
  Menu,
  X,
  Settings,
  Link2,
  Mail,
  MailCheck,
  ArrowRight,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // close logout modal when clicked on any screen
  // const handleOutsideClick = (e) => {
  //   if (logoutModalOpen && e.target !== e.currentTarget) {
  //     setLogoutModalOpen(false);
  //   }
  // };
  // window.addEventListener("click", handleOutsideClick);

  return (
    <div>
      <nav className="bg-white border-b border-slate-200 py-4  mb-8">
        <div className="max-w-5xl mx-auto">
          {/* Desktop Header */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to={"/"}
              className="flex gap-2 items-center text-lg font-bold"
            >
              <Signature />{" "}
              <div>
                {" "}
                Blog<span className="text-yellow-500">Space</span>
              </div>
            </Link>

            {/* right sidebar */}
            <div className="flex gap-1 items-center">
              {/* Navigation - nav center*/}
              <div className="hidden md:flex items-center gap-2">
                <div className="px-2 py-2 rounded-lg font-medium transition hover:bg-gray-100 cursor-pointer">
                  News
                </div>

                <div className="px-2 py-2 rounded-lg font-medium transition hover:bg-gray-100 cursor-pointer">
                  Announcement
                </div>

                <div className="flex gap-1 items-center px-2 py-2 rounded font-medium transition hover:bg-amber-100 cursor-pointer">
                  Blog
                  <ChevronDown size={18} />
                </div>

                <Link
                  to={"/users"}
                  className=" px-2 py-2 rounded font-medium transition hover:bg-gray-100 cursor-pointer"
                >
                  People
                </Link>

                <Link
                  to={"/create-post"}
                  className="bg-gray-100 flex items-center gap-1 px-2 pr-4 py-2 rounded  font-medium transition "
                >
                  <Plus size={16} />
                  Create Post
                </Link>
              </div>

              {/* right  */}
              <div className="ml-4">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setLogoutModalOpen(!mobileMenuOpen)}
                      className="relative w-7 h-7 bg-gray-100 flex justify-center items-center p-2 rounded-full hover:bg-gray-300 transition cursor-pointer"
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      to={"/auth/login"}
                      className="bg-gray-200 px-2 py-1 rounded border border-gray-400 flex gap-1 items-center text-sm"
                    >
                      <LogIn size={16} /> Login
                    </Link>
                    <Link
                      to={"/auth/register"}
                      className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1 border border-gray-400 text-sm"
                    >
                      <User size={16} /> Register
                    </Link>
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Visible when menu is open */}
          {mobileMenuOpen && (
            <div className="px-2 flex flex-col gap-1 items-start md:hidden mt-4 py-4 border-t border-gray-200 shadow-md">
              <div className="px-2 pr-10 py-2 rounded-lg font-medium transition hover:bg-gray-100 cursor-pointer">
                News
              </div>

              <div className="px-2 pr-10 py-2  font-medium transition hover:bg-gray-100 cursor-pointer">
                Announcement
              </div>

              <div className="flex gap-1 items-center px-2 pr-10 py-2 rounded font-medium transition hover:bg-amber-100 cursor-pointer">
                Blog
                <ChevronDown size={18} />
              </div>

              <Link
                to={"/users"}
                className=" px-2 pr-10 py-2 rounded font-medium transition hover:bg-gray-100 cursor-pointer"
              >
                People
              </Link>

              <Link
                to={"/create-post"}
                className="bg-gray-100 flex items-center gap-1 px-2 pr-10 py-2 rounded  font-medium transition "
              >
                <Plus size={16} />
                Create Post
              </Link>

              {user ? (
                <div className="text-gray-800">
                  <h2 className="text-lg italic mt-5">{user.name}</h2>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to={"/auth/login"}
                    className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg border border-gray-400 text-sm w-full hover:bg-gray-300 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn size={16} /> Login
                  </Link>
                  <Link
                    to={"/auth/register"}
                    className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg border border-gray-400 text-sm w-full hover:bg-gray-300 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} /> Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {logoutModalOpen && (
          <div className="absolute right-7 mt-2 w-48 bg-white border shadow-xl border-gray-50 border-b-black  z-10 rounded-md overflow-hidden">
            <div className="p-2  bg-gray-200 rounded-b-xxl mb-2">
              {user && user.profile_img && user.profile_img.url && (
                <img
                  src={user.profile_img.url}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mx-auto"
                />
              )}

              <div>
                <h2 className="font-bold text-lg">{user.name}</h2>
                <p className="flex text-xs items-center gap-1 pl-0.5 text-gray-700">
                  <MailCheck size={15} /> {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 flex gap-1 items-center  border-b border-b-gray-300 hover:bg-gray-100 w-full text-left cursor-pointer text-sm"
            >
              <LogOut size={16} /> Logout
            </button>

            <Link
              to={`users/${user._id}`}
              onClick={() => setLogoutModalOpen(false)}
              className="px-4 py-2 border-b border-b-gray-300  flex gap-1 items-center  hover:bg-gray-100 w-full text-left cursor-pointer text-sm"
            >
              <User size={16} /> Profile
            </Link>

            <Link
              to={"/settings"}
              onClick={() => setLogoutModalOpen(false)}
              className="px-4 py-2 border-b border-b-gray-300  flex gap-1 items-center hover:bg-gray-100 w-full text-left cursor-pointer text-sm"
            >
              <Settings size={16} /> Settings
            </Link>

            <button
              onClick={() => setLogoutModalOpen(false)}
              className="block px-4 py-2 text-white text-center bg-black w-full cursor-pointer  text-sm rounded-b"
            >
              Cancel
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
