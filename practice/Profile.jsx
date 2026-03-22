import React, { useState } from "react";
import {
  Settings,
  MapPin,
  Link as LinkIcon,
  Calendar,
  FileText,
  Bookmark,
  MoreVertical,
  Edit3,
  Share2,
  ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = ({ isOwnProfile = false }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="mx-auto md:flex gap-8 px-4 py-8">
      {/* 1. SIDEBAR: Identity & Stats (Stays consistent) */}
      <aside className="md:w-1/3 lg:w-1/4 mb-8">
        <div className="sticky top-20">
          <div className="relative group h-32 mb-4 flex gap-2 border-b-5 pb-2 border-gray-300">
            <div className="h-full  rounded-2xl bg-slate-200 border-4 border-white shadow-sm overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Mikiale&background=0D8ABC&color=fff"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Mikiale</h1>
              <p className="text-slate-500 mb-4">@mikiale_dev</p>

              <div className="flex items-center gap-2">
                <LinkIcon size={16} className="text-slate-400" />
                <a href="#" className="text-blue-600 hover:underline">
                  mikiale.dev
                </a>
              </div>
            </div>
            {isOwnProfile && (
              <button className="absolute bottom-2 right-2 p-1.5 bg-white rounded-lg shadow-md border border-slate-100 hover:text-blue-600 transition-colors">
                <Edit3 size={16} />
              </button>
            )}
          </div>

          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Software Developer & Founder. Building healthcare solutions and
            modern web experiences with the MERN stack.
          </p>

          <div className="space-y-3 text-sm text-slate-600 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-slate-400" /> Ethiopia
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" /> Joined Oct 2025
            </div>
          </div>

          <div className="flex gap-6 mt-8 pt-6 border-t border-slate-100">
            <div>
              <div className="font-bold text-slate-900">1.2k</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Followers
              </div>
            </div>
            <div>
              <div className="font-bold text-slate-900">450</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Following
              </div>
            </div>
          </div>

          {isOwnProfile ? (
            <Link
              to="/settings"
              className="mt-8 flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 text-slate-900 rounded-xl font-semibold hover:bg-slate-200 transition-all text-sm"
            >
              <Settings size={18} /> Edit Profile
            </Link>
          ) : (
            <button className="mt-8 w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              Follow
            </button>
          )}
        </div>
      </aside>

      {/* 2. MAIN CONTENT: Feed & Tabs */}
      <main className="flex-1">
        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 mb-6 sticky top-18 bg-white/80 backdrop-blur-sm z-1">
          <nav className="flex gap-8">
            {["posts", "about", "saved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-bold capitalize transition-all relative ${
                  activeTab === tab
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </nav>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"
            >
              <MoreVertical size={20} />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  <Share2 size={16} /> Share Profile
                </button>
                {!isOwnProfile && (
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <ShieldAlert size={16} /> Report
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          {/* Real World Logic: If no posts, show empty state */}
          {[1, 2, 3].map((post) => (
            <div
              key={post}
              className="p-6 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4 text-xs text-slate-400 uppercase font-bold tracking-widest">
                <span>March 20, 2026</span>
                <span>•</span>
                <span className="text-blue-600">Development</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer mb-2 leading-tight">
                How to Handle Role-Based Access in a MERN Healthcare App
              </h2>
              <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                In this post, we explore how to isolate patient data from
                provider views while maintaining a shared database...
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex gap-4 text-slate-400">
                  <span className="text-xs font-medium">1.2k Views</span>
                  <span className="text-xs font-medium">45 Comments</span>
                </div>
                <button className="text-slate-400 hover:text-slate-900">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Profile;
