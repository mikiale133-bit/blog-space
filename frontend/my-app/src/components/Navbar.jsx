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
              <div className="items-center hidden gap-2 md:flex">
                <div className="px-2 py-2 font-medium transition rounded-lg cursor-pointer hover:bg-muted">News</div>

                <div className="px-2 py-2 font-medium transition rounded-lg cursor-pointer hover:bg-muted">Announcement</div>

                <div className="flex items-center gap-1 px-2 py-2 font-medium transition rounded cursor-pointer hover:bg-muted">
                  Blog
                  <ChevronDown size={18} />
                </div>

                <Link to={"/users"} className="px-2 py-2 font-medium transition rounded cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-muted/70">
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

                    <Link to={"/auth/login"} className="flex items-center gap-1 px-3 py-1 border rounded-full border-border hover:bg-muted md:hidden">
                      <LogInIcon size={16} />
                    </Link>
                  </div>
                )}
              </div>

              {/* mobile toggle */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 transition rounded-lg md:hidden hover:bg-muted">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="flex flex-col items-start gap-1 px-2 py-4 mt-4 border-t shadow-md border-border bg-background md:hidden">
              <button onClick={() => closeMobileMenus()} className="px-2 py-2 pr-10 font-medium transition rounded-lg cursor-pointer hover:bg-muted">
                News
              </button>

              <button onClick={() => closeMobileMenus()} className="px-2 py-2 pr-10 font-medium transition cursor-pointer hover:bg-muted">
                Announcement
              </button>

              <button
                onClick={() => closeMobileMenus()}
                className="flex items-center gap-1 px-2 py-2 pr-10 font-medium transition rounded cursor-pointer hover:bg-muted"
              >
                Blog
                <ChevronDown size={18} />
              </button>

              <Link
                onClick={() => closeMobileMenus()}
                to={"/users"}
                className="px-2 py-2 pr-10 font-medium transition rounded cursor-pointer hover:bg-muted"
              >
                People
              </Link>

              <Link
                onClick={() => closeMobileMenus()}
                to={"/create-post"}
                className="flex items-center gap-1 px-2 py-2 pr-10 font-medium transition rounded bg-muted hover:bg-muted/70"
              >
                <Plus size={16} />
                Create Post
              </Link>

              {user ? (
                <div className="mt-5 text-foreground">
                  <h2 className="text-lg italic">{user.name}</h2>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-5">
                  <Link
                    to={"/auth/login"}
                    className="flex items-center w-full gap-2 px-3 py-2 text-sm rounded-lg bg-foreground text-background"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} /> Get Started
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* profile popup */}
        {popupOpened && (
          <div className="absolute z-10 w-48 mt-2 overflow-hidden border rounded-md shadow-xl right-7 border-border bg-card">
            <div className="p-2 mb-2 rounded-b bg-muted">
              {user?.profile_img?.url && <img src={user.profile_img.url} alt={user.name} className="w-10 h-10 mx-auto rounded-full" />}

              <div>
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="flex text-xs items-center gap-1 pl-0.5 text-muted-foreground">
                  <MailCheck size={15} /> {user.email}
                </p>
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
              className="flex items-center w-full gap-1 px-4 py-2 text-sm text-left border-b cursor-pointer border-border hover:bg-muted"
            >
              <User size={16} /> Profile
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
