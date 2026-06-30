import { useState } from "react";
// import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Plus, Signature, User, Menu, X, Settings, MailCheck, ChevronDown, LogInIcon, Moon, Sun, Search } from "lucide-react";
import NavbarDropdownMenus from "./parts/Navbar";
import { DropdownMenu } from "radix-ui";
// import { useDispatch, useSelector } from "react-redux";
// import { logOut, user } from "@/features/store";

export const Navbar = () => {
  // const { theme, toggleTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  // const dispatch = useDispatch();

  const [popupOpened, setPopupOpened] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropDownMenus, setDropdownMenus] = useState(false);

  const closeMobileMenus = () => {
    setMobileMenuOpen(false);
  };

  // console.log(user);

  return (
    <div>
      <nav className="py-4 dark:border-b bg-white/98 to-gray-50 from-white dark:bg-gray-900 text-foreground border-gray-800 border-b border-b-neutral-200">
        <div>
          {/* Desktop Header */}
          <div className="flex items-center justify-between px-4">
            {/* Logo */}
            <div className="flex gap-1 items-center">
              {/* mobile toggle */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p- transition rounded-lg hover:bg-muted">
                {mobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <div className="flex flex-col gap-1 mt-0.5 pr-0.5">
                    <p className="w-7 h-0.5 text-black bg-black"></p>
                    <p className="w-7 h-0.5 bg-black"></p>
                    <p className="w-5 h-0.5 bg-black"></p>
                  </div>
                )}
              </button>
              {/* Logo */}
              <Link to={"/"} className="flex items-center gap-2 text-lg italic mr-3">
                <div className="max-sm:">Blog</div>
              </Link>
            </div>

            {/* right Navbar */}
            <div className="flex items-center gap-1">
              <div className="relative shrink text-center lg:mr-5">
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="search..."
                  className="border w-full max-w-50 shrink border-gray-300 rounded-full pl-7 p-1 bg-white"
                />
                <Search size={15} className="text-gray-500 absolute top-2.5 left-1.5 shrink" />
              </div>
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
                </div>

                {/* right */}
                <div className="flex gap-1 items-center">
                  {user ? (
                    <div className="relative ml-1 flex gap-5 items-center">
                      <Link
                        to={"/create-post"}
                        className="max-sm:hidden flex text-white items-center gap-1 px-2 py-1 pr-4 font-medium transition rounded bg-linear-to-br from-purple-500 to-blue-500"
                      >
                        <Plus size={16} />
                        Create
                      </Link>

                      <button
                        onClick={() => setPopupOpened(!mobileMenuOpen)}
                        className="relative flex items-center justify-center transition rounded-full cursor-pointer"
                      >
                        {user.profile_img ? (
                          <div className=" rounded-full text-gray-500">
                            <img src={user?.profile_img?.url} alt="" className="w-8 h-8 object-cover aspect-square rounded-full" />
                          </div>
                        ) : (
                          <div className="p-2 border border-gray-300  bg-white rounded-full text-gray-500">
                            <User size={20} />
                          </div>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        to={"/auth/register"}
                        className="flex text-sm items-center gap-1 px-4 py-1 pb-1.5 rounde bg-foreground text-background max-md:hidden"
                      >
                        Get started
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
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="fixed left-0 top-0 h-screen w-64 flex flex-col items-start gap-1 px-2 py-4 border-t shadow-md border-border bg-background md:hidden">
            {/* Logo */}
            <div className="flex justify-between w-full items-center mb-5">
              <Link to={"/"} className="flex items-center gap-2 text-lg font-bold ">
                <Signature />
                <div>
                  Blog<span className="">Space</span>
                </div>
              </Link>

              <X onClick={() => setMobileMenuOpen(false)} />
            </div>

            {/* Navigation Links */}
            <div className="w-full flex flex-col gap-0 pt-5">
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

              <div className={`flex flex-col items-start`}>
                <button
                  onClick={() => setDropdownMenus(!dropDownMenus)}
                  className="w-full flex justify-between items-center gap-1 px-2 py-2 text-start font-medium transition cursor-pointer bg-gray-50 hover:bg-muted"
                >
                  <h2>Blog</h2>
                  <ChevronDown size={18} />
                </button>

                {dropDownMenus && (
                  <div className="pl-5 transition-all duration-75">
                    <NavbarDropdownMenus />
                  </div>
                )}
              </div>

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
                className="w-full mt-2 flex items-center gap-1 px-2 py-2 pr-10 font-medium transition rounded bg-linear-to-br from-purple-500 to-blue-500 text-gray-200"
              >
                <Plus size={16} />
                Create Post
              </Link>
            </div>

            <div className="mt-auto w-full">
              {user ? (
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

        {/* profile popup */}
        {popupOpened && (
          <div className="absolute z-10 w-50 mt-2 overflow-hidden border rounded-md shadow-xl right-7 border-border bg-card">
            <div className="p-2 mb-2 rounded-b bg-muted flex justify-star items-start gap-3">
              <div>
                <h2 className="text-lg font-bold mt-1 text-center">{user.name}</h2>
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
                <img src={user.profile_img?.url} alt={user.name} className="w-5 h-5 rounded-full" />
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
