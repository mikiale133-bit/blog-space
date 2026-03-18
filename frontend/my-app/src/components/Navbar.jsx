import { useState } from "react";
import { LogIn, LogOut, Plus, Signature, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-white border-b border-slate-200 py-4 px-4 mb-8">
        <div className="max-w-5xl mx-auto">
          {/* Desktop and Mobile Header */}
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

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to={"/create-post"}
                className="flex items-center gap-1 bg-blue-600 text-white px-2 pr-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                <Plus size={16} />
                Create Post
              </Link>

              <Link
                to={"/users"}
                className="bg-green-500 text-white px-2 py-1 rounded border border-gray-400 text-sm"
              >
                People
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    className="hover:bg-gray-200 px-2 py-1 rounded-lg cursor-pointer flex gap-2 items-center border border-gray-400 text-sm"
                    onClick={() => setLogoutModalOpen(true)}
                  >
                    <LogOut size={16} /> Logout
                  </button>

                  {logoutModalOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg z-10 rounded-md">
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left cursor-pointer text-sm"
                      >
                        Confirm Logout
                      </button>
                      <button
                        onClick={() => setLogoutModalOpen(false)}
                        className="block px-4 py-2 text-white text-center bg-black w-full cursor-pointer rounded-b-lg text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
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

            {/* Mobile Menu Button - Visible only on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation - Visible when menu is open */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
              <Link
                to={"/create-post"}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Plus size={16} />
                Create Post
              </Link>

              <Link
                to={"/users"}
                className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={16} />
                People
              </Link>

              {user ? (
                <div className="space-y-2">
                  <button
                    className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg border border-gray-400 text-sm w-full hover:bg-gray-300 transition"
                    onClick={() => {
                      setLogoutModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} /> Logout
                  </button>

                  {/* Mobile Logout Modal */}
                  {logoutModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-lg p-4 w-full max-w-sm">
                        <p className="text-lg font-semibold mb-4">
                          Confirm Logout
                        </p>
                        <p className="text-gray-600 mb-6">
                          Are you sure you want to logout?
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={handleLogout}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            Yes, Logout
                          </button>
                          <button
                            onClick={() => setLogoutModalOpen(false)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
      </nav>
    </div>
  );
};

export default Navbar;
