import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Plus, User, X, Settings, Search, FileTypeCornerIcon, Text } from "lucide-react";
import ThemeToggle from "@/context/Toggle";
import { useToggleStore } from "@/store/toggle";
import HomeLeftbar from "./layout/HomeLeftbar";
// import { useDispatch, useSelector } from "react-redux";
// import { logOut, user } from "@/features/store";

export const Navbar = () => {
  // const { theme, toggleTheme } = useTheme();
  const openSidebar = useToggleStore((state) => state.openSidebar);
  const closeSidebar = useToggleStore((state) => state.closeSidebar);
  const sidebarOpen = useToggleStore((state) => state.sidebarOpen);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  // const dispatch = useDispatch();

  const [popupOpened, setPopupOpened] = useState(false);

  // console.log(user);

  return (
    <div className="sticky top-0 z-50">
      <nav className="py-4 bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-border ">
        <div>
          {/* Desktop Header */}
          <div className="flex items-center justify-between px-4">
            {/* Logo */}
            <div className="flex gap-3 items-center">
              {/* mobile toggle */}
              <button className="md:hidden transition rounded-lg hover:bg-muted">
                {sidebarOpen ? (
                  <X size={24} onClick={closeSidebar} />
                ) : (
                  <div className="flex flex-col gap-1 mt-0.5 pr-0.5">
                    <Text onClick={openSidebar} />
                  </div>
                )}
              </button>
              {/* Logo */}
              <Link to={"/"} className="flex items-center gap-2 text-lg italic mr-3">
                Blog
              </Link>
            </div>

            {/* Searchbar */}
            <div className="relative shrink max-sm:hidden">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
                className="p-2 w-full py-1.5 border-3 pl-7 rounded-full border-[#0009b6] shrink"
              />
              <Search size={16} className="absolute top-3.25 left-2 text-gray-500" />
            </div>

            {/* right Navbar */}
            <div className="flex items-center gap-1">
              {/* Navigation */}
              <div className="flex gap-5 items-center">
                <div className="items-center hidden gap-2 lg:flex">
                  <Link
                    to={"/users"}
                    className="px-2 py-2 font-medium transition rounded cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-muted/70"
                  >
                    People
                  </Link>
                </div>

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
                        onClick={() => setPopupOpened(!popupOpened)}
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
                        to={"/auth/login"}
                        className="flex rounded-md text-sm items-center gap-1 px-4 py-1 pb-1.5 rounde bg-linear-to-bl from-blue-600 to-purple-500 text-background"
                      >
                        Get started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* profile popup */}
        {popupOpened && (
          <div className="absolute bg-white dark:bg-background z-10 w-80 min-h-90 mt-2 overflow-hidden border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-xl right-7">
            <div className="p-2 mb-2 rounded-b bg-muted flex justify-star items-start gap-3 w-full">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-lg font-bold mt-1 text-center">{user?.name}</h2>
                <X onClick={() => setPopupOpened(false)} className="cursor-pointer" />
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center w-full gap-2 px-4 py-4 text-sm text-left border-b cursor-pointer border-border hover:bg-muted"
            >
              <LogOut size={16} /> Logout
            </button>

            <Link
              to={`users/${user?._id}`}
              onClick={() => setPopupOpened(false)}
              className="flex items-center w-full gap-2 px-2.5 py-4 text-sm text-left border-b cursor-pointer border-border hover:bg-muted"
            >
              {user?.profile_img ? (
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
              className="flex items-center w-full gap-2 px-4 py-4 text-sm text-left border-b cursor-pointer border-border hover:bg-muted"
            >
              <Settings size={16} /> Settings
            </Link>

            <div className="w-full flex items-center gap-1 px-4 py-4 border-b cursor-pointer border-border hover:bg-muted">
              <div className="w-full">
                <ThemeToggle />
              </div>
              <p className="absolute left-11 mb-1 z-0">ToggleTheme</p>
            </div>
          </div>
        )}
      </nav>

      {sidebarOpen && (
        <div className="absolute top-0 z-50 md:hidden">
          <HomeLeftbar />
          <X onClick={closeSidebar} className="absolute top-5 right-5" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
