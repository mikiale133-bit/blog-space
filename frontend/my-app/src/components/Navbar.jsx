import { useState } from "react";
// import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Plus, Signature, User, Menu, X, Settings, MailCheck, ChevronDown, LogInIcon, Moon, Sun } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { logOut, user } from "@/features/store";

export const Navbar = () => {
  // const { theme, toggleTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  // const dispatch = useDispatch();

  const [popupOpened, setPopupOpened] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenus = () => {
    setMobileMenuOpen(false);
  };

  // console.log(user);

  return (
    <div>
      <nav className="py-4 shadow-md dark:border-b bg-background dark:bg-gray-900 text-foreground border-gray-800">
        <div>
          {/* Desktop Header */}
          <div className="flex items-center justify-between px-4">
            {/* Logo */}
            <Link to={"/"} className="flex items-center gap-2 text-lg font-bold">
              <Signature />
              <div>
                Blog<span className="text-primary">Space</span>
              </div>
            </Link>

            {/* right sidebar */}
            <div className="flex items-center gap-1">
              {/* Navigation */}
              <div className="flex gap-5 items-center">
                <div className="items-center hidden gap-2 md:flex">
                  <div className="px-2 py-2 font-medium transition rounded-lg cursor-pointer hover:bg-muted">News</div>

                  <div className="px-2 py-2 font-medium transition rounded-lg cursor-pointer hover:bg-muted">Announcement</div>

                  <div className="flex items-center gap-1 px-2 py-2 font-medium transition rounded cursor-pointer hover:bg-muted">
                    Blog
                    <ChevronDown size={18} />
                  </div>

                  <Link
                    to={"/users"}
                    className="px-2 py-2 font-medium transition rounded cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-muted/70"
                  >
                    People
                  </Link>

                  <Link
                    to={"/create-post"}
                    className="flex text-white items-center gap-1 px-2 py-2 pr-4 font-medium transition rounded bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus size={16} />
                    Create
                  </Link>
                </div>

                {/* right */}
                <div className="ml-4">
                  {user ? (
                    <div className="relative">
                      <button
                        onClick={() => setPopupOpened(!mobileMenuOpen)}
                        className="relative flex items-center justify-center p-2 transition rounded-full cursor-pointer w-7 h-7 bg-muted hover:bg-muted/70 text-foreground"
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        to={"/auth/register"}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-foreground text-background max-md:hidden"
                      >
                        <User size={16} /> Get started
                      </Link>

                      <Link
                        to={"/auth/login"}
                        className="flex items-center gap-1 px-3 py-1 border rounded-full border-border hover:bg-muted md:hidden"
                      >
                        <LogInIcon size={16} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* mobile toggle */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 transition rounded-lg md:hidden hover:bg-muted">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="fixed left-0 top-0 h-screen w-64 flex flex-col items-start gap-1 px-2 py-4 border-t shadow-md border-border bg-background md:hidden">
              {/* Logo */}
              <Link to={"/"} className="flex items-center gap-2 text-lg font-bold mb-5 ">
                <Signature />
                <div>
                  Blog<span className="text-primary">Space</span>
                </div>
              </Link>

              {/* Navigation Links */}
              <div className="w-full flex flex-col gap-0">
                <button
                  onClick={() => closeMobileMenus()}
                  className="w-full px-2 py-2 text-start font-medium transition rounded- cursor-pointer hover:bg-muted hover:underline"
                >
                  News
                </button>

                <button
                  onClick={() => closeMobileMenus()}
                  className="w-full px-2 py-2 text-start font-medium transition cursor-pointer hover:bg-muted hover:underline"
                >
                  Announcement
                </button>

                <button className="w-full flex justify-between items-center gap-1 px-2 py-2 text-start font-medium transition cursor-pointer hover:bg-muted">
                  <h2>Blog</h2>
                  <ChevronDown size={18} />
                </button>

                <Link
                  onClick={() => closeMobileMenus()}
                  to={"/users"}
                  className="px-2 py-2 text-start w-full font-medium transition rounded cursor-pointer hover:bg-muted"
                >
                  People
                </Link>

                <Link
                  onClick={() => closeMobileMenus()}
                  to={"/create-post"}
                  className="w-full mt-2 flex items-center gap-1 px-2 py-2 pr-10 font-medium transition rounded bg-yellow-600 text-gray-200"
                >
                  <Plus size={16} />
                  Create Post
                </Link>
              </div>

              <div className="mt-auto w-full">
                {!user ? (
                  <div className="mt-5 text-foreground">
                    <h2 className="text-lg italic">{user.name}</h2>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-5">
                    <Link
                      to={"/auth/login"}
                      className="w-full flex items-center gap-2 px-3 py-2 text-md rounded-lg bg-foreground text-background"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User size={16} /> Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* profile popup */}
        {popupOpened && (
          <div className="absolute z-10 w-50 mt-2 overflow-hidden border rounded-md shadow-xl right-7 border-border bg-card">
            <div className="p-2 mb-2 rounded-b bg-muted flex justify-star items-start gap-3">
              {user.profile_img ? (
                <img src={user.profile_img?.url} alt={user.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="p-2 bg-white rounded-full text-gray-500">
                  <User size={20} />
                </div>
              )}

              <div>
                <h2 className="text-lg font-bold mt-1">{user.name.split(" ")[0]}</h2>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center w-full gap-1 px-4 py-2 text-sm text-left border-b cursor-pointer border-border hover:bg-muted"
            >
              <LogOut size={16} /> Logout
            </button>

            <Link
              to={`users/${user._id}`}
              onClick={() => setPopupOpened(false)}
              className="flex items-center w-full gap-1 px-2.5 py-2 text-sm text-left border-b cursor-pointer border-border hover:bg-muted"
            >
              {user.profile_img ? (
                <img src={user.profile_img?.url} alt={user.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="p-1 border border-gray-400 bg-white rounded-full text-gray-500">
                  <User size={20} />
                </div>
              )}{" "}
              Profile
            </Link>

            <Link
              to={"/settings"}
              onClick={() => setPopupOpened(false)}
              className="flex items-center w-full gap-1 px-4 py-2 text-sm text-left border-b cursor-pointer border-border hover:bg-muted"
            >
              <Settings size={16} /> Settings
            </Link>

            {/* theme toggle */}
            {/* 
            <button onClick={toggleTheme} className="p-2 transition-colors rounded hover:bg-muted flex gap-1 items-center w-full pl-4">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />} Toggle Theme
            </button> */}

            <button
              onClick={() => setPopupOpened(false)}
              className="block w-full px-4 py-2 text-sm text-center rounded-b bg-foreground text-background"
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
